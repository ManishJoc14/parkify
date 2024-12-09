import { generateYAxis } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default async function RevenueChart() {
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const revenue = await fetchRevenue(); // Fetch data inside the component
  // ----------------------------------------------------------------------

  const revenue = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 2000 },
    { month: "May", revenue: 3500 },
    { month: "Jun", revenue: 4000 },
    { month: "Jul", revenue: 2500 },
    { month: "Aug", revenue: 4500 },
    { month: "Sep", revenue: 3000 },
    { month: "Oct", revenue: 5000 },
    { month: "Nov", revenue: 1500 },
    { month: "Dec", revenue: 4000 },
  ];

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className=" mb-4 text-xl md:text-2xl">Recent Revenue</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-end flex-nowrap gap-2 rounded-md overflow-x-auto bg-white p-4">
          <div
            className="mb-6 flex flex-col justify-between text-xs text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-xs text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
