import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from '../Reducer/CommentsSlice';
import movieReducer from '../Reducer/movieSlice';
import TvShowReducer from '../Reducer/TvShowSlice'
import itemReducer from '../Reducer/searchSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    movies: movieReducer,
    tvShow:TvShowReducer,
    items:itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;