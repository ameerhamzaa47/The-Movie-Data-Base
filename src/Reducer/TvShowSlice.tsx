import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../Auth/Firebase';

interface TvShowState {
  TvShowWatchlist: string[];
  TvShowFavorites: string[];
  TvShowLists: string[];
}

const initialState: TvShowState = {
  TvShowWatchlist: [],
  TvShowFavorites: [],
  TvShowLists: [],
};

// Helper function to update Firestore
const updateFirestore = async (uid: string, collection: string, showId: string, isAdding: boolean) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userDocData = userDocSnap.data();
      const currentShows = userDocData?.[collection] || [];

      // If we're adding, only add if the show is not already in the list
      if (isAdding && !currentShows.includes(showId)) {
        await updateDoc(userDocRef, {
          [collection]: arrayUnion(showId),
        });
      }

      // If we're removing, only remove if the show is in the list
      else if (!isAdding && currentShows.includes(showId)) {
        await updateDoc(userDocRef, {
          [collection]: arrayRemove(showId),
        });
      }
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating Firestore: ', error);
  }
};

const tvShowSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    // Add TV show to Watchlist
    addTvShowToWatchlist: (state, action: PayloadAction<string>) => {
      state.TvShowWatchlist.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        // Call the Firestore helper to add to the watchlist
        updateFirestore(user.uid, 'TvShowWatchlist', action.payload, true); // true means 'add'
      }
    },

    // Remove TV show from Watchlist
    removeTvShowFromWatchlist: (state, action: PayloadAction<string>) => {
      state.TvShowWatchlist = state.TvShowWatchlist.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        // Call the Firestore helper to remove from the watchlist
        updateFirestore(user.uid, 'TvShowWatchlist', action.payload, false); // false means 'remove'
      }
    },

    // Add TV show to Favorites
    addTvShowToFavorites: (state, action: PayloadAction<string>) => {
      state.TvShowFavorites.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'TvShowFavorites', action.payload, true);
      }
    },

    // Remove TV show from Favorites
    removeTvShowFromFavorites: (state, action: PayloadAction<string>) => {
      state.TvShowFavorites = state.TvShowFavorites.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'TvShowFavorites', action.payload, false);
      }
    },

    // Add TV show to Lists
    addTvShowToLists: (state, action: PayloadAction<string>) => {
      state.TvShowLists.push(action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'TvShowLists', action.payload, true);
      }
    },

    // Remove TV show from Lists
    removeTvShowFromLists: (state, action: PayloadAction<string>) => {
      state.TvShowLists = state.TvShowLists.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'TvShowLists', action.payload, false);
      }
    },

    // Set initial state from Firestore (useful for loading data on app start)
    setTvShows: (state, action: PayloadAction<TvShowState>) => {
      state.TvShowWatchlist = action.payload.TvShowWatchlist;
      state.TvShowFavorites = action.payload.TvShowFavorites;
      state.TvShowLists = action.payload.TvShowLists;
    },
  },
});

export const {
  addTvShowToWatchlist,
  removeTvShowFromWatchlist,
  addTvShowToFavorites,
  removeTvShowFromFavorites,
  addTvShowToLists,
  removeTvShowFromLists,
  setTvShows,
} = tvShowSlice.actions;

export default tvShowSlice.reducer;