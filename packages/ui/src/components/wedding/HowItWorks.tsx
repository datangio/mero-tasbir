"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Select the package",
    description:
      "Add in the details of your wedding and we'll start sourcing the best hotels for your celebration at expert-negotiated rates.",
  },
  {
    number: "02",
    title: "Get confirmation call",
    description:
      "We'll share your options in a side-by-side view on our platform so you can choose which one best suits your dream day.",
  },
  {
    number: "03",
    title: "Get clicked",
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
    <div id="how-it-works" className="w-full bg-white px-8 py-20">
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
                        ? "scale-110 bg-orange-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    style={{ borderColor: activeStep === index + 1 ? '#FB7F33' : undefined }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`text-xl font-bold ${
                        activeStep === index + 1
                          ? ""
                          : "text-gray-600"
                      }`}
                      style={{ color: activeStep === index + 1 ? '#FB7F33' : undefined }}
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
                      className="rounded-lg border-2 px-8 py-3 font-semibold transition-all duration-300 hover:text-white"
                      style={{ 
                        borderColor: '#FB7F33', 
                        color: '#FB7F33',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FB7F33';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#FB7F33';
                      }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

         
         
        </div>
      </div>
    </div>
  );
};
