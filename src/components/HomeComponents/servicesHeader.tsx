import { FilterDialog } from "./filterDialog";

export default function ServicesHeader() {
  return (
    <div>
      <div className="flex items-center justify-start px-16 mb-1">
        <span className="h-1 w-6 bg-rose-500 rounded-xl"></span>
        <span className="text-muted-foreground rounded-lg px-2 py-1.5 text-sm sm:text-md font-medium">
          800+ Service Provider
        </span>
      </div>

      <div className="flex justify-between px-16 pb-4">
        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-800">
          Our <span className="text-primary">Featured Parkings</span>
        </h2>

        <FilterDialog />
      </div>
    </div>
  );
}
