import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { addTVShowsToDB, getTVShowById, TVShow } from '../IDB Data/IDB';
import { TVShow } from '../IDB Data/IDB';
import { ListBulletIcon, HeartIcon, BookmarkIcon, PlayIcon } from '@heroicons/react/16/solid';
import { Tooltip } from 'react-tooltip'
import img1 from '../assets/Cast/Img_1.png'
import img2 from '../assets/Cast/Img_2.png'
import img3 from '../assets/Cast/Img_3.png'
import img4 from '../assets/Cast/Img_4.png'
import img5 from '../assets/Cast/Img_5.png'
import img6 from '../assets/Cast/Img_6.png'
import img7 from '../assets/Cast/Img_7.png'
import img8 from '../assets/Cast/Img_8.png'
import prime from '../assets/image/prime_Video.png'
import { auth } from '../Auth/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { addTvShowToWatchlist, removeTvShowFromWatchlist, addTvShowToFavorites, removeTvShowFromFavorites, addTvShowToLists } from '../Reducer/TvShowSlice';
import { RootState } from '../Store/store';
import { removeMovieFromLists } from '../Reducer/movieSlice';

const TvDetailPage: FC = () => {
  const dispatch = useDispatch();
  const { TvShowWatchlist, TvShowFavorites, TvShowLists } = useSelector((state: RootState) => state.tvShow);
  // const [movies, setTrailers] = useState<Trailer[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [paidStatus, setPaidStatus] = useState<boolean | string>(false);

  const getYouTubeVideoId = (url: string): string => {
    const match = url.match(
      /(?:youtube\.com(?:\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\/v\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  };

  const handleVideoClick = (videoUrl: string) => {
    console.log("Video URL before formatting:", videoUrl);

    //embed URL
    const youtubeEmbedUrl = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")
      ? `https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`
      : videoUrl;

    console.log("Formatted Video URL:", youtubeEmbedUrl);
    setSelectedVideo(youtubeEmbedUrl);
  };

  const { id } = useParams<{ id: string }>()
  const [tvShow, setTvShow] = useState<TVShow[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const res = await fetch('http://localhost:5000/TVShows');
        if (!res.ok) {
          throw new Error('Failed to fetch movies');
        }
        const TvShow: TVShow[] = await res.json();

        // Find the movie with the matching ID from the fetched data
        const foundTvShow = TvShow.find((show) => show.id.toString() === id);
        if (!foundTvShow) {
          throw new Error(`Tv Show with ID ${id} not found`);
        }

        setTvShow([foundTvShow]);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    if (id) {
      fetchTvShowData();
    }
  }, [id]);

  useEffect(() => {
    const fetchUserPaidStatus = async () => {
      if (user) {
        const userDocRef = doc(getFirestore(), "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setPaidStatus(userDoc.data()?.isSubscribed);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserPaidStatus();
  }, [user]);

  // rating bar
  interface RatingBarProps {
    value: number; // Percentage value (0-100)
  }

  const RatingBar: React.FC<RatingBarProps> = ({ value }) => {
    // Ensure the value is clamped between 0 and 100
    const clampedValue = Math.max(0, Math.min(100, value));

    return (
      <div className="flex font-sans my-5 gap-2">
        <div className="relative w-14 h-14">
          {/* Outer Circle (Progress Arc) */}
          <div
            className="w-full h-full rounded-full pt-3"
            style={{
              background: `conic-gradient(
              #21D07A ${clampedValue * 3.6}deg, 
              #204529 ${clampedValue * 3.6}deg
            )`,
            }}
          ></div>

          {/* Inner Circle (White Background) */}
          <div className="absolute inset-[3px] bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-md font-bold text-white">
              {clampedValue}%
            </span>
          </div>
        </div>
        <span className="mt-2 text-white font-medium text-md w-16">User Score</span>
      </div>
    );
  };

  const Cast: FC<{ name: string; type: string; image: string }> = ({ name, type, image }) => {
    return (
      <div className="relative max-h-72 z-10 mt-2 md:mt-0">
        <div className="px-1 h-72">
          <div className="movie-card dark:bg-cyan-700 border dark:border-cyan-200 shadow-2xl w-48 mt-5 px-4 md:px-1 rounded-xl flex flex-col justify-between">
            <img
              src={image}
              alt=''
              className="w-full h-48 object-cover p-1 rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mt-1 w-44 md:mt-2">{name}</h3>
              <p className="text-sm text-gray-600 dark:text-white">{type}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const [TvShowStatuses, setTvShowStatuses] = useState({
    watchlist: false,
    favorites: false,
    lists: false,
  });

  // For update color of button
  const updateMovieStatusInFirestore = async (movieId: string, field: string, action: 'add' | 'remove') => {
    if (!user) return; // Ensure the user is authenticated

    const userDocRef = doc(getFirestore(), "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const currentData = userDoc.data();
      const currentList = Array.isArray(currentData?.[field]) ? currentData?.[field] : [];
      const updatedList = action === 'add'
        ? [...currentList, movieId]
        : currentList.filter((id: string) => id !== movieId);

      await updateDoc(userDocRef, {
        [field]: updatedList
      });
      setTvShowStatuses((prevStatus) => ({
        ...prevStatus,
        [field]: action === 'add',
      }));
    }
  };

  const movieId = id || '';
  TvShowWatchlist.includes(movieId);
  TvShowFavorites.includes(movieId);
  TvShowLists.includes(movieId);


  const toggleWatchlist = async () => {
    const action = TvShowStatuses.watchlist ? 'remove' : 'add';
    dispatch(action === 'add' ? addTvShowToWatchlist(movieId) : removeTvShowFromWatchlist(movieId));
    await updateMovieStatusInFirestore(movieId, 'watchlist', action);
  };

  const toggleFavorites = async () => {
    const action = TvShowStatuses.favorites ? 'remove' : 'add';
    dispatch(action === 'add' ? addTvShowToFavorites(movieId) : removeTvShowFromFavorites(movieId));
    await updateMovieStatusInFirestore(movieId, 'favorites', action);
  };

  const toggleLists = async () => {
    const action = TvShowStatuses.lists ? 'remove' : 'add';
    dispatch(action === 'add' ? addTvShowToLists(movieId) : removeMovieFromLists(movieId));
    await updateMovieStatusInFirestore(movieId, 'lists', action);
  };

  useEffect(() => {
    const fetchUserMovieStatus = async () => {
      if (user) {
        const userDocRef = doc(getFirestore(), "users", user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const data = userDoc.data();
          const watchlistStatus = data?.watchlist || [];
          const favoritesStatus = data?.favorites || [];
          const listsStatus = data?.lists || [];
  
          // Update the state with the status from Firestore
          setTvShowStatuses({
            watchlist: watchlistStatus.includes(movieId),
            favorites: favoritesStatus.includes(movieId),
            lists: listsStatus.includes(movieId)
          });
        }
      }
    };
  
    fetchUserMovieStatus();
  }, [user, movieId]);

  return (
    <>
      {tvShow.length > 0 && (
        <div className='flex flex-col md:flex-row justify-between relative' style={{ backgroundImage: `url(${tvShow[0].imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
          <div className='absolute inset-0 bg-black opacity-80'></div>
          <div className='w-2/3 mx-auto md:w-1/4 md:mx-10 mt-10 md:my-10 relative'>
            <img className='rounded-2xl' src={tvShow[0].imageUrl} alt="" />
          </div>

          <div className='w-3/4 md:w-2/3 text-white mx-10 my-10 relative'>
            <h1 className='text-3xl font-bold'>{tvShow[0].title}</h1>
            <p className='text-base sm:w-11/12 '>{tvShow[0].releaseDate} (PK) <span className='font-extrabold text-xl'>.</span> {tvShow[0].genre.join(', ')} <span className='font-extrabold text-xl'>.</span> {tvShow[0].runtime}</p>
            {/* rating & rewiew */}
            <div className='flex items-center'>
              <RatingBar value={tvShow[0].score} />
              <button className='bg-[#032541] font-bold rounded-full p-3'>Your Vibe <span>3</span> | <span>73</span></button>
            </div>
            {/* button */}
            <button onClick={toggleLists} className={`icon-button ${TvShowStatuses.lists ? 'bg-red-500' : 'bg-[#032541]'} rounded-full mx-2`} data-tooltip-id="my-tooltip" data-tooltip-content={user ? "Add to List" : "Login to add this TvShow to your list"}>
              <ListBulletIcon className='h-10 w-10 p-2 text-white' />
            </button>
            <button onClick={toggleFavorites} className={`icon-button ${TvShowStatuses.favorites ? 'bg-red-500' : 'bg-[#032541]'} rounded-full mx-2`} data-tooltip-id="my-tooltip" data-tooltip-content={user ? "Mark as favorite" : "Login to add this TvShow to your favorite list"}>
              <HeartIcon className='h-10 w-10 p-2 text-white' />
            </button>
            <button onClick={toggleWatchlist} className={`icon-button ${TvShowStatuses.watchlist ? 'bg-red-500' : 'bg-[#032541]'} rounded-full mx-2`} data-tooltip-id="my-tooltip" data-tooltip-content={user ? "Add to your watchlist" : "Login to add this TvShow to your watchlist"}>
              <BookmarkIcon className='h-10 w-10 p-2 text-white' />
            </button>
            <Tooltip id="my-tooltip" />
            {/* watch button */}
            <div className='flex'>
              <PlayIcon className='h-10 w-10 p-2' />
              <button onClick={() => handleVideoClick(tvShow[0].videoUrl)} className='rounded-full hover:underline hover:text-cyan-400 underline-offset-4'> Watch Trailer</button>
            </div>
            <h1 className='text-xl mt-3 '>Overview</h1>
            <p className='text-base w-80 md:w-full text-justify'>{tvShow[0].overview}</p>
            {/* Team */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 font-semibold'>
              <div>
                <p className=''>Kelly Marcel</p>
                <p className='font-light'>Director, Screenplay, Story</p>
              </div>

              <div>
                <p className=''>Todd McFarlane</p>
                <p className='font-light'>Characters</p>
              </div>

              <div>
                <p className=''>David Michelinie</p>
                <p className='font-light'>Characters</p>
              </div>

              <div>
                <p className=''>Tom Hardy</p>
                <p className='font-light'>Story</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white dark:bg-gray-600 p-4 w-full mx-64 rounded-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-64 md:h-96">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </div>
        </div>
      )}

      {/* cast */}
      <h1 className='text-xl font-bold mx-10 mt-5'>Series Cast</h1>
      <div className='flex flex-col md:flex-row justify-between mx-5'>

        <div className='flex overflow-x-auto scrollbar-hide w-full mx-6'>
          <Cast name={'Ben Whishaw'} type={'Sam Young'} image={img1} />
          <Cast name={'Andrew Buchan'} type={'Wallace'} image={img2} />
          <Cast name={'Andrew Koji'} type={'Jason'} image={img3} />
          <Cast name={'Sam Troughton'} type={'Stephen Yarrick'} image={img4} />
          <Cast name={'Sarah Lancashire'} type={'Mrs. Reed'} image={img5} />
          <Cast name={'Keira Knightley'} type={'Helen Webb'} image={img6} />
          <Cast name={'Omari Douglas'} type={'Michael'} image={img7} />
          <Cast name={'Ella Lily Hyland'} type={'Williams'} image={img8} />
        </div>

        <div className='md:w-1/3 w-full shadow-left rounded-xl  p-4  dark:border-cyan-400  mt-10 dark:bg-gray-900 md:mt-0'>
          {/* play button */}
          <div className='flex justify-between'>
            <div
              data-tooltip-id='my-tooltip'
              data-tooltip-content={!paidStatus ? 'Subscribe for Watch' : ''}
              className={`flex dark:bg-cyan-700 h-7 text-white justify-center rounded-md  ${!paidStatus ? 'bg-red-500 w-32' : 'bg-sky-400 w-28'}`}
            >
              <PlayIcon className='w-5' />
              {tvShow.length > 0 && (
                paidStatus ? (
                  <button onClick={() => handleVideoClick(tvShow[0].videoUrl)} className='font-semibold'>Play Now</button>
                ) : (
                  <Link to={'/Payment'} className='font-semibold mt-1'>Subscribe Now</Link>
                )
              )}
            </div>
            <a href='https://shorturl.at/AuBJg' target='_blank' className='w-24 mr-10'>
              Dark Matter on Apple TV+
            </a>
          </div>

          {/* Social Link */}
          <div className='mt-5'>
            <a href="https://twitter.com" target='_blank'><i className="fa-brands fa-twitter text-2xl mx-3 cursor-pointer dark:text-cyan-400" data-tooltip-id="my-tooltip" data-tooltip-content="Visit Twitter"></i></a>
            <span className='border-r border-black dark:border-cyan-400 relative bottom-1'></span>
            <a href="https://www.instagram.com" target='_blank'><i className="fa-brands fa-instagram text-2xl mx-3 cursor-pointer dark:text-pink-500" data-tooltip-id="my-tooltip" data-tooltip-content="Visit Instagram"></i></a>
            <span className='border-r border-black dark:border-cyan-400 relative bottom-1'></span>
            <a href="https://www.justwatch.com/pk/tv-show/secret-level" target='_blank'><i className="fa-solid fa-play text-2xl mx-3 cursor-pointer dark:text-yellow-300" data-tooltip-id="my-tooltip" data-tooltip-content="Visit JustWatch"></i></a>
            <span className='border-r border-black dark:border-cyan-400 relative bottom-1'></span>
            <a href="https://www.amazon.com/dp/B0DJPRYRDL" target='_blank'><i className="fa-solid fa-link text-2xl mx-3 cursor-pointer dark:text-green-400" data-tooltip-id="my-tooltip" data-tooltip-content="Visit Homepage"></i></a>
            <Tooltip id='my-tooltip' />
          </div>

          {/* facts, Status */}
          <div className='mt-5 mx-2 font-bold text-sm'>
            <p>Facts</p>
            <p>Status</p>
            <span className='font-light'>Returning Series</span>

            <p className='mt-5'>Network</p>
            <img src={prime} className='w-28' alt="" />

            <p className='mt-5'>Type</p>
            <span className='font-light'>Scripted</span>

            <p className='mt-5'>Original Language</p>
            <span className='font-light'>English</span>
          </div>
        </div>

      </div>
    </>
  )
}

export default TvDetailPage;