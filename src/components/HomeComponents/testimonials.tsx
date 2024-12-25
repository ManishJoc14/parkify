"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { Feedback } from "@/types/definitions";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Feedback[] | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      const res = await axiosInstance.get("/public/website-app/feedbacks");
      setTestimonials(res.data.reverse());
    }
    try {
      fetchTestimonials();
    } catch {
      console.log("Error fetching testimonials");
    }
  }, []);

  if (!testimonials) return <p>Loading...</p>;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const calculateAverageRating = () => {
    const totalRating = testimonials.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    return totalRating / testimonials.length;
  };

  if (testimonials.length === 0)
    return (
      <section
        id="testimonials"
        className="container mx-auto py-32 px-8 md:px-16 bg-accent"
      >
        <div className="text-center">
          <h2 className="text-2xl font-mont-bold text-gray-800">
            No Testimonials Available
          </h2>
          <p className="text-muted-foreground mt-4 text-md">
            We currently do not have any testimonials to display. Please check
            back later.
          </p>
        </div>
      </section>
    );

  return (
    <section
      id="testimonials"
      className="container mx-auto py-16 px-8 md:px-16 bg-accent"
    >
      <div className="container flex flex-col sm:flex-row gap-16">
        {/* LEFT */}
        <div className="flex-1">
          <div className="flex items-center justify-start space-x-2 mb-1">
            <span className="h-1 w-8 bg-green-500 rounded-xl"></span>
            <span className="text-muted-foreground rounded-lg px-2 py-1.5 text-md uppercase sm:text-md font-mont-semibold">
              Testimonials?
            </span>
          </div>
          <h2 className="text-2xl text-start sm:text-3xl font-mont-bold text-gray-800">
            Over <span className="text-primary">1000+ Customers</span>
            <span className="block">
              {" "}
              <span className="text-primary">With</span> 5 Star Reviews
            </span>
          </h2>
          <p className="text-muted-foreground max-w-[500px] mt-4 text-md">
            Join thousands of satisfied customers who trust our platform for
            their daily parking needs. Experience hassle-free parking solutions
            that work for you.
          </p>

          <div className="mt-8 flex flex-col items-start space-y-2">
            {/* <div className="flex -space-x-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative h-16 w-16 overflow-hidden border-2 rounded-full"
                >
                  <Image
                    src={testimonial?.image}
                    alt={testimonial.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div> */}
            <div className="flex items-center space-x-1">
              <span className="font-semibold"></span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.floor(calculateAverageRating())
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-muted-foreground">
                ({testimonials.length} Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="mt-12 relative flex-1">
          <div className="flex items-center flex-wrap justify-between gap-8 ">
            <Card className="w-full max-w-sm order-2 mx-auto shadow-none border-0 relative">
              <CardContent className="p-6 z-10 relative rounded-lg bg-white">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row items-center space-y-2">
                    {/* IMAGE */}
                    <div className="relative h-16 w-16 p-2 border-primary/60 border rounded-full flex-shrink-0">
                      <User className="h-12 w-12 text-primary" />
                    </div>

                    {/* NAME and ROLE and STARS */}
                    <div className="ml-2">
                      <div>
                        <h3 className="font-mont-bold">
                          {testimonials[currentIndex].fullName || "Anonymous"}
                        </h3>
                        <p className="text-sm font-mont-regular text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= testimonials[currentIndex].rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground tracking-light text-sm sm:text-[1rem] ">
                    {testimonials[currentIndex].message}
                  </p>
                </div>
              </CardContent>
              <div className="absolute z-0 -inset-y-8 inset-x-10 rounded-lg bg-green-500"></div>
            </Card>

            <button
              className=" bg-green-500 order-4 xl:order-1 p-1 rounded-full"
              onClick={previousTestimonial}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button
              className="bg-green-500 order-6 p-1 rounded-full"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
