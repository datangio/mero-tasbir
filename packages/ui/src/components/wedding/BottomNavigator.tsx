"use client";

import React from "react";
import { motion } from "framer-motion";

export const BottomNavigator: React.FC = () => {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="title-regular rounded-lg bg-orange-500 px-10 py-4 text-xl md:text-3xl font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        Get started
      </motion.button>
    </motion.div>
  );
};
