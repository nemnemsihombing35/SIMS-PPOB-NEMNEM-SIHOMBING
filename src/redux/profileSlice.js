import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  balance: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.balance = action.payload.balance;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
