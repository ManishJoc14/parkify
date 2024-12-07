import Header from "@/components/HomeComponents/header";
import Benefits from "@/components/HomeComponents/benefits";
import FAQ from "@/components/HomeComponents/faq";
import Footer from "@/components/HomeComponents/footer";
import Hero from "@/components/HomeComponents/hero";
import HowItWorks from "@/components/HomeComponents/howitworks";
import Services from "@/components/HomeComponents/services";
import Testimonials from "@/components/HomeComponents/testimonials";

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
      <Footer />
    </>
  );
}
