import { configureStore } from "@reduxjs/toolkit";
import applicaionReducer from "../slices/application.slice";
import { authApi } from "../services/AuthApi";
import { utilityApi } from "../services/utilityApi";

export default configureStore({
  reducer: {
    application: applicaionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [utilityApi.reducerPath]: utilityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, utilityApi.middleware),
});
