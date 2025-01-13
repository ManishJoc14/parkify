'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CreditCardIcon } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsChartsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {/* Total Revenue Card */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-mont-medium text-muted-foreground mb-1">Total Revenue</p>
                            <Skeleton className="h-9 w-32" />
                            <div className="flex items-center mt-2">
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                        <CreditCardIcon className="w-8 h-8 text-muted-foreground self-start" />
                    </div>
                </Card>

                {/* Total Bookings Card */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-mont-medium text-muted-foreground mb-1">Total Bookings</p>
                            <Skeleton className="h-9 w-24" />
                            <div className="flex items-center mt-2">
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <CalendarIcon className="w-8 h-8 text-muted-foreground self-start" />
                    </div>
                </Card>

                {/* Booking Status Card */}
                <Card className="p-6">
                    <div>
                        <p className="text-sm font-mont-medium text-muted-foreground">Booking Status</p>
                        <Skeleton className="h-8 w-44 mt-2" />
                        <div className="mt-3">
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </Card>

                <div className="w-full md:col-span-3">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
                        {/* Revenue by Vehicle Type Card */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Revenue by Vehicle Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-end justify-center">
                                    <div className="w-full h-full justify-around flex items-end space-y-3">
                                        <Skeleton className="w-[40px] h-full" />
                                        <Skeleton className="w-[40px] h-3/4" />
                                        <Skeleton className="w-[40px] h-1/2" />
                                        <Skeleton className="w-[40px] h-3/4" />
                                        <Skeleton className="w-[40px] h-1/3" />
                                        <Skeleton className="w-[40px] h-2/4" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking Trends Card */}
                        <Card className="md:col-span-3">
                            <CardHeader>
                                <CardTitle>Booking Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex gap-2 items-center justify-center">
                                    <div className="space-y-12">
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                    <div className="w-full space-y-3">
                                        <Skeleton className="h-[200px] w-full" />
                                        <div className="flex justify-between">
                                            <Skeleton className="h-6 w-20" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

