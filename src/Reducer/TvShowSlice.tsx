import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../Auth/Firebase';

interface TvShowState {
  watchlist: string[];
  favorites: string[];
  lists: string[];
}

const initialState: TvShowState = {
  watchlist: [],
  favorites: [],
  lists: [],
};

// Helper function to update Firestore
const updateFirestore = async (uid: string, collection: string, action: 'add' | 'remove', movieId: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const updateData = action === 'add' 
        ? { [collection]: arrayUnion(movieId) } 
        : { [collection]: arrayRemove(movieId) };

      await updateDoc(userDocRef, updateData);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating Firestore: ', error);
  }
};

const TvShowSlice = createSlice({
  name: 'TvShow',
  initialState,
  reducers: {
    addTvShowToWatchlist: (state, action: PayloadAction<string>) => {
      const user = auth.currentUser;
      if (user) {
        state.watchlist.push(action.payload);
        updateFirestore(user.uid, 'watchlist', 'add', action.payload);  // Update Firestore
      }
    },
    removeTvShowFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'watchlist', 'remove', action.payload);  // Update Firestore
      }
    },
    addTvShowToFavorites: (state, action: PayloadAction<string>) => {
      const user = auth.currentUser;
      if (user) {
        state.favorites.push(action.payload);
        updateFirestore(user.uid, 'favorites', 'add', action.payload);  // Update Firestore
      }
    },
    removeTvShowFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'favorites', 'remove', action.payload);  // Update Firestore
      }
    },
    addTvShowToLists: (state, action: PayloadAction<string>) => {
      const user = auth.currentUser;
      if (user) {
        state.lists.push(action.payload);
        updateFirestore(user.uid, 'lists', 'add', action.payload);  // Update Firestore
      }
    },
    removeTvShowFromLists: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(id => id !== action.payload);
      const user = auth.currentUser;
      if (user) {
        updateFirestore(user.uid, 'lists', 'remove', action.payload);  // Update Firestore
      }
    },
    setTvShow: (state, action: PayloadAction<TvShowState>) => {
      state.watchlist = action.payload.watchlist;
      state.favorites = action.payload.favorites;
      state.lists = action.payload.lists;
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
  setTvShow,
} = TvShowSlice.actions;

export default TvShowSlice.reducer;