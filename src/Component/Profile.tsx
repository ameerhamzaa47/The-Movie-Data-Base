import { FC, useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth/Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import profileIcon from '../assets/image/Profile.png';
import { useNavigate } from 'react-router-dom';
import { Movie } from './Movie';
import { TVShow } from '../IDB Data/IDB';

const Profile: FC = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);
  const [movieFavorites, setMovieFavorites] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvShowFavorites, setTvShowFavorites] = useState([]);
  const [tvShowLists, setTvShowLists] = useState([]);
  const [tvShowWatchlist, setTvShowWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState<'list' | 'favorite' | 'watch later'>('list');
  const [activeSubTab, setActiveSubTab] = useState<'movie' | 'tv' | 'movies' | 'TvShow' | 'movies' | 'TvShow'>('movie');

  const [listMovie,setListMovie]=useState<Movie[]>([])
  const [listTvShow,setListTvShow]=useState<TVShow[]>([])
  const [favoriteMovie,setFavoriteMovie]=useState<Movie[]>([])
  const [favoriteTvShow,setFavoriteTvShow]=useState<TVShow[]>([])
  const [watchlistMovie,setWatchlistMovie]=useState<Movie[]>([])
  const [watchlistTvShow,setWatchlistTvShow]=useState<TVShow[]>([])
  const Navigate = useNavigate();
  const hasFetchedMovies = useRef(false);
  const hasFetchedTvShows = useRef(false);
  const hasFetchedMoviesFavorites = useRef(false);
  const hasFetchedTvShowsFavorites = useRef(false);
  const hasFetchedMoviesWatchlist = useRef(false);
  const hasFetchedTvShowsWatchlist = useRef(false);
  if (!user) {
    Navigate('/');
  }

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

// set movie and get id from the fireStore
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData?.username);

          // Fetching the different categories
          setMovieFavorites(userData.movieFavorites || []);
          setMovieLists(userData.movieLists || []);
          setMovieWatchlist(userData.movieWatchlist || []);
          setTvShowFavorites(userData.TvShowFavorites || []);
          setTvShowLists(userData.TvShowLists || []);
          setTvShowWatchlist(userData.TvShowWatchlist || []);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserName();
  }, [user]);

  

  // fetch movieList Data
  useEffect(() => {
    const fetchMovies = async () => {
      for (const id of movieLists) {
        try {
          const response = await fetch('http://localhost:5000/Movies/' + id);
          const movieData = await response.json();
  
          if (movieData && movieData.id) {
            setListMovie((prevMovies) => [...prevMovies, movieData]);
          } else {
            console.error("Fetched data is not a valid movie object:", movieData);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (movieLists.length > 0 && !hasFetchedMovies.current) {
      fetchMovies();
      hasFetchedMovies.current = true;
    }
  }, [movieLists, hasFetchedMovies]);

  // fetch TVShowList Data
  useEffect(() => {
    const fetchTvShowList = async () => {
      for (const id of tvShowLists) {
        try {
          const response = await fetch('http://localhost:5000/TVShows/' + id);
          const TvShowData = await response.json();
  
          if (TvShowData && TvShowData.id) {
            setListTvShow((prevMovies) => [...prevMovies, TvShowData]);
          } else {
            console.error("Fetched data is not a valid movie object:", TvShowData);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (tvShowLists.length > 0 && !hasFetchedTvShows.current) {
      fetchTvShowList();
      hasFetchedTvShows.current = true;
    }
  }, [tvShowLists, hasFetchedTvShows]);

  // fetch favorite movie Data
  useEffect(() => {
    const fetchmovieFaviort = async () => {
      for (const id of movieFavorites) {
        try {
          const response = await fetch('http://localhost:5000/Movies/' + id);
          const favoriteMovie = await response.json();
  
          if (favoriteMovie && favoriteMovie.id) {
            setFavoriteMovie((prevMovies) => [...prevMovies, favoriteMovie]);
          } else {
            console.error("Fetched data is not a valid movie object:", favoriteMovie);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (movieFavorites.length > 0 && !hasFetchedMoviesFavorites.current) {
      fetchmovieFaviort();
      hasFetchedMoviesFavorites.current = true;
    }
  }, [movieFavorites, hasFetchedMoviesFavorites]);
  
  // fetch favorite TVShow Data
  useEffect(() => {
    const fetchTvShowList = async () => {
      for (const id of tvShowFavorites) {
        try {
          const response = await fetch('http://localhost:5000/TVShows/' + id);
          const TvShowData = await response.json();
  
          if (TvShowData && TvShowData.id) {
            setFavoriteTvShow((prevMovies) => [...prevMovies, TvShowData]);
          } else {
            console.error("Fetched data is not a valid movie object:", TvShowData);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (tvShowFavorites.length > 0 && !hasFetchedTvShowsFavorites.current) {
      fetchTvShowList();
      hasFetchedTvShowsFavorites.current = true;
    }
  }, [tvShowFavorites, hasFetchedTvShowsFavorites]);

  // fetch watchlist movie Data
  useEffect(() => {
    const fetchmovieFaviort = async () => {
      for (const id of movieWatchlist) {
        try {
          const response = await fetch('http://localhost:5000/Movies/' + id);
          const favoriteMovie = await response.json();
  
          if (favoriteMovie && favoriteMovie.id) {
            setWatchlistMovie((prevMovies) => [...prevMovies, favoriteMovie]);
          } else {
            console.error("Fetched data is not a valid movie object:", favoriteMovie);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (movieFavorites.length > 0 && !hasFetchedMoviesWatchlist.current) {
      fetchmovieFaviort();
      hasFetchedMoviesWatchlist.current = true;
    }
  }, [movieFavorites, hasFetchedMoviesWatchlist]);

  // fetch watchlist TVShow Data
  useEffect(() => {
    const fetchTvShowList = async () => {
      for (const id of tvShowWatchlist) {
        try {
          const response = await fetch('http://localhost:5000/TVShows/' + id);
          const TvShowData = await response.json();
  
          if (TvShowData && TvShowData.id) {
            setWatchlistTvShow((prevMovies) => [...prevMovies, TvShowData]);
          } else {
            console.error("Fetched data is not a valid movie object:", TvShowData);
          }
        } catch (error) {
          console.error('Error fetching and storing movies:', error);
        }
      }
    };
  
    if (tvShowFavorites.length > 0 && !hasFetchedTvShowsWatchlist.current) {
      fetchTvShowList();
      hasFetchedTvShowsWatchlist.current = true;
    }
  }, [tvShowFavorites, hasFetchedTvShowsWatchlist]);
  

  const currentMonth =
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // Tab content for each section
  const renderTabContent = () => {
    switch (activeTab) {
      case 'list':
        return (
          <div className="px-5">

          {/* Display content based on selected sub-tab (Movies or TV Shows) */}
          <div className="mt-5">
            {activeSubTab === 'movie' && (
              <>
                {listMovie.map((list,index) => (
                  <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                    <div className='w-28 pr-4'>
                      <img src={list.imageUrl} alt="" />
                    </div>
                    <div>

                      <div className='flex items-center relative'>
                      <RatingBar value={list.score} />
                      <div className='absolute left-16'>
                      <p><b>{list.title}</b></p>
                      <p className='font-light'>{list.releaseDate}</p>
                      </div>
                      </div>
                      
                      <p>{list.overview}</p>
                    </div>
                  </div>
                ))}
              </>            
             )}
            {activeSubTab === 'tv' && (
              <>
              {listTvShow.map((list,index) => (
                <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                  <div className='w-28 pr-4'>
                    <img src={list.imageUrl} alt="" />
                  </div>
                  <div>

                    <div className='flex items-center relative'>
                    <RatingBar value={list.score} />
                    <div className='absolute left-16'>
                    <p><b>{list.title}</b></p>
                    <p className='font-light'>{list.releaseDate}</p>
                    </div>
                    </div>
                    <p>{list.overview}</p>
                  </div>
                </div>
              ))}
            </>
            )}
          </div>
          </div>
        );
      case 'favorite':
        return (
          <div className="px-5">

            {/* Display content based on selected sub-tab (Rated or Unrated) */}
            <div className="mt-5">
              {activeSubTab === 'movies' && (
                <>
                {favoriteMovie.map((list,index) => (
                  <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                    <div className='w-28 pr-4'>
                      <img src={list.imageUrl} alt="" />
                    </div>
                    <div>

                      <div className='flex items-center relative'>
                      <RatingBar value={list.score} />
                      <div className='absolute left-16'>
                      <p><b>{list.title}</b></p>
                      <p className='font-light'>{list.releaseDate}</p>
                      </div>
                      </div>
                      
                      <p>{list.overview}</p>
                    </div>
                  </div>
                ))}
              </> 
              )}
              {activeSubTab === 'TvShow' && (
                <>
                {favoriteTvShow.map((list,index) => (
                  <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                    <div className='w-28 pr-4'>
                      <img src={list.imageUrl} alt="" />
                    </div>
                    <div>

                      <div className='flex items-center relative'>
                      <RatingBar value={list.score} />
                      <div className='absolute left-16'>
                      <p><b>{list.title}</b></p>
                      <p className='font-light'>{list.releaseDate}</p>
                      </div>
                      </div>
                      
                      <p>{list.overview}</p>
                    </div>
                  </div>
                ))}
              </>      
              )}
            </div>
          </div>
        );
      case 'watch later':
        return (
          <div className="px-5">

            {/* Display content based on selected sub-tab (Upcoming or Completed) */}
            <div className="mt-5">
              {activeSubTab === 'movies' && (
                <>
                {watchlistMovie.map((list,index) => (
                  <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                    <div className='w-28 pr-4'>
                      <img src={list.imageUrl} alt="" />
                    </div>
                    <div>

                      <div className='flex items-center relative'>
                      <RatingBar value={list.score} />
                      <div className='absolute left-16'>
                      <p><b>{list.title}</b></p>
                      <p className='font-light'>{list.releaseDate}</p>
                      </div>
                      </div>
                      
                      <p>{list.overview}</p>
                    </div>
                  </div>
                ))}
              </>    
              )}
              {activeSubTab === 'TvShow' && (
                <>
                {watchlistTvShow.map((list,index) => (
                  <div key={index} className='border border-gray-500 rounded-xl my-4 p-2 flex items-center'>
                    <div className='w-28 pr-4'>
                      <img src={list.imageUrl} alt="" />
                    </div>
                    <div>

                      <div className='flex items-center relative'>
                      <RatingBar value={list.score} />
                      <div className='absolute left-16'>
                      <p><b>{list.title}</b></p>
                      <p className='font-light'>{list.releaseDate}</p>
                      </div>
                      </div>
                      
                      <p>{list.overview}</p>
                    </div>
                  </div>
                ))}
              </> 
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Top Section */}
      <div className="flex items-center space-x-4 bg-cyan-950 py-10">
        <img className="w-44 h-44 ml-14 rounded-full shadow-lg" src={user?.photoURL || profileIcon} alt="" />
        <div className="flex justify-end flex-col">
          <h1 className="font-bold text-4xl text-white">{username ? username : user?.displayName}</h1>
          <p className="text-white">Member since {currentMonth} {currentYear}</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="max-w-4xl mx-auto mt-10">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6 border-b-2 border-gray-300 pb-4">
          {['list', 'favorite', 'watch later'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-semibold text-lg ${
                activeTab === tab
                  ? 'text-cyan-700 border-b-4 border-cyan-700'
                  : 'text-gray-500 hover:text-cyan-700'
              } transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab(tab as 'list' | 'favorite' | 'watch later')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Sub Tab Navigation for List, Rating, Watchlist */}
        {activeTab && (
          <div className="mt-4 flex justify-center space-x-6">
            {activeTab === 'list' && (
              <>
                <button
                  onClick={() => setActiveSubTab('movie')}
                  className={`px-6 py-2 ${activeSubTab === 'movie' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setActiveSubTab('tv')}
                  className={`px-6 py-2 ${activeSubTab === 'tv' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  TV Shows
                </button>
              </>
            )}
            {activeTab === 'favorite' && (
              <>
                <button
                  onClick={() => setActiveSubTab('movies')}
                  className={`px-6 py-2 ${activeSubTab === 'movies' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setActiveSubTab('TvShow')}
                  className={`px-6 py-2 ${activeSubTab === 'TvShow' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Tv Shows
                </button>
              </>
            )}
            {activeTab === 'watch later' && (
              <>
                <button
                  onClick={() => setActiveSubTab('movies')}
                  className={`px-6 py-2 ${activeSubTab === 'movies' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setActiveSubTab('TvShow')}
                  className={`px-6 py-2 ${activeSubTab === 'TvShow' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Tv Shows
                </button>
              </>
            )}
          </div>
        )}

        {/* Tab Content */}
        <div className="mt-5">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default Profile;