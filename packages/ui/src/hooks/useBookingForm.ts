import { useState, useCallback } from "react";
import { BookingFormData, BookingStep } from "../types/wedding.types";

export const useBookingForm = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    bookingType: null,
    businessType: null,
    personalType: null,
    fullName: "",
    email: "",
    phone: "",
  });

  const openBookingForm = useCallback(() => {
    setShowBookingForm(true);
    setBookingStep(1);
  }, []);

  const closeBookingForm = useCallback(() => {
    setShowBookingForm(false);
    setBookingStep(1);
    setFormData({
      bookingType: null,
      businessType: null,
      personalType: null,
      fullName: "",
      email: "",
      phone: "",
    });
  }, []);

  const updateFormData = useCallback((updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    if (bookingStep === 1) {
      if (formData.bookingType === "business") {
        setBookingStep(2.5);
      } else if (formData.bookingType === "personal") {
        setBookingStep(2.7);
      }
    } else if (bookingStep === 2.5 || bookingStep === 2.7) {
      setBookingStep(3);
    }
  }, [bookingStep, formData.bookingType]);

  const prevStep = useCallback(() => {
    if (bookingStep === 2.5 || bookingStep === 2.7) {
      setBookingStep(1);
    } else if (bookingStep === 3) {
      if (formData.bookingType === "business") {
        setBookingStep(2.5);
      } else {
        setBookingStep(2.7);
      }
    }
  }, [bookingStep, formData.bookingType]);

  const canProceed = useCallback(() => {
    switch (bookingStep) {
      case 1:
        return formData.bookingType !== null;
      case 2.5:
        return formData.businessType !== null;
      case 2.7:
        return formData.personalType !== null;
      case 3:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      default:
        return false;
    }
  }, [bookingStep, formData]);

  return {
    showBookingForm,
    bookingStep,
    formData,
    openBookingForm,
    closeBookingForm,
    updateFormData,
    nextStep,
    prevStep,
    canProceed,
  };
};
