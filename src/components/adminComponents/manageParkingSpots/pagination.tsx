import React from "react";

interface PaginationProps {
  next: string | null;
  previous: string | null;
  total: number;
  handlePagination: (url: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  next,
  previous,
  total,
  handlePagination,
}) => {
  const handleNext = () => {
    if (next) handlePagination(next);
  };

  const handlePrevious = () => {
    if (previous) handlePagination(previous);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-lg">
      <button
        onClick={handlePrevious}
        disabled={!previous}
        className={`px-4 py-2 rounded-md ${
          previous
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Previous
      </button>
      <div className="text-sm text-gray-700">
        <span>Total Parking Spots: </span>
        <strong>{total}</strong>
      </div>
      <button
        onClick={handleNext}
        disabled={!next}
        className={`px-4 py-2 rounded-md ${
          next
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
