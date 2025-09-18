"use client";
import { Header } from "@repo/ui/index";
import { motion } from "framer-motion";
import { Camera, Heart, Calendar, Star } from "lucide-react";

export default function Home() {
  const handleCheckAvailability = () => {
    // Handle check availability action
    console.log("Check availability clicked");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        logo="Mero Tasbir"
        onCheckAvailability={handleCheckAvailability}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-5xl font-bold text-gray-900"
            >
              Capture Your Perfect
              <span className="text-pink-600"> Wedding</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-xl text-gray-600"
            >
              Professional wedding photography services that capture every
              precious moment of your special day with elegance and artistry.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-pink-700"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Wedding
              </a>
              <a
                href="/wedding"
                className="inline-flex items-center justify-center rounded-lg border border-pink-600 px-8 py-4 text-lg font-semibold text-pink-600 transition-colors hover:bg-pink-50"
              >
                <Camera className="mr-2 h-5 w-5" />
                View Portfolio
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Choose Mero Tasbir?
            </h2>
            <p className="text-lg text-gray-600">
              We specialize in creating timeless memories that you'll treasure
              forever
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Professional Quality",
                description:
                  "High-end equipment and years of experience ensure stunning results",
              },
              {
                icon: Heart,
                title: "Personal Touch",
                description:
                  "We understand your vision and bring it to life with creativity",
              },
              {
                icon: Star,
                title: "5-Star Service",
                description:
                  "From consultation to delivery, we provide exceptional service",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="rounded-lg p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <feature.icon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Book Your Wedding Photography?
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Let's create beautiful memories together. Contact us today to
            discuss your special day.
          </p>
          <a
            href="/booking"
            className="inline-flex items-center rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-pink-700"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
}
