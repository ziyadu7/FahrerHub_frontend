import React from "react";

const Pagination = ({ currentPage, onPageChange,skip,setSkip,noMore }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSkip(skip-10)
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
      setSkip(skip+10)
      onPageChange(currentPage + 1);
  };

  return (
    <div
      className={`flex justify-center`}
    >
      {currentPage > 1 && (
        <button
          className="px-4 py-1 mr-2 bg-blue-300 text-sm hover:bg-blue-500 text-white rounded-lg"
          onClick={handlePrevPage}
        >
          {"Prev"}
        </button>
      )}
      {noMore?'':<button
          className="px-4 py-1 bg-blue-300 text-sm hover:bg-blue-500 text-white rounded-lg"
          onClick={handleNextPage}
        >
          {"Next"}
        </button>}
    </div>
  );
};

export default Pagination;