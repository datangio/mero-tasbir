
import Footer from "@/components/Footer/page";
import Banner from "@/components/Banner/Banner";

import HeroSection from "@/components/HeroSection/page";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import WorkBentoGrid from "@/components/WorkBentoGrid/WorkBentoGrid";
import FreelancerMarketplace from "@/components/FreelancerMarketplace/FreelancerMarketplace";
import Service from "@/components/Service/page";

// import Course from "@/app/course/page";
import Pricing from "@/components/Pricing/page";
import CateringPackages from "@/components/CateringPackages/CateringPackages";
import Testimonial from "@/components/Testimonial/page";
import FAQ from "@/components/FAQ/FAQ";

export default function Home() {
  return (
    <div className="w-full">
      <main className="min-h-screen bg-white">
        {/* Navbar */}
       
        {/* Banner */}
        <Banner />

        <HeroSection />
        <ImageCarousel />
        <WorkBentoGrid />
        <Pricing />
        <CateringPackages />
        <FreelancerMarketplace />
        <Service />
        {/* <Course /> */}

      
        <Testimonial />
        <FAQ />
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
