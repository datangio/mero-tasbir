import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What sets Mero Tasbir apart?",
    answer:
      "Mero Tasbir combines artistic vision with technical expertise to capture your special moments. We offer personalized service, state-of-the-art equipment, and a commitment to delivering photos that tell your unique story.",
  },
  {
    id: 2,
    question: "How does the photography process work?",
    answer:
      "Our process begins with a consultation to understand your vision. We then plan the shoot, capture your moments with professional equipment, and deliver beautifully edited photos within 2-3 weeks.",
  },
  {
    id: 3,
    question: "Can I customize my photography package?",
    answer:
      "Absolutely! We offer flexible packages that can be customized to fit your needs and budget. From intimate ceremonies to grand celebrations, we tailor our services to your specific requirements.",
  },
  {
    id: 4,
    question: "Does my package include all edited photos?",
    answer:
      "Yes. You receive all professionally edited high-resolution photos with full rights to print and share. We also provide a selection of our best shots in both color and black & white versions. No hidden fees.",
  },
];

export const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(4); // Start with last item open

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.div
      className="w-full bg-white px-8 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-8">
            <motion.h2
              className="title-regular text-4xl font-bold text-gray-900 md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              We offer dedicated expert support, in-depth photography guides,
              and comprehensive documentation. Our team highlights key insights
              with detailed explanations of every service and package option.
            </motion.p>

            {/* Visual Graphic */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                {/* Central vertical line with nodes */}
                <div className="flex flex-col items-center space-y-6">
                  {/* Document Icon Node */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>

                  {/* Vertical Line */}
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-300 to-pink-300"></div>

                  {/* Play Button Icon Node */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>

                  {/* Vertical Line */}
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-300 to-pink-300"></div>

                  {/* Chat Icon Node */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,3C17.5,3 22,6.58 22,11C22,12.13 21.8,13.2 21.4,14.2C21.9,15.2 22,16.3 22,17.3C22,18.4 21.7,19.5 21.1,20.4C20.5,21.3 19.7,22 18.7,22.5C17.7,23 16.6,23.2 15.5,23.2C14.4,23.2 13.3,23 12.3,22.5C11.3,22 10.5,21.3 9.9,20.4C9.3,19.5 9,18.4 9,17.3C9,16.3 9.1,15.2 9.6,14.2C9.2,13.2 9,12.1 9,11C9,6.58 13.5,3 19,3Z" />
                    </svg>
                  </div>
                </div>

                {/* Video Guide Card */}
                <div className="absolute right-4 top-4 max-w-48 rounded-xl bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Video Guides
                    </span>
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
                      4K
                    </span>
                  </div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - FAQ List */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        {/* Camera Aperture Icon */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        {/* Aperture Blades */}
                        <path
                          d="M12 4 L16 8 L12 12 L8 8 Z"
                          fill="#9CA3AF"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M20 12 L16 16 L12 12 L16 8 Z"
                          fill="#9CA3AF"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M12 20 L8 16 L12 12 L16 16 Z"
                          fill="#9CA3AF"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M4 12 L8 8 L12 12 L8 16 Z"
                          fill="#9CA3AF"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M12 4 L8 8 L12 12 L16 8 Z"
                          fill="#9CA3AF"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        {/* Central Opening */}
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="flex items-start space-x-4">
                          <div className="h-8 w-8 flex-shrink-0"></div>
                          <p className="leading-relaxed text-gray-600">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
