import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { BookingStep, BookingFormData } from "../../types/wedding.types";
import {
  BUSINESS_SHOOT_TYPES,
  PERSONAL_SHOOT_TYPES,
} from "../../constants/wedding.constants";
import { BOOKING_ANIMATIONS } from "../../constants/animations.constants";

interface BookingFormProps {
  isOpen: boolean;
  step: BookingStep;
  formData: BookingFormData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
  canProceed: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  step,
  formData,
  onClose,
  onNext,
  onPrev,
  onUpdateData,
  canProceed,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={BOOKING_ANIMATIONS.modal.initial}
        animate={BOOKING_ANIMATIONS.modal.animate}
        exit={BOOKING_ANIMATIONS.modal.exit}
        transition={BOOKING_ANIMATIONS.modal.transition}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={BOOKING_ANIMATIONS.content.initial}
          animate={BOOKING_ANIMATIONS.content.animate}
          exit={BOOKING_ANIMATIONS.content.exit}
          transition={BOOKING_ANIMATIONS.content.transition}
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Book Your Photography Session
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <BookingStep1
                  key="step1"
                  formData={formData}
                  onUpdateData={onUpdateData}
                />
              )}
              {step === 2.5 && (
                <BusinessShootSelection
                  key="step2.5"
                  formData={formData}
                  onUpdateData={onUpdateData}
                  onPrev={onPrev}
                />
              )}
              {step === 2.7 && (
                <PersonalShootSelection
                  key="step2.7"
                  formData={formData}
                  onUpdateData={onUpdateData}
                  onPrev={onPrev}
                />
              )}
              {step === 3 && (
                <ContactInformation
                  key="step3"
                  formData={formData}
                  onUpdateData={onUpdateData}
                  onPrev={onPrev}
                />
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={step === 1 ? onClose : onPrev}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                {step === 1 ? "Cancel" : "← Back"}
              </button>

              {step !== 3 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  disabled={!canProceed}
                  className={`rounded-xl px-8 py-3 font-semibold transition-all duration-300 ${
                    canProceed
                      ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  Continue
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Step 1: Booking Type Selection
interface BookingStep1Props {
  formData: BookingFormData;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
}

const BookingStep1: React.FC<BookingStep1Props> = ({
  formData,
  onUpdateData,
}) => {
  return (
    <motion.div
      initial={BOOKING_ANIMATIONS.step.initial}
      animate={BOOKING_ANIMATIONS.step.animate}
      exit={BOOKING_ANIMATIONS.step.exit}
      transition={BOOKING_ANIMATIONS.step.transition}
      className="text-center"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900">
        Welcome! Let's get started
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        What type of photography service are you looking for?
      </p>

      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6">
        <motion.button
          whileHover={BOOKING_ANIMATIONS.shootCard.whileHover}
          whileTap={BOOKING_ANIMATIONS.shootCard.whileTap}
          transition={BOOKING_ANIMATIONS.shootCard.transition}
          onClick={() => onUpdateData({ bookingType: "business" })}
          className={`rounded-xl border-2 p-8 transition-all duration-300 ${
            formData.bookingType === "business"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 hover:border-purple-300"
          }`}
        >
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            For Business
          </h3>
          <p className="text-gray-600">
            Professional photography for your business needs
          </p>
        </motion.button>

        <motion.button
          whileHover={BOOKING_ANIMATIONS.shootCard.whileHover}
          whileTap={BOOKING_ANIMATIONS.shootCard.whileTap}
          transition={BOOKING_ANIMATIONS.shootCard.transition}
          onClick={() => onUpdateData({ bookingType: "personal" })}
          className={`rounded-xl border-2 p-8 transition-all duration-300 ${
            formData.bookingType === "personal"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 hover:border-purple-300"
          }`}
        >
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            For Personal
          </h3>
          <p className="text-gray-600">
            Personal photography for special moments
          </p>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Step 2.5: Business Shoot Selection
interface BusinessShootSelectionProps {
  formData: BookingFormData;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
  onPrev: () => void;
}

const BusinessShootSelection: React.FC<BusinessShootSelectionProps> = ({
  formData,
  onUpdateData,
  onPrev,
}) => {
  return (
    <motion.div
      initial={BOOKING_ANIMATIONS.step.initial}
      animate={BOOKING_ANIMATIONS.step.animate}
      exit={BOOKING_ANIMATIONS.step.exit}
      transition={BOOKING_ANIMATIONS.step.transition}
      className="text-center"
    >
      <div className="mb-8 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="mr-4 rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 rotate-180 text-gray-600" />
        </motion.button>
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Business Shoots
          </h2>
          <p className="text-lg text-gray-600">
            Which type of business photography do you need?
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {BUSINESS_SHOOT_TYPES.map(shootType => (
          <motion.button
            key={shootType.id}
            whileHover={BOOKING_ANIMATIONS.shootCard.whileHover}
            whileTap={BOOKING_ANIMATIONS.shootCard.whileTap}
            transition={BOOKING_ANIMATIONS.shootCard.transition}
            onClick={() => onUpdateData({ businessType: shootType.id })}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              formData.businessType === shootType.id
                ? "shadow-lg ring-4 ring-purple-500"
                : "hover:shadow-md"
            }`}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={shootType.image}
                alt={shootType.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {shootType.name}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Step 2.7: Personal Shoot Selection
interface PersonalShootSelectionProps {
  formData: BookingFormData;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
  onPrev: () => void;
}

const PersonalShootSelection: React.FC<PersonalShootSelectionProps> = ({
  formData,
  onUpdateData,
  onPrev,
}) => {
  return (
    <motion.div
      initial={BOOKING_ANIMATIONS.step.initial}
      animate={BOOKING_ANIMATIONS.step.animate}
      exit={BOOKING_ANIMATIONS.step.exit}
      transition={BOOKING_ANIMATIONS.step.transition}
      className="text-center"
    >
      <div className="mb-8 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="mr-4 rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 rotate-180 text-gray-600" />
        </motion.button>
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Personal Shoots
          </h2>
          <p className="text-lg text-gray-600">
            Okay! Which type of personal shoot are you looking for?
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {PERSONAL_SHOOT_TYPES.map(shootType => (
          <motion.button
            key={shootType.id}
            whileHover={BOOKING_ANIMATIONS.shootCard.whileHover}
            whileTap={BOOKING_ANIMATIONS.shootCard.whileTap}
            transition={BOOKING_ANIMATIONS.shootCard.transition}
            onClick={() => onUpdateData({ personalType: shootType.id })}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              formData.personalType === shootType.id
                ? "shadow-lg ring-4 ring-purple-500"
                : "hover:shadow-md"
            }`}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={shootType.image}
                alt={shootType.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {shootType.name}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mx-auto mb-8 flex items-center gap-2 font-medium text-purple-600 transition-colors hover:text-purple-700"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600">
          <span className="text-sm text-white">+</span>
        </span>
        Show more
      </motion.button>
    </motion.div>
  );
};

// Step 3: Contact Information
interface ContactInformationProps {
  formData: BookingFormData;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
  onPrev: () => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  formData,
  onUpdateData,
}) => {
  return (
    <motion.div
      initial={BOOKING_ANIMATIONS.step.initial}
      animate={BOOKING_ANIMATIONS.step.animate}
      exit={BOOKING_ANIMATIONS.step.exit}
      transition={BOOKING_ANIMATIONS.step.transition}
      className="text-center"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900">
        Contact Information
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Please provide your contact details so we can get in touch with you.
      </p>

      <div className="mx-auto max-w-md space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={e => onUpdateData({ fullName: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => onUpdateData({ email: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => onUpdateData({ phone: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </motion.div>
  );
};
