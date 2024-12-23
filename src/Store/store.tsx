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
import userReducer from '../Reducer/Faviort_List'

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

