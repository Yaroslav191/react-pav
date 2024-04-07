import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./slices/stockSlice";

export const store = configureStore({
  reducer: {
    stock: stockSlice,
  },
});
