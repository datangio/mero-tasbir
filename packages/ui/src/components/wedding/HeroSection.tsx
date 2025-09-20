import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNavigator } from "./BottomNavigator";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { HowItWorks } from "./HowItWorks";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  // Wedding type rotation
  const weddingTypes = ["Weeding", "Pasni", "Event", "Anniversary"];
  const [currentWeddingType, setCurrentWeddingType] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeddingType(prevIndex => (prevIndex + 1) % weddingTypes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="flex h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Left Section - Content */}
        <div className="flex w-[70vw] items-center justify-center px-8 pr-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-none"
          >
            {/* Main Headline - Full Width Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              className="mb-8 w-full px-2 text-center"
            >
              <h1 className="mb-2 text-center text-5xl font-bold leading-none text-gray-900 md:text-7xl">
                Every Moment of Your,
                <br />
              </h1>
              <h1 className="mb-2 ml-32 max-w-2xl overflow-hidden text-center text-6xl font-medium italic leading-none text-gray-900 md:text-5xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWeddingType}
                    initial={{ opacity: 1, x: -800 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 1, x: 1500 }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="inline-block text-6xl font-bold md:text-8xl"
                  >
                    {weddingTypes[currentWeddingType]}
                  </motion.span>
                </AnimatePresence>
                <br /> Beautifully Captured
              </h1>
            </motion.div>

            {/* Description - Full Width Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mb-10 w-full px-4"
            >
              <p className="text-center text-xl leading-relaxed text-gray-600">
                The tools you need to build your photography
                <br />
                business. Get started - like, right now.
              </p>
            </motion.div>

            {/* Action Buttons - Full Width Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="w-full px-4 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="mb-4 rounded-lg bg-black px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                TRY IT FOR FREE
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section - Single Image */}
        <div className="relative w-[30vw] overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Single Static Image */}
            <div className="relative h-[80vh] w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Story Section - Client Testimonials */}
      <motion.div
        className="w-full bg-white px-8 py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.h2 className="text-6xl font-bold uppercase text-gray-900">
              Recent <br /> Projects
            </motion.h2>

            <motion.div className="max-w-md text-right text-black">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
              ullam!
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wedding Photos Section */}
      <motion.div
        className="relative w-full overflow-hidden bg-white px-8 py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h2
            className="title-regular relative mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Photos That Shine for
            <br />
            Every{" "}
            <span className="relative inline-block h-12 rounded-md px-2 py-1 text-orange-500">
              Ocassions
              {/* black wavy underline */}
              <motion.div
                className="absolute -bottom-6 left-0 right-0 h-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                <svg
                  viewBox="0 0 200 20"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q8,0 16,10 Q24,20 32,10 Q40,0 48,10 Q56,20 64,10 Q72,0 80,10 Q88,20 96,10 Q104,0 112,10 Q120,20 128,10 Q136,0 144,10 Q152,20 160,10 Q168,0 176,10 Q184,20 192,10 Q200,0 200,10"
                    stroke="#000000"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Every special moment deserves to be captured beautifully — whether
            it’s a wedding, birthday, family gathering, or corporate event. Book
            your Mero Tasbir photographer today and let your memories live
            forever in perfect photos.
          </motion.p>

          <BottomNavigator />
        </div>
      </motion.div>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Chat Support Icon - Bottom Right */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
