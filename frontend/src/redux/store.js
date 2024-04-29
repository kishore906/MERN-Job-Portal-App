import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { jobApi } from "./api/jobApi";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      jobApi.middleware,
    ]),
});

export default store;
