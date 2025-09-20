import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PRICING_PACKAGES } from "../../constants/wedding.constants";
import { PRICING_ANIMATIONS } from "../../constants/animations.constants";

interface PricingSectionProps {
  onLearnMore: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onLearnMore,
}) => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Simple and affordable pricing
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our innovative model reduces costs for photographers, so you save ££
            without compromising on quality.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PRICING_PACKAGES.map(pkg => (
              <PricingCard
                key={pkg.id}
                package={pkg}
                onLearnMore={onLearnMore}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 flex h-12 w-12 -translate-x-4 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <ChevronRight className="h-6 w-6 rotate-180 text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 translate-x-4 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {PRICING_PACKAGES.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === 0 ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  package: (typeof PRICING_PACKAGES)[0];
  onLearnMore: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  package: pkg,
  onLearnMore,
}) => {
  const formatPrice = (price: number) => {
    const priceStr = price.toString();
    if (priceStr.length === 3) {
      return {
        main: `£${priceStr.slice(0, 2)}`,
        sub: priceStr.slice(2),
      };
    }
    return {
      main: `£${priceStr}`,
      sub: "",
    };
  };

  const price = formatPrice(pkg.price);

  return (
    <motion.div
      whileHover={PRICING_ANIMATIONS.card.whileHover}
      transition={PRICING_ANIMATIONS.card.transition}
      className="relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      {/* Badge */}
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
          <span
            className={`${pkg.badge.color === "red" ? "bg-red-500" : "bg-blue-500"} rounded-full px-4 py-1 text-sm font-semibold text-white`}
          >
            {pkg.badge.text}
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">{pkg.name}</h3>

        {/* Price */}
        <div className="mb-6">
          <span className="text-5xl font-bold text-gray-900">{price.main}</span>
          {price.sub && (
            <span className="text-5xl font-bold text-gray-900">
              {price.sub}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="mb-8 space-y-4">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                <span className="text-sm text-purple-600">{feature.icon}</span>
              </div>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <motion.button
          whileHover={PRICING_ANIMATIONS.button.whileHover}
          whileTap={PRICING_ANIMATIONS.button.whileTap}
          transition={PRICING_ANIMATIONS.button.transition}
          onClick={onLearnMore}
          className="w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Learn more
        </motion.button>
      </div>
    </motion.div>
  );
};
