import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
