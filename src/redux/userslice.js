import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // This should hold user data, such as { username: '', email: '' }
  isAuthenticated: false, // Renamed for clarity
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
