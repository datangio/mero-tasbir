import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Carefully selected hotels",
    description:
      "Add in the details of your wedding and we'll start sourcing the best hotels for your celebration at expert-negotiated rates.",
  },
  {
    number: "02",
    title: "A unified view for all hotel proposals",
    description:
      "We'll share your options in a side-by-side view on our platform so you can choose which one best suits your dream day.",
  },
  {
    number: "03",
    title: "Everything but the stress",
    description:
      "We take care of booking the hotel, managing contracts, and ensuring everything is perfect for your special day.",
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  return (
    <div className="w-full bg-white px-8 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="title-regular mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Find the perfect stay for your perfect day
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left Side - Steps */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
              >
                <div className="flex items-center space-x-6">
                  <motion.button
                    onClick={() => handleStepClick(index + 1)}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      activeStep === index + 1
                        ? "scale-110 border-orange-500 bg-orange-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`text-xl font-bold ${
                        activeStep === index + 1
                          ? "text-orange-500"
                          : "text-gray-600"
                      }`}
                    >
                      {step.number}
                    </span>
                  </motion.button>
                  <div className="flex-1">
                    <h3
                      className={`mb-4 text-3xl font-bold transition-colors duration-300 md:text-4xl ${
                        activeStep === index + 1
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mb-6 text-lg leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg border-2 border-orange-500 px-8 py-3 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                    >
                      Start a group booking
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Mobile Mockup */}
          <div className="lg:sticky lg:top-20 lg:flex lg:h-screen lg:items-center lg:justify-center">
            <motion.div
              className="relative w-full max-w-80"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Background with Wedding Dress */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute right-8 top-8 h-48 w-32 rounded-lg bg-white opacity-20 shadow-lg">
                  <div className="h-full w-full rounded-lg bg-gradient-to-b from-white to-gray-100"></div>
                </div>
              </div>

              {/* Mobile Device Frame */}
              <div className="relative z-10 mx-auto h-[600px] w-80 rounded-[2.5rem] bg-gray-900 p-2 shadow-2xl">
                <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
                  {/* Mobile Header with Notification */}
                  <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-orange-500"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Engine</h4>
                        <p className="text-sm text-gray-500">Trip Manager</p>
                      </div>
                    </div>
                    {/* Notification Bell */}
                    <div className="relative">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-500"></div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="h-full space-y-4 overflow-y-auto p-6">
                    {/* Chat Message */}
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-gray-900 p-4 text-white">
                      <p className="text-sm leading-relaxed">
                        Hi Sabrina! Here is a popular Drury Inn & Suites that
                        you might like. It fits within your budget and free
                        breakfast is included.
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full bg-orange-500"></div>
                        <span className="text-xs text-gray-300">
                          Jane, Trip Manager at Engine
                        </span>
                      </div>
                    </div>

                    {/* Hotel Cards */}
                    <div className="space-y-3">
                      {/* Hotel Card 1 - Drury Inn & Suites Austin */}
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center"
                              alt="Drury Inn & Suites Austin"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-gray-900">
                              Drury Inn & Suites Austin
                            </h5>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-xs text-yellow-500">
                                ★ 4.9
                              </span>
                              <span className="text-xs text-gray-500">
                                0.5 miles from venue
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hotel Card 2 */}
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&h=100&fit=crop&crop=center"
                              alt="Luxury Hotel"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-gray-900">
                              The Ritz-Carlton
                            </h5>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-xs text-yellow-500">
                                ★ 4.8
                              </span>
                              <span className="text-xs text-gray-500">
                                1.2 miles from venue
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hotel Card 3 */}
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop&crop=center"
                              alt="Boutique Hotel"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-gray-900">
                              Boutique Hotel
                            </h5>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-xs text-yellow-500">
                                ★ 4.7
                              </span>
                              <span className="text-xs text-gray-500">
                                0.8 miles from venue
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hotel Card 4 */}
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center"
                              alt="Garden Hotel"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-gray-900">
                              Garden Hotel
                            </h5>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-xs text-yellow-500">
                                ★ 4.6
                              </span>
                              <span className="text-xs text-gray-500">
                                1.5 miles from venue
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
