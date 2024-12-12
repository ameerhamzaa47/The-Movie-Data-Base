// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/auth';

// interface User {
//   id: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
// }

// interface AuthState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// // Thunk for checking if user exists in Firebase Auth and fetching data from Firestore
// export const login = createAsyncThunk<User, string, { rejectValue: string }>(
//   'auth/login',
//   async (email: string, { rejectWithValue }) => {
//     try {
//       const userCredential = await firebase.auth().signInWithEmailAndPassword(email, 'password'); // Use actual password here
//       const user = userCredential.user;
//       if (!user) {
//         throw new Error('User not found');
//       }
//       // Fetch user data from Firestore
//       const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
//       if (!userDoc.exists) {
//         throw new Error('User data not found in Firestore');
//       }
//       return { ...userDoc.data(), id: user.uid } as User;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for registering a user
// export const register = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
//   'auth/register',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       if (!user) {
//         throw new Error('Registration failed');
//       }
//       // Add user data to Firestore after registration
//       await firebase.firestore().collection('users').doc(user.uid).set({
//         email: user.email,
//         displayName: user.displayName || '',
//         photoURL: user.photoURL || '',
//       });
//       return { id: user.uid, email: user.email!, displayName: user.displayName || '', photoURL: user.photoURL || '' };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.loading = false;
//       state.error = null;
//       firebase.auth().signOut();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;