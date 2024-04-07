import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setStocks } from "../slices/stockSlice";

const StockList = () => {
  const stocks = useSelector((state) => state.stock.stocks);
  const currentPage = useSelector((state) => state.stock.currentPage);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState(stocks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedRows = Array.from(rows);
    const [removed] = updatedRows.splice(startIndex, 1);
    updatedRows.splice(endIndex, 0, removed);

    setRows(updatedRows);
  };

  useEffect(() => {
    const fetchStocks = async () => {
      const token = "";
      try {
        const response = await fetch(
          `https://cloud.iexapis.com/stable/ref-data/symbols?token=${token}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }

        const data = await response.json();
        dispatch(setStocks(data));
        setRows(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, [dispatch]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = rows.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app__inner">
        <h2>Stocks</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
            </tr>
          </thead>
          <Droppable droppableId="stocks">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {currentStocks.map((stock, index) => (
                  <Draggable
                    key={stock.name}
                    draggableId={stock.name}
                    index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            )}
          </Droppable>
        </table>

        <Pagination indexOfLastItem={indexOfLastItem} />
      </div>
    </DragDropContext>
  );
};

export default StockList;
