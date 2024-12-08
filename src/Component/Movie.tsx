import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { addMoviesToDB, addTVShowsToDB, getMoviesFromDB, getTVShowsFromDB, Movie, TVShow } from '../IDB Data/IDB';
import { moviesData } from '../IDB Data/MovieData';
import { tvShowsData } from '../IDB Data/TvShowData';
import CircularRating from './RatingBar';
import '../App.css'
import Sliderbg from '../assets/image/Slider Bg.png'

// import 'swiper/css';
// import 'swiper/css/pagination';

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);

  useEffect(() => {
    // Store data in IndexedDB
    addMoviesToDB(moviesData);
    addTVShowsToDB(tvShowsData);

    // Fetch data from IndexedDB
    getMoviesFromDB().then((storedMovies: Movie[]) => {
      setMovies(storedMovies);
    });

    getTVShowsFromDB().then((storedTVShows: TVShow[]) => {
      setTVShows(storedTVShows);
    });
  }, []);
  console.log(tvShows);
  

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Shows 2 cards on tablets
          spaceBetween: 5, // Adjust the space between cards on tablets
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Shows 1 card on mobile
          spaceBetween: 5, // Adjust the space between cards on mobile
        },
      },
    ],
    draggable: true, // Enable dragging functionality
  };
  
  

  return (
    <div>
      
      {/* title */}

      <div className="flex">
        <h1 className='mx-4 my-4 text-2xl font-bold'>Trending</h1>
        <span className='flex mx-4 my-4 text-sm font-semibold gap-3 border-2 border-slate-800 rounded-full  p-2 w-36 justify-between'>
          <p className=''>All</p>
          <p>This Month</p>
        </span>
      </div>

      <div className="relative w-full h-96">

      <div className='absolute inset-0 top-44 z-0'>
        <img src={Sliderbg} className='h-44 w-full' alt="" />
      </div>

      <div className="relative w-full h-96 pl-6 overflow-hidden z-10">
        {movies.length > 0 ? (
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <div className="px-2" key={movie.id}>
                <div className="movie-card w-48 h-96 rounded-xl flex flex-col justify-between">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <CircularRating value={movie.score} />
                    <h3 className="text-lg font-semibold mt-2 absolute top-64">{movie.title}</h3>
                    <p className="text-sm text-gray-600 absolute top-72">{movie.releaseDate}</p>
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


<h1>hamza</h1>
      {/* <div>
        <h2>TV Shows</h2>
        <div>
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <div key={tvShow.id}>
                <h3>{tvShow.title}</h3>
                <p>Season: {tvShow.season}</p>
                <p>Episodes: {tvShow.episodeCount}</p>
                <img src={tvShow.imageUrl} alt={tvShow.title} style={{ width: 200 }} />
              </div>
            ))
          ) : (
            <p>No TV shows available</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default MovieCard;
