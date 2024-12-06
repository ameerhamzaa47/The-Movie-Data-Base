// indexedDB.ts

export interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    imageUrl: string;
    score: number;
    overview: string;
    genre: string[];
    runtime: number;
  }
  
  export interface TVShow {
    id: number;
    title: string;
    season: number;
    episodeCount: number;
    imageUrl: string;
    score: number;
    overview: string;
    genre: string[];
    runtime: number;
  }
  
  // Open IndexedDB and create object stores for movies and tvshows
  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MediaDB', 1); // Database name
  
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
  
        // Create movie object store
        if (!db.objectStoreNames.contains('movies')) {
          const moviesStore = db.createObjectStore('movies', { keyPath: 'id' });
          moviesStore.createIndex('title', 'title', { unique: false });
        }
  
        // Create TV Show object store
        if (!db.objectStoreNames.contains('tvshows')) {
          const tvshowsStore = db.createObjectStore('tvshows', { keyPath: 'id' });
          tvshowsStore.createIndex('title', 'title', { unique: false });
        }
      };
  
      request.onerror = (event: any) => reject(event.target.error);
      request.onsuccess = (event: any) => resolve(event.target.result);
    });
  };
  
  // Add movies to IndexedDB
  export const addMoviesToDB = async (movies: Movie[]): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction('movies', 'readwrite');
    const moviesStore = transaction.objectStore('movies');
  
    movies.forEach((movie) => {
      moviesStore.put(movie);
    });
  
    transaction.oncomplete = () => {
      console.log('Movies added successfully!');
    };
    transaction.onerror = (event: any) => {
      console.error('Error adding movies:', event.target.error);
    };
  };
  
  // Add TV Shows to IndexedDB
  export const addTVShowsToDB = async (tvShows: TVShow[]): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction('tvshows', 'readwrite');
    const tvShowsStore = transaction.objectStore('tvshows');
  
    tvShows.forEach((tvShow) => {
      tvShowsStore.put(tvShow);
    });
  
    transaction.oncomplete = () => {
      console.log('TV Shows added successfully!');
    };
    transaction.onerror = (event: any) => {
      console.error('Error adding TV shows:', event.target.error);
    };
  };
  
  // Fetch Movies from IndexedDB
  export const getMoviesFromDB = async (): Promise<Movie[]> => {
    const db = await openDB();
    const transaction = db.transaction('movies', 'readonly');
    const moviesStore = transaction.objectStore('movies');
    const request = moviesStore.getAll();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  };
  
  // Fetch TV Shows from IndexedDB
  export const getTVShowsFromDB = async (): Promise<TVShow[]> => {
    const db = await openDB();
    const transaction = db.transaction('tvshows', 'readonly');
    const tvShowsStore = transaction.objectStore('tvshows');
    const request = tvShowsStore.getAll();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  };
  