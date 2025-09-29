"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Mail, MapPin, Clock, Users } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../../lib/api';

interface PackageDetails {
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  type: 'photography' | 'catering' | 'equipment' | 'custom';
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageDetails: PackageDetails | null;
}

// Validation schema
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  eventLocation: z.string().min(2, "Event location must be at least 2 characters"),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
  eventType: z.string().min(1, "Event type is required"),
  specialRequirements: z.string().optional(),
  packageType: z.string().min(1, "Package type is required"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingModal({ isOpen, onClose, packageDetails }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      guestCount: 1,
      eventType: '',
      specialRequirements: '',
      packageType: packageDetails?.type || 'photography'
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Graduation',
    'Festival/Celebration',
    'Portrait Session',
    'Other'
  ];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Prepare the data for API submission
      const bookingData = {
        ...data,
        packageName: packageDetails?.name || '',
        packagePrice: packageDetails?.price || '',
      };

      // Make API call to submit booking
      const response = await fetch(API_ENDPOINTS.BOOKINGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to submit booking`);
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success('Booking request submitted successfully! We will contact you within 24 hours.');
        onClose();
        
        // Reset form
        reset();
        setCurrentStep(1);
      } else {
        throw new Error(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to submit booking request: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return watchedValues.fullName && watchedValues.email && watchedValues.phone;
      case 2:
        return watchedValues.eventDate && watchedValues.eventTime && watchedValues.eventLocation;
      case 3:
        return watchedValues.eventType && watchedValues.guestCount;
      default:
        return false;
    }
  };

  if (!isOpen || !packageDetails) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-black">Book Package</h2>
                <p className="text-black mt-1">{packageDetails.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-6 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-black mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your full name"
                          />
                        )}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email"
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your phone number"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-black mb-4">Event Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Controller
                        name="eventDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.eventDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        )}
                      />
                      {errors.eventDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.eventDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Event Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Controller
                        name="eventTime"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="time"
                            className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.eventTime ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        )}
                      />
                      {errors.eventTime && (
                        <p className="text-red-500 text-xs mt-1">{errors.eventTime.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Event Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute text-black left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Controller
                      name="eventLocation"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.eventLocation ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter event location"
                        />
                      )}
                    />
                    {errors.eventLocation && (
                      <p className="text-red-500 text-xs mt-1">{errors.eventLocation.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Event Requirements */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-black mb-4">Event Requirements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Event Type *
                    </label>
                    <Controller
                      name="eventType"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.eventType ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select event type</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.eventType && (
                      <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Guest Count *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Controller
                        name="guestCount"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.guestCount ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Number of guests"
                            min="1"
                          />
                        )}
                      />
                      {errors.guestCount && (
                        <p className="text-red-500 text-xs mt-1">{errors.guestCount.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Special Requirements
                  </label>
                  <Controller
                    name="specialRequirements"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.specialRequirements ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Any special requirements, dietary restrictions, or additional notes..."
                      />
                    )}
                  />
                  {errors.specialRequirements && (
                    <p className="text-red-500 text-xs mt-1">{errors.specialRequirements.message}</p>
                  )}
                </div>

                {/* Package Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-black mb-2">Package Summary</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-black">{packageDetails.name}</span>
                    <span className="font-bold text-orange-500">{packageDetails.price}</span>
                  </div>
                  {packageDetails.originalPrice && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-black line-through">{packageDetails.originalPrice}</span>
                      <span className="text-sm text-green-600 font-medium">{packageDetails.discount}</span>
                    </div> 
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-black cursor-not-allowed'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isStepValid(currentStep)
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-black cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting || !isValid
                      ? 'bg-gray-100 text-black cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
