// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../Reducer/authReducer';

// // Configure the Redux store with authReducer
// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Add the authReducer to the store
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from '../Reducer/CommentsSlice'

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
