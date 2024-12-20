import { FC, useEffect, useState } from 'react'
import Slider from 'react-slick';
import Sliderbg from '../assets/image/Slider Bg.png'
// import { moviesData } from '../IDB Data/MovieData';
// import { tvShowsData } from '../IDB Data/TvShowData';
// import { addMoviesToDB, addTVShowsToDB, getMoviesFromDB, getTVShowsFromDB, Movie, TVShow} from '../IDB Data/IDB';
import CircularRating from './RatingBar';
import { Link } from 'react-router-dom';
import { Movie ,TVShow} from '../IDB Data/IDB';

const MovieNshow: FC = () => {
    const [active, setActive] = useState<"ShowMovie" | "ShowtVShow">("ShowMovie");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [filter,setFilter] = useState(true);

    useEffect(()=>{
    // addMoviesToDB(moviesData);
    // addTVShowsToDB(tvShowsData);

    // getMoviesFromDB().then((storedMovies: Movie[]) => {
    //     setMovies(storedMovies);
    //   });
  
    //   getTVShowsFromDB().then((storedTVShows: TVShow[]) => {
    //     setTVShows(storedTVShows);
    //   });

    const fetchAndStoreMovies = async () => {
          try {
            // Fetch movies from an API
            const response = await fetch('http://localhost:5000/Movies');
            const moviesData: Movie[] = await response.json();
    
            const response2 = await fetch('http://localhost:5000/TVShows');
            const tvShowsData: TVShow[] = await response2.json();
            setMovies(moviesData);
            setTVShows(tvShowsData);
          } catch (error) {
            console.error('Error fetching and storing movies:', error);
          }
        };
    
        fetchAndStoreMovies();
  
    },[])

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

  function showMovies(): void {
    setActive("ShowMovie");
    setFilter(true);
  }

  function showTVShows(): void {
    setActive("ShowtVShow");
    setFilter(false);
  }

  return (
    <>
      {/* title */}

      <div className="flex items-center">
        <h1 className='mx-4 my-4 text-2xl font-bold'>Free to Watch</h1>
        <div className="flex mx-4 my-4 text-sm font-semibold gap-1 border border-slate-800 dark:border-teal-400 rounded-full p-1 w-56">
      <button onClick={()=>showMovies()} className={`flex-1 rounded-full ${
          active === "ShowMovie" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
        Movie
      </button>
      <button onClick={() => showTVShows()} className={`flex-1 p-2 rounded-full ${
          active === "ShowtVShow" ? "bg-gray-900 text-teal-400" : "text-slate-800 dark:text-white"}`}>
        TV Show
      </button>
    </div>
      </div>

{/* movie */}
{filter ? (
        <div className="relative w-full h-96">
          <div className="absolute inset-0 top-44 z-0">
            <img src={Sliderbg} className="h-44 w-full" alt="" />
          </div>

          <div className="relative w-full h-96 px-6 overflow-hidden z-10">
            {movies.length > 0 ? (
              <Slider {...sliderSettings}>
                {movies.map((movie) => (
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
      ) : (
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
                <Link to={`/Tvdetail/${tv.id}`}><img
                    src={tv.imageUrl}
                    alt={tv.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  /></Link>
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
      )}
    </>
  )
}

export default MovieNshow
