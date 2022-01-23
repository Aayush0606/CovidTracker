import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CovidData from "../Feature/CovidData";

export const store = configureStore({
  reducer: {
    data: CovidData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
