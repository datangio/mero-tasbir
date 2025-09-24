"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  footer: string;
  highlight?: string;
  isPopular?: boolean;
  isProfessional?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Bridge Side Package",
    price: "NPR 25,000",
    billing: "One time",
    description: "Perfect for intimate ceremonies and small gatherings.",
    features: [
      "4 hours of photography coverage",
      "100+ edited high-resolution photos",
      "Online gallery for easy sharing",
      "Basic retouching and color correction",
      "USB drive with all photos"
    ],
    footer: "Ideal for small weddings and intimate ceremonies.",
    isPopular: false
  },
  {
    id: "premium",
    name: "Groom Side Package",
    price: "NPR 45,000",
    billing: "One time",
    description: "Our most popular choice for complete wedding coverage.",
    features: [
      "8 hours of photography coverage",
      "300+ edited high-resolution photos",
      "Pre-wedding consultation and planning",
      "Online gallery with password protection",
      "USB drive + printed photo album",
      "Same-day preview photos for social media"
    ],
    footer: "Perfect for traditional weddings with full day coverage.",
    highlight: "MOST POPULAR",
    isPopular: true
  },
  {
    id: "luxury",
    name: "Both Side Package",
    price: "NPR 75,000",
    billing: "One time",
    description: "Complete luxury wedding photography experience.",
    features: [
      "12 hours of photography coverage",
      "500+ edited high-resolution photos",
      "Engagement session included",
      "Pre-wedding consultation and timeline planning",
      "Premium online gallery with unlimited downloads",
      "Luxury photo album + USB drive",
      "Same-day preview photos",
      "1 year of photo storage"
    ],
    footer: "For couples who want the ultimate wedding photography experience.",
    highlight: "Both Side",
    isProfessional: true
  }
];

interface PricingSectionProps {
  onSelectPlan?: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wider text-orange-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            WEDDING PACKAGES
          </motion.p>
          
          <motion.h2
            className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose Your Perfect Wedding Package
          </motion.h2>

          {/* Trusted by couples */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 border-2 border-white"
                />
              ))}
              <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                +
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Trusted by 200+ couples</p>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg transition-all duration-300 ${
                plan.isProfessional
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`rounded-full px-4 py-1 text-xs font-medium ${
                      plan.isProfessional
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {plan.highlight}
                  </span>
                </div>
              )}

              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 right-4">
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-800">Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Content */}
              <div className="mb-4 sm:mb-6">
                <h3 className="mb-2 text-lg sm:text-xl lg:text-2xl font-bold">{plan.name}</h3>
                <div className="mb-3 sm:mb-4 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">{plan.price}</span>
                  <span
                    className={`text-xs sm:text-sm ${
                      plan.isProfessional ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {plan.billing}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm ${
                    plan.isProfessional ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <Check
                      className={`mt-0.5 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ${
                        plan.isProfessional ? "text-orange-400" : "text-orange-600"
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        plan.isProfessional ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(plan.id)}
                className={`w-full rounded-xl py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                  plan.isProfessional
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`}
              >
                Get started
              </motion.button>

            
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};