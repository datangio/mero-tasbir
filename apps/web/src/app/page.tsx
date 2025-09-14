import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

import HeroSection from "@/components/HeroSection/page";
import Service from "@/components/Service/page";
import Newsletter from "@/components/Newsletter/page";

import Course from "@/app/course/page";
import Pricing from "@/components/Pricing/page";
import Testimonial from "@/components/Testimonial/page";

export default function Home() {
  return (
    <div className="container">
      <main className="min-h-screen bg-white">
        {/* Navbar */}
        <Navbar />

        <HeroSection />
        <Service />
        <Course />

        <Pricing />
        <Testimonial />

        <Newsletter />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
