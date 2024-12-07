"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Shane Lee",
    role: "Business Owner",
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
    content:
      "I loved this parking app. As someone with a busy schedule, booking a spot quickly saves me so much time. The interface is easy to use, and I love how reliable it is. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Daily Commuter",
    image:
      "https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
    content:
      "Parking in the city used to be a nightmare, but this app makes it simple. I love the transparent pricing and how quickly I can find spots. The process is seamless and stress-free.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Student",
    image:
      "https://img.freepik.com/free-photo/cute-smiling-young-man-with-bristle-looking-satisfied_176420-18989.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
    content:
      "This app has been a lifesaver for me as a student. Booking spots is quick and easy, and the ability to extend my time from my phone is super convenient. It's efficient and reliable!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="container mx-auto py-16 px-8 md:px-16 bg-accent">
      <div className="container flex flex-col sm:flex-row gap-16">
        {/* LEFT */}
        <div className="flex-1">
          <div className="flex items-center justify-start space-x-2 mb-1">
            <span className="h-1 w-6 bg-rose-500 rounded-xl"></span>
            <span className="text-muted-foreground rounded-lg px-2 py-1.5 text-sm sm:text-md font-medium">
              Testimonials
            </span>
          </div>
          <h2 className="text-2xl text-start sm:text-3xl font-bold text-gray-800">
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
            <div className="flex -space-x-4">
              {testimonials.map((testimonial, i) => (
                <div
                  key={testimonial.id}
                  className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-7 w-7 fill-yellow-500 text-accent" />
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">(20000 Reviews)</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="mt-12 relative flex-1">
          <div className="flex items-center flex-wrap justify-between gap-8 ">
            <Card className="w-full max-w-sm order-2 mx-auto shadow-none relative">
              <CardContent className="p-6 z-10 relative rounded-lg bg-white">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row space-y-2">
                    {/* IMAGE */}
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    {/* NAME and ROLE and STARS */}
                    <div className="ml-2">
                      <div>
                        <h3 className="font-semibold">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-7 w-7 fill-yellow-500 text-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground tracking-wide text-md sm:text-lg ">
                    {testimonials[currentIndex].content}
                  </p>
                </div>
              </CardContent>
              <div className="absolute z-0 -inset-y-8 inset-x-10 rounded-lg bg-violet-600"></div>
            </Card>

            <button
              className=" bg-violet-600 order-4 xl:order-1 p-1 rounded-full"
              onClick={previousTestimonial}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button
              className="bg-violet-600 order-6 p-1 rounded-full"
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
