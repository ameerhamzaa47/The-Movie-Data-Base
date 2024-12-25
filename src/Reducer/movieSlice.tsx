import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../Auth/Firebase';

interface MovieState {
  movieWatchlist: string[];
  movieFavorites: string[];
  movieLists: string[];
}

const initialState: MovieState = {
  movieWatchlist: [],
  movieFavorites: [],
  movieLists: [],
};

// Helper function to update Firestore
const updateFirestore = async (uid: string, collection: string, movieId: string, isAdding: boolean) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userDocData = userDocSnap.data();
      const currentMovies = userDocData?.[collection] || [];

      // If we're adding, only add if the movie is not already in the list
      if (isAdding && !currentMovies.includes(movieId)) {
        await updateDoc(userDocRef, {
          [collection]: arrayUnion(movieId),
        });
      }

      // If we're removing, only remove if the movie is in the list
      else if (!isAdding && currentMovies.includes(movieId)) {
        await updateDoc(userDocRef, {
          [collection]: arrayRemove(movieId),
        });
      }
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating Firestore: ', error);
  }
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Add movie to Watchlist
    addMovieToWatchlist: (state, action: PayloadAction<string>) => {
      state.movieWatchlist.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        // Call the Firestore helper to add to the watchlist
        updateFirestore(user.uid, 'movieWatchlist', action.payload, true); // true means 'add'
      }
    },

    // Remove movie from Watchlist
    removeMovieFromWatchlist: (state, action: PayloadAction<string>) => {
      state.movieWatchlist = state.movieWatchlist.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        // Call the Firestore helper to remove from the watchlist
        updateFirestore(user.uid, 'movieWatchlist', action.payload, false); // false means 'remove'
      }
    },

    // Add movie to Favorites
    addMovieToFavorites: (state, action: PayloadAction<string>) => {
      state.movieFavorites.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'movieFavorites', action.payload, true);
      }
    },

    // Remove movie from Favorites
    removeMovieFromFavorites: (state, action: PayloadAction<string>) => {
      state.movieFavorites = state.movieFavorites.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'movieFavorites', action.payload, false);
      }
    },

    // Add movie to Lists
    addMovieToLists: (state, action: PayloadAction<string>) => {
      state.movieLists.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'movieLists', action.payload, true);
      }
    },

    // Remove movie from Lists
    removeMovieFromLists: (state, action: PayloadAction<string>) => {
      state.movieLists = state.movieLists.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'movieLists', action.payload, false);
      }
    },

    // Set initial state from Firestore (useful for loading data on app start)
    setMovies: (state, action: PayloadAction<MovieState>) => {
      state.movieWatchlist = action.payload.movieWatchlist;
      state.movieFavorites = action.payload.movieFavorites;
      state.movieLists = action.payload.movieLists;
    },
  },
});


export const {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  addMovieToFavorites,
  removeMovieFromFavorites,
  addMovieToLists,
  removeMovieFromLists,
  setMovies,
} = movieSlice.actions;

export default movieSlice.reducer;