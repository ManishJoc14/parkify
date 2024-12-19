import React from "react";

const ParkingCardSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-col sm:flex-row w-full overflow-hidden bg-white rounded-lg animate-pulse">
        <div className="w-full sm:w-1/3 h-auto bg-gray-200"></div>
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <div className="h-5 w-20 rounded-md bg-gray-200 mb-2"></div>
            <div className="h-5 w-8 rounded-md bg-gray-200"></div>
          </div>
          <div className=" mb-1 py-1 rounded-md h-5 w-32 bg-gray-200"></div>
          <div className="h-[1px] w-full rounded-md bg-gray-200 mb-2"></div>
          <div className="flex items-center rounded-md justify-between gap-4 mb-2 py-2">
            <div className="h-3 w-16 rounded-md bg-gray-200"></div>
            <div className="h-3 w-16 rounded-md bg-gray-200"></div>
          </div>
          <div className="h-[1px] rounded-md w-full bg-gray-200 mb-3"></div>
          <div className="flex justify-between gap-2 pt-2">
            <div className="px-2 py-1 h-8 flex-1 text-xs font-mont-medium text-secondary-foreground bg-gray-200 rounded-md"></div>
            <div className="px-4 py-2 h-8 flex-1 text-xs font-mont-medium bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParkingCardSkeleton;
