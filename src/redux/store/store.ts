import { configureStore } from "@reduxjs/toolkit";
import applicaionReducer from "../slices/application.slice";
import { authApi } from "../services/AuthApi";

export default configureStore({
  reducer: {
    application: applicaionReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
