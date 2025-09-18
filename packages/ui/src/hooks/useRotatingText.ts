import { useState, useEffect } from "react";
import { ROTATING_SERVICES } from "../constants/wedding.constants";

export const useRotatingText = (intervalMs: number = 1000) => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex(
        prevIndex => (prevIndex + 1) % ROTATING_SERVICES.length
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return {
    currentService: ROTATING_SERVICES[currentServiceIndex],
    currentIndex: currentServiceIndex,
    totalServices: ROTATING_SERVICES.length,
  };
};
