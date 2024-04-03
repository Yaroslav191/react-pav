import React, { useState, useEffect } from "react";

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStocks = async () => {
      const token = "pk_4f133204c6ab40bdbcd779507e689ce1";
      try {
        const response = await fetch(
          `https://cloud.iexapis.com/stable/ref-data/symbols?token=${token}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }

        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = stocks.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentStocks.map((stock, index) => (
            <tr key={stock.symbol}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={indexOfLastItem >= stocks.length}>
        Next
      </button>
    </div>
  );
};

export default StockList;
