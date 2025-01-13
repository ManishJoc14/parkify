"use client";
import Header from "@/components/HomeComponents/header";
import Hero from "@/components/HomeComponents/hero";
import HowItWorks from "@/components/HomeComponents/howItWorks";
import Benefits from "@/components/HomeComponents/benefits";
import Testimonials from "@/components/HomeComponents/testimonials";
import FAQ from "@/components/HomeComponents/faq";
import Footer from "@/components/HomeComponents/footer";
import FeedbackForm from "@/components/HomeComponents/feedback/feedbackForm";
import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { Feedback } from "@/types/definitions";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const [testimonials, setTestimonials] = useState<Feedback[] | null>(null);
  const { user } = useAuth();

  const fetchTestimonials = useCallback(async () => {
    const res = await axiosInstance.get("/public/website-app/feedbacks");
    setTestimonials(res.data.reverse());
  }, []);

  useEffect(() => {
    try {
      fetchTestimonials();
    } catch {
      console.log("Error fetching testimonials");
    }
  }, [fetchTestimonials]);

  return (
    <>
      <Header user={user} />
      <Hero user={user} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <Benefits />
      <FAQ />
      <FeedbackForm refetch={fetchTestimonials} />
      <Footer />
    </>
  );
}
