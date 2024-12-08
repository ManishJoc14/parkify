import Header from "@/components/HomeComponents/header";
import Hero from "@/components/HomeComponents/hero";
import HowItWorks from "@/components/HomeComponents/howItWorks";
import Benefits from "@/components/HomeComponents/benefits";
import Services from "@/components/HomeComponents/services";
import Testimonials from "@/components/HomeComponents/testimonials";
import FAQ from "@/components/HomeComponents/faq";
import Footer from "@/components/HomeComponents/footer";
import FeedbackForm from "@/components/feedback/feedbackForm";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Services />
      <Testimonials />
      <FAQ />
      <FeedbackForm />
      <Footer />
    </>
  );
}
