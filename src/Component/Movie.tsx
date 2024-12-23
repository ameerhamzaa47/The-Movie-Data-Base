import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import { addMoviesToDB, getMoviesFromDB, Movie, } from '../IDB Data/IDB';
// import { moviesData } from '../IDB Data/MovieData';
import CircularRating from './RatingBar';
import '../App.css'
import Sliderbg from '../assets/image/Slider Bg.png'
import { Link } from 'react-router-dom';

export interface Movie {
  id: number;
  title: string;
  releaseDate?: string;
  imageUrl: string;
  score: number;
  overview: string;
  genre: string[];
  runtime: string;
  videoUrl: string;
  movieUrl: string;
}

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [active, setActive] = useState<"All" | "This Month">("All");
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // Store data in IndexedDB
  //   addMoviesToDB(moviesData);
  //   // Fetch data from IndexedDB
  //   getMoviesFromDB().then((storedMovies: Movie[]) => {
  //     setMovies(storedMovies);

  //     setFilteredMovies(storedMovies);
  //   });

  // }, []);

  useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        // Fetch movies from an API
        const response = await fetch('https://the-movie-data-base-gamma.vercel.app/api/movies?type=movies');
        const moviesData: Movie[] = await response.json();

        
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error('Error fetching and storing movies:', error);
      }
    };

    fetchAndStoreMovies();
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

  const date=new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = months[date.getMonth()];

  // Filter movies based on the active filter
  const filterMovies = (filter: 'All' | 'This Month') => {
    setLoading(true);

    setTimeout(() => {
      if (filter === 'All') {
        setFilteredMovies(movies);
      } else if (filter === 'This Month') {
        const filtered = movies.filter((movie) => {
          const movieMonth = movie.releaseDate ? new Date(movie.releaseDate).toLocaleString('default', { month: 'long' }) : '';
          return movieMonth === currentMonthName;
        });
        setFilteredMovies(filtered);
      }
      setLoading(false);
    }, 700);
  };
  useEffect(() => {
    filterMovies(active);
  }, [active, movies, currentMonthName]);

  return (
    <div>
      {/* title */}
      <div className="flex">
        <h1 className='mx-4 my-6 text-2xl font-bold'>Movies</h1>
        <div className="flex mx-4 my-4 text-sm font-semibold gap-1 border border-slate-800 dark:border-teal-400 rounded-full p-1 w-56">
          <button onClick={() => setActive("All")} className={`flex-1 rounded-full ${active === "All" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
            All
          </button>
          <button onClick={() => setActive("This Month")} className={`flex-1 p-2 rounded-full ${active === "This Month" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
          This Month
          </button>
        </div>
      </div>
      {/* movie */}
      <div className="relative w-full h-96">

        <div className='absolute inset-0 top-44 z-0'>
          <img src={Sliderbg} className='h-44 w-full' alt="" />
        </div>

        <div className="relative w-full h-96 px-6 overflow-hidden z-10">
          {loading ? (
            <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-solid border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          ) : filteredMovies.length > 0 ? (
            <Slider {...sliderSettings}>
              {filteredMovies.map((movie) => (
                <div className="px-2" key={movie.id}>
                  <div className="movie-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
                    <Link to={`/Mdetail/${movie.id}`}>
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                      />
                    </Link>
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





// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import { addMoviesToDB, getMoviesFromDB, Movie, } from '../IDB Data/IDB';
// import { moviesData } from '../IDB Data/MovieData';
// import CircularRating from './RatingBar';
// import '../App.css'
// import Sliderbg from '../assets/image/Slider Bg.png'
// import { Link } from 'react-router-dom';

// const MovieCard: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [active, setActive] = useState<"All" | "This Month">("All");

//   useEffect(() => {
//     // Store data in IndexedDB
//     addMoviesToDB(moviesData);
//     // Fetch data from IndexedDB
//     getMoviesFromDB().then((storedMovies: Movie[]) => {
//       setMovies(storedMovies);
//     });

//   }, []);

//   const sliderSettings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           spaceBetween: 5,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           spaceBetween: 5,
//         },
//       },
//     ],
//     draggable: true,
//   };

//   const date=new Date();
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June', 
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const monthName = months[date.getMonth()];
//   console.log(monthName.slice(0,3));

  
//   return (
//     <div>
//       {/* title */}
//       <div className="flex">
//         <h1 className='mx-4 my-6 text-2xl font-bold'>Movies</h1>
//         <div className="flex mx-4 my-4 text-sm font-semibold gap-1 border border-slate-800 dark:border-teal-400 rounded-full p-1 w-56">
//           <button onClick={() => setActive("All")} className={`flex-1 rounded-full ${active === "All" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
//             All
//           </button>
//           <button onClick={() => setActive("This Month")} className={`flex-1 p-2 rounded-full ${active === "This Month" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
//           This Month
//           </button>
//         </div>
//       </div>
//       {/* movie */}
//       <div className="relative w-full h-96">

//         <div className='absolute inset-0 top-44 z-0'>
//           <img src={Sliderbg} className='h-44 w-full' alt="" />
//         </div>

//         <div className="relative w-full h-96 px-6 overflow-hidden z-10">
//           {movies.length > 0 ? (
//             <Slider {...sliderSettings}>
//               {movies.map((movie) => (
//                 <div className="px-2" key={movie.id}>
//                 <div className="movie-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
//                    <Link to={`/Mdetail/${movie.id}`}><img
//                       src={movie.imageUrl}
//                       alt={movie.title}
//                       className="w-full h-56 object-cover rounded-t-xl"
//                     /></Link>
//                     <div className="p-4">
//                       <CircularRating value={movie.score} />
//                       <h3 className="text-lg font-semibold mt-1 md:mt-2 absolute top-64">{movie.title}</h3>
//                       <p className="text-sm text-gray-600 dark:text-white absolute top-72">{movie.releaseDate}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             <p>No movies available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;