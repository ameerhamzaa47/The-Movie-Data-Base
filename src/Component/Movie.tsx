import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { addMoviesToDB, addTVShowsToDB, addTrailersToDB, getMoviesFromDB, getTVShowsFromDB, getTrailersFromDB, Movie, TVShow, Trailer  } from '../IDB Data/IDB';
import { moviesData } from '../IDB Data/MovieData';
import { tvShowsData } from '../IDB Data/TvShowData';
import { TrailersData } from '../IDB Data/TrailerData';
import CircularRating from './RatingBar';
import '../App.css'
import Sliderbg from '../assets/image/Slider Bg.png'
import MovieNshow from './MovieNshow';


const getYouTubeVideoId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com(?:\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\/v\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Store data in IndexedDB
    addMoviesToDB(moviesData);
    addTVShowsToDB(tvShowsData);
    addTrailersToDB(TrailersData);

    // Fetch data from IndexedDB
    getMoviesFromDB().then((storedMovies: Movie[]) => {
      setMovies(storedMovies);
    });

    getTVShowsFromDB().then((storedTVShows: TVShow[]) => {
      setTVShows(storedTVShows);
    });

    getTrailersFromDB().then((storedTrailers: Trailer[]) => {
      setTrailers(storedTrailers);
    });
  }, []);
  console.log('h',tvShows);


  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          spaceBetween: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          spaceBetween: 5,
        },
      },
    ],
    draggable: true,
  };

  const TrailersliderSettings ={
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          spaceBetween: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          spaceBetween: 5,
        },
      },
    ],
    draggable: true,
  }

  const [active, setActive] = useState<"Today" | "This Week">("Today");
  const [activeTab, setActiveTab] = useState<string>("Popular");
  const tabs = ["Popular", "Streaming", "On TV", "For Rent", "In Theaters"];
  const [backgroundImage, setBackgroundImage] = useState('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg');

  const handleVideoClick = (videoUrl: string) => {
    console.log("Video URL before formatting:", videoUrl);
  
    // Check if the video URL is a YouTube link and format it into an embed URL
    const youtubeEmbedUrl = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")
      ? `https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`
      : videoUrl;
  
    console.log("Formatted Video URL:", youtubeEmbedUrl);
    setSelectedVideo(youtubeEmbedUrl);
  };
  
  const handleMouseEnter = (imageUrl:any) => {
    setBackgroundImage(imageUrl);
  };

  const handleMouseLeave = () => {
    setBackgroundImage('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg');
  };

  return (
    <div>

      {/* title */}

      <div className="flex">
        <h1 className='mx-4 my-4 text-2xl font-bold'>Trending</h1>
        <div className="flex mx-4 my-4 text-sm font-semibold gap-1 border border-slate-800 dark:border-teal-400 rounded-full p-1 w-56">
      <button onClick={() => setActive("Today")} className={`flex-1 rounded-full ${
          active === "Today" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
        Today
      </button>
      <button onClick={() => setActive("This Week")} className={`flex-1 p-2 rounded-full ${
          active === "This Week" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
        This Week
      </button>
    </div>
      </div>

{/* movie */}
      <div className="relative w-full h-96">

      <div className='absolute inset-0 top-44 z-0'>
        <img src={Sliderbg} className='h-44 w-full' alt="" />
      </div>

      <div className="relative w-full h-96 px-6 overflow-hidden z-10">
        {movies.length > 0 ? (
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <div className="px-2" key={movie.id}>
                <div className="movie-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <CircularRating value={movie.score} />
                    <h3 className="text-lg font-semibold mt-1 md:mt-2 absolute top-64">{movie.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-white absolute top-72">{movie.releaseDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No movies available</p>
        )}
      </div>
      </div>


{/* Trailer Slider */}

      <div  className="relative bg-cover bg-center  w-full h-96" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
      <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Title */}
        <div className="flex flex-col md:flex-row md:space-x-4 py-2 md:p-4 z-10 relative">
      <h2 className="text-white font-bold text-xl">Latest Trailers</h2>
      <div className="flex md:space-x-4 border-2 border-teal-700 rounded-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === tab
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </div>
    </div>
    {/* Trailer */}
      <div className=" w-full h-96 px-6 overflow-hidden z-10">

      <Slider {...TrailersliderSettings}>
  {trailers.map((trailer) => (
    <div className="md:px-2" key={trailer.id} onMouseEnter={() => handleMouseEnter(trailer.image)} onMouseLeave={handleMouseLeave}>
      <div className="movie-card w-96 px-10 md:px-0 h-96 rounded-xl flex flex-col justify-between">
        <img
          src={trailer.image}
          alt={trailer.title}
          className="w-full h-56 object-cover cursor-pointer rounded-t-xl hover:scale-105 transition-all"
        />
        <i onClick={() => handleVideoClick(trailer.videoUrl)} className="fa-solid fa-play absolute hover:opacity-50 transition-all text-white dark:text-cyan-500 text-7xl mt-20 ml-40 cursor-pointer"></i>
        <div className="p-4">
          <h3 className="text-lg font-semibold mt-1 md:mt-2 text-white absolute top-56">{trailer.title}</h3>
          <p className="text-sm text-white  absolute top-64">{trailer.releaseDate}</p>
        </div>
      </div>
    </div>
  ))}
</Slider>

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
      </div>
      </div>

{/* TV Show Slider */}
      
         {/* title */}
         <div className="flex md:items-center flex-col md:flex-row px-1 md:space-x-4 py-2 md:p-4 z-10 relative">
      <h2 className="text-black font-bold text-xl px-2">TV Show</h2>
      <div className="flex md:mx-4 my-4 text-sm font-semibold md:gap-1 border border-slate-800 dark:border-teal-400 rounded-full md:p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === tab
                ? "bg-gray-900 text-teal-400"
                : "text-slate-800 dark:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

{/* Tv Show */}
      <div className="relative w-full h-96">

      <div className='absolute inset-0 top-44 z-0'>
        <img src={Sliderbg} className='h-44 w-full' alt="" />
      </div>

      <div className="relative w-full h-96 px-6 overflow-hidden z-10">
        {tvShows.length > 0 ? (
          <Slider {...sliderSettings}>
            {tvShows.map((tv) => (
              <div className="px-2" key={tv.id}>
                <div className="tv-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
                  <img
                    src={tv.imageUrl}
                    alt={tv.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <CircularRating value={tv.score} />
                    <h3 className="text-lg font-semibold mt-1 md:mt-2 absolute top-64">{tv.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-white absolute top-72">{tv.releaseDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No movies available</p>
        )}
      </div>
      </div>
      
      <MovieNshow/>

    </div>
  );
};

export default MovieCard;