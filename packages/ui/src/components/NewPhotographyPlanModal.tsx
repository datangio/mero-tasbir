"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { X, Calendar, MapPin, Clock, Users, Camera, Video, Package, Save, AlertCircle } from "lucide-react";

interface NewPhotographyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePhotographyPlanData) => void;
  isLoading?: boolean;
}

interface CreatePhotographyPlanData {
  title: string;
  price: number;
  duration: number;
  included: string[];
  notes?: string;
}

const ANIMATION_VARIANTS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  modal: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  }
};

export const NewPhotographyPlanModal: React.FC<NewPhotographyPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreatePhotographyPlanData>({
    title: "",
    price: 0,
    duration: 1,
    included: [],
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newIncluded, setNewIncluded] = useState("");

  const handleInputChange = (field: keyof CreatePhotographyPlanData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const addIncludedItem = (value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        included: [...prev.included, value.trim()]
      }));
      setNewIncluded("");
    }
  };

  const removeIncludedItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Plan title is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Plan price must be greater than 0";
    if (!formData.duration || formData.duration < 1) newErrors.duration = "Duration must be at least 1 hour";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.loading('Creating plan...', { id: 'create-plan' });
      onSubmit(formData);
    } else {
      toast.error('Please fix the validation errors before submitting.');
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      price: 0,
      duration: 1,
      included: [],
      notes: ""
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          variants={ANIMATION_VARIANTS.overlay}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
          
          {/* Modal */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl"
            variants={ANIMATION_VARIANTS.modal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">New Photography Plan</h2>
                <button
                  onClick={handleClose}
                  className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Plan Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Plan Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className={`w-full rounded-md border px-3 py-2 ${
                            errors.title ? "border-red-300" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                          placeholder="Enter plan title"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plan Price ($) *
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                            className={`w-full rounded-md border px-3 py-2 ${
                              errors.price ? "border-red-300" : "border-gray-300"
                            } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                            placeholder="0.00"
                          />
                          {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (hours) *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={formData.duration}
                            onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 1)}
                            className={`w-full rounded-md border px-3 py-2 ${
                              errors.duration ? "border-red-300" : "border-gray-300"
                            } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                            placeholder="1"
                          />
                          {errors.duration && (
                            <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Included Items */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">What's Included</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newIncluded}
                          onChange={(e) => setNewIncluded(e.target.value)}
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="Add included item"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addIncludedItem(newIncluded);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => addIncludedItem(newIncluded)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-1">
                        {formData.included.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <span className="text-sm">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeIncludedItem(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter any additional notes or special instructions"
                    />
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
