import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../slices/stockSlice";

const Pagination = ({ indexOfLastItem }) => {
  const stocks = useSelector((state) => state.stock.stocks);
  const currentPage = useSelector((state) => state.stock.currentPage);
  const dispatch = useDispatch();

  return (
    <div className="btn__wrapper">
      <button
        onClick={() => dispatch(prevPage())}
        disabled={currentPage === 1}
        style={{
          backgroundColor: currentPage === 1 ? "grey" : "green",
        }}>
        Previous
      </button>
      <button
        onClick={() => dispatch(nextPage())}
        disabled={indexOfLastItem >= stocks.length}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
