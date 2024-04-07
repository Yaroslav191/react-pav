import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  stocks: [],
  currentPage: 1,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      state.currentPage -= 1;
    },
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
  },
});

export const { setCurrentPage, nextPage, prevPage, setStocks } =
  stockSlice.actions;

export default stockSlice.reducer;
