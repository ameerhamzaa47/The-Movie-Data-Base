// indexedDB.ts

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

  
  export interface TVShow {
    id: number;
    title: string;
    type: string;
    releaseDate: string;
    episodeCount: number;
    imageUrl: string;
    score: number;
    overview: string;
    genre: string[];
    runtime: string;
    videoUrl: string;
  }

  export interface Trailer {
    id: number;
    type: string;
    title: string;
    videoUrl: string;
    releaseDate: string;
    image: string;
  }
  
  // Open IndexedDB and create object stores for movies and tvshows
  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MediaDB', 2);
  
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
  
        // Create movie object store if not exists
        if (!db.objectStoreNames.contains('movies')) {
          const moviesStore = db.createObjectStore('movies', { keyPath: 'id' });
          moviesStore.createIndex('title', 'title', { unique: false });
        }
  
        // Create TV show object store if not exists
        if (!db.objectStoreNames.contains('tvshows')) {
          const tvshowsStore = db.createObjectStore('tvshows', { keyPath: 'id' });
          tvshowsStore.createIndex('title', 'title', { unique: false });
        }
  
        // Create trailer object store
        if (!db.objectStoreNames.contains('trailers')) {
          const trailersStore = db.createObjectStore('trailers', { keyPath: 'id' });
          trailersStore.createIndex('movieId', 'movieId', { unique: false });
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

  // Add trailers to IndexedDB
  export const addTrailersToDB = async (trailers: Trailer[]): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction('trailers', 'readwrite');
    const trailersStore = transaction.objectStore('trailers');
  
    trailers.forEach((trailer) => {
      trailersStore.put(trailer); // Add or update trailer
    });
  
    transaction.oncomplete = () => {
      console.log('Trailers added successfully!');
    };
    transaction.onerror = (event: any) => {
      console.error('Error adding trailers:', event.target.error);
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
  

  // Fetch Trailers from IndexedDB
  export const getTrailersFromDB = async (): Promise<Trailer[]> => {
    const db = await openDB();
    const transaction = db.transaction('trailers', 'readonly');
    const trailersStore = transaction.objectStore('trailers');
    const request = trailersStore.getAll();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  };


  // get movie by ID

export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('movies', 'readonly');
    const store = transaction.objectStore('movies');
    const request = store.get(id);
    
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// get TV Show by ID

export const getTVShowById = async (id: number): Promise<TVShow | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tvshows', 'readonly');
    const store = transaction.objectStore('tvshows');
    const request = store.get(id);
    
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

  
  // trailer specific

  export const getTrailersByMovieId = async (movieId: number): Promise<Trailer[]> => {
    const db = await openDB();
    const transaction = db.transaction('trailers', 'readonly');
    const trailersStore = transaction.objectStore('trailers');
    const index = trailersStore.index('movieId');
    const request = index.getAll(movieId); // Query by movieId
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  };
  