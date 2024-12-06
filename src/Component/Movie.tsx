import React, { useEffect, useState } from 'react';
import { addMoviesToDB, addTVShowsToDB, getMoviesFromDB, getTVShowsFromDB, Movie, TVShow } from '../IDB Data/IDB';
import { moviesData } from '../IDB Data/MovieData';
import { tvShowsData } from '../IDB Data/TvShowData';

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

  return (
    <div>
      <h1>Movies and TV Shows</h1>

      <div>
        <h2>Movies</h2>
        <div>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.releaseDate}</p>
                <img src={movie.imageUrl} alt={movie.title} style={{ width: 200 }} />
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default MovieCard;
