import AnalyticsCharts from "@/components/adminComponents/analytics/analyticsCharts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics",
};

export default async function Page() {

    return (
        <main>
            <h1 className="mb-4 text-xl font-mont-medium md:text-2xl">Analytics</h1>
            <AnalyticsCharts />
        </main>
    );
}
