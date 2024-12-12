import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { addMoviesToDB, getMoviesFromDB, Movie, } from '../IDB Data/IDB';
import { moviesData } from '../IDB Data/MovieData';
import CircularRating from './RatingBar';
import '../App.css'
import Sliderbg from '../assets/image/Slider Bg.png'
import { Link } from 'react-router-dom';

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [active, setActive] = useState<"Today" | "This Week">("Today");

  useEffect(() => {
    // Store data in IndexedDB
    addMoviesToDB(moviesData);
    // Fetch data from IndexedDB
    getMoviesFromDB().then((storedMovies: Movie[]) => {
      setMovies(storedMovies);
    });

  }, []);

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
  return (
    <div>
      {/* title */}
      <div className="flex">
        <h1 className='mx-4 my-4 text-2xl font-bold'>Trending</h1>
        <div className="flex mx-4 my-4 text-sm font-semibold gap-1 border border-slate-800 dark:border-teal-400 rounded-full p-1 w-56">
          <button onClick={() => setActive("Today")} className={`flex-1 rounded-full ${active === "Today" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
            Today
          </button>
          <button onClick={() => setActive("This Week")} className={`flex-1 p-2 rounded-full ${active === "This Week" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
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
                   <Link to={`/detail/${movie.id}`}><img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-full h-56 object-cover rounded-t-xl"
                    /></Link>
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
    </div>
  );
};

export default MovieCard;