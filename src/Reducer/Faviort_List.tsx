import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string | null;
}

const initialState: UserState = {
  uid: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    clearUserUid: (state) => {
      state.uid = null;
    },
  },
});

export const { setUserUid, clearUserUid } = userSlice.actions;
export default userSlice.reducer;
