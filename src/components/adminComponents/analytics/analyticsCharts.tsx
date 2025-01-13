'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"
import { CalendarIcon, CreditCardIcon, TrendingUpIcon } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Booking, BookingStatus } from "@/types/definitions"
import { formatCurrency } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import axiosInstance from "@/lib/axiosInstance"
import { useAuth } from "@/context/authContext"
import AnalyticsChartsSkeleton from "./analyticsChartSkeleton"

interface StatusData {
    name: BookingStatus;
    value: number;
}

interface RevenueData {
    vehicle: string;
    amount: number;
}

interface TimeData {
    date: string;
    count: number;
}

// eslint-disable-next-line
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                <p className="text-sm font-mont-medium">{label || payload[0].name}</p>
                <p className="text-sm font-mont-semibold text-primary">
                    {typeof payload[0].value === 'number' && payload[0].name !== 'count'
                        ? `$${payload[0].value.toFixed(2)}`
                        : payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function AnalyticsCharts() {
    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const limit = 4;
    const { handleTokenNotValid } = useAuth();

    const fetchBookings = useCallback(async (url: string) => {
        try {
            const res = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setBookings(res.data.results);
            // eslint-disable-next-line            
        } catch (error: any) {
            console.log("Error fetching bookings:", error);
            if (error?.response?.data?.code === "token_not_valid") {
                handleTokenNotValid();
            }
        }
    }, [handleTokenNotValid]);

    useEffect(() => {
        try {
            fetchBookings(`/admin/parking-spot-app/bookings?limit=${limit}`);
        } catch {
            console.log("Error fetching bookings in admin table");
        }
    }, [fetchBookings]);

    if (!bookings) return <AnalyticsChartsSkeleton />


    // Process data for status distribution
    const statusData: StatusData[] = bookings.reduce((acc: StatusData[], booking) => {
        const statusIndex = acc.findIndex((item) => item.name === booking.status)
        if (statusIndex === -1) {
            acc.push({ name: booking.status, value: 1 })
        } else {
            acc[statusIndex].value += 1
        }
        return acc
    }, [])

    // Process data for revenue by vehicle type
    const revenueData: RevenueData[] = bookings.reduce((acc: RevenueData[], booking) => {
        const typeIndex = acc.findIndex((item) => item.vehicle === booking.vehicle)
        if (typeIndex === -1) {
            acc.push({ vehicle: booking.vehicle, amount: parseFloat(booking.amount) })
        } else {
            acc[typeIndex].amount += parseFloat(booking.amount)
        }
        return acc
    }, [])

    // Process data for bookings over time
    const timeData: TimeData[] = bookings.reduce((acc: TimeData[], booking) => {
        const date = new Date(booking.startTime).toLocaleDateString()
        const dateIndex = acc.findIndex((item) => item.date === date)
        if (dateIndex === -1) {
            acc.push({ date, count: 1 })
        } else {
            acc[dateIndex].count += 1
        }
        return acc
    }, [])

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0)
    const totalBookings = statusData.reduce((sum, item) => sum + item.value, 0)
    const confirmedBookings = statusData.find(s => s.name === "CONFIRMED" as BookingStatus)?.value || 0
    const confirmedPercentage = Math.round((confirmedBookings / totalBookings) * 100)

    const lastMonthRevenue = 0; // Assumed as 0 for last month
    const lastMonthBookings = 0; // Assumed as 0 for last month

    // Calculate percentage growth
    const revenueGrowth = ((totalRevenue - lastMonthRevenue) / (lastMonthRevenue + 1)) * 100;
    const bookingsGrowth = ((totalBookings - lastMonthBookings) / (lastMonthBookings + 1)) * 100;

    // Format growth for display
    const formattedRevenueGrowth = `${revenueGrowth.toFixed(1)}%`;
    const formattedBookingsGrowth = `${bookingsGrowth.toFixed(1)}%`;


    return (
        <div className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-mont-medium text-muted-foreground mb-1">Total Revenue</p>
                            <h2 className="text-3xl font-mont-semibold">{formatCurrency(totalRevenue)}</h2>
                            <p className={`text-xs flex items-center mt-2 ${revenueGrowth > 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                <TrendingUpIcon className="w-4 h-4 mr-1" />
                                {formattedRevenueGrowth} from last month
                            </p>
                        </div>
                        <CreditCardIcon className="w-8 h-8 text-muted-foreground self-start" />
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-mont-medium text-muted-foreground mb-1">Total Bookings</p>
                            <h2 className="text-3xl font-mont-semibold">{totalBookings}</h2>
                            <p className={`text-xs flex items-center mt-2 ${bookingsGrowth > 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                <TrendingUpIcon className="w-4 h-4 mr-1" />
                                {formattedBookingsGrowth} from last month
                            </p>
                        </div>
                        <CalendarIcon className="w-8 h-8 text-muted-foreground self-start" />
                    </div>
                </Card>


                <Card className="p-6">
                    <div>
                        <p className="text-sm font-mont-medium text-muted-foreground">Booking Status</p>
                        <h3 className="text-2xl font-mont-semibold mt-2 text-green-500">
                            CONFIRMED {confirmedPercentage}%
                        </h3>
                        <div className="mt-3">
                            <Progress value={confirmedPercentage} className="h-2" />
                        </div>
                    </div>
                </Card>

                <div className="w-full md:col-span-3">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Revenue by Vehicle Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer className="text-sm" width="100%" height="100%">
                                        <BarChart data={revenueData}>
                                            <XAxis
                                                dataKey="vehicle"
                                                axisLine={false}
                                                tickLine={false}

                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar
                                                dataKey="amount"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-3">
                            <CardHeader>
                                <CardTitle>Booking Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={timeData} className="text-">
                                            <XAxis
                                                dataKey="date"
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="hsl(var(--primary))"
                                                fill="hsl(var(--primary))"
                                                fillOpacity={0.2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

