import { useState, useEffect } from "react";
import { CAROUSEL_IMAGES } from "../constants/wedding.constants";

export const useCarousel = (intervalMs: number = 4000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % CAROUSEL_IMAGES.length
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  const goToNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % CAROUSEL_IMAGES.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    currentImageIndex,
    currentImage: CAROUSEL_IMAGES[currentImageIndex],
    totalImages: CAROUSEL_IMAGES.length,
    goToNext,
    goToPrevious,
    goToSlide,
  };
};
