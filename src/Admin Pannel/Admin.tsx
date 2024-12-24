import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {PlusCircleIcon} from "@heroicons/react/16/solid"
import { Movie } from "../Component/Movie";
import { TVShow } from "../IDB Data/IDB";
import { Tooltip } from "react-tooltip";

const Admin: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);

  // Fetch movies
  useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/Movies');
        const moviesData: Movie[] = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching and storing movies:', error);
      }
    };
    fetchAndStoreMovies();
  }, []);

  // Fetch TV Shows
  useEffect(() => {
    const fetchAndStoreTVShow = async () => {
      try {
        const response = await fetch('http://localhost:5000/TVShows');
        const tvShowsData: TVShow[] = await response.json();
        setTVShows(tvShowsData);
      } catch (error) {
        console.error('Error fetching and storing TV shows:', error);
      }
    };
    fetchAndStoreTVShow();
  }, []);

  // Delete Movie
  const deleteMovie = async (id: number) => {
    try {
      let response = await fetch(`http://localhost:5000/Movies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  // Delete TV Show
  const deleteTVShow = async (id: number) => {
    try {
      let response = await fetch(`http://localhost:5000/TVShows/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTVShows((prevShows) => prevShows.filter((show) => show.id !== id));
      }
    } catch (error) {
      console.error('Error deleting TV show:', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-5">Admin Panel</h1>

      <div className="flex flex-col md:flex-row justify-between mx-10 h-screen py-10">
        {/* Movie */}
        <section className="border-2 border-blue-600 w-full md:mx-5 relative p-6 rounded-lg shadow-lg h-[200%] md:h-[100%] overflow-auto">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Movies</h1>
          <Link to={'/addMovie'} className="font-semibold absolute right-3 top-10" data-tooltip-id="my-tooltip" data-tooltip-content="Add Movie"><PlusCircleIcon className="h-7 w-7 text-purple-500"/></Link>
          <Tooltip id="my-tooltip" />
          <div className="space-y-4">
            {
              movies.map((movie) => (
                <div key={movie.id} className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                  <img className="w-20 h-20 object-cover rounded-md" src={movie.imageUrl} alt={movie.title} />
                  <div className="flex-grow ml-4">
                    <p className="text-xl font-semibold text-gray-800">{movie.title}</p>
                    <p className="text-gray-600">Release Date: {movie.releaseDate}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link to={'/update/'+movie.id} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition">Edit</Link>
                    <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition" onClick={() => deleteMovie(movie.id)}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </section>

        {/* TV Show */}
        <section className="border-2 border-blue-600 w-full p-6 md:mx-5 rounded-lg relative shadow-lg h-[200%] my-10 md:my-0 md:h-[100%] overflow-auto">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">TV Shows</h1>
          <Link to={'/AddTVShow'} className="font-semibold absolute right-3 top-10" data-tooltip-id="my-tooltip" data-tooltip-content="Add TV Show"><PlusCircleIcon className="h-7 w-7 text-purple-500"/></Link>
          <Tooltip id="my-tooltip" />
          <div className="space-y-4">
            {
              tvShows.map((show) => (
                <div key={show.id} className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                  <img className="w-20 h-20 object-cover rounded-md" src={show.imageUrl} alt={show.title} />
                  <div className="flex-grow ml-4">
                    <p className="text-xl font-semibold text-gray-800">{show.title}</p>
                    <p className="text-gray-600">Release Date: {show.releaseDate}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link to={'/update/'+show.id} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition">Edit</Link>
                    <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition" onClick={()=>deleteTVShow(show.id)}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </section>

      </div>
    </>
  );
};

export default Admin;
