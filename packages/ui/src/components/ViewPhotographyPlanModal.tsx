"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Clock, Users, Camera, Video, Package, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

interface ViewPhotographyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}

const ANIMATION_VARIANTS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  modal: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  }
};

export const ViewPhotographyPlanModal: React.FC<ViewPhotographyPlanModalProps> = ({
  isOpen,
  onClose,
  plan
}) => {
  if (!plan) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          variants={ANIMATION_VARIANTS.overlay}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl"
              variants={ANIMATION_VARIANTS.modal}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Plan Details</h2>
                <button
                  onClick={onClose}
                  className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Plan Title and Status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(plan.status || 'ACTIVE')}`}>
                    {(plan.status || 'ACTIVE').replace('_', ' ')}
                  </span>
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Price</p>
                        <p className="text-2xl font-bold text-blue-600">${plan.basePrice || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-6 w-6 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Duration</p>
                        <p className="text-2xl font-bold text-green-600">{plan.duration || 0} hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Package Type</p>
                      <p className="text-sm text-gray-600">{plan.packageType?.name || 'Photography'}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Customizable</p>
                      <p className="text-sm text-gray-600">{plan.isCustomizable ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">What's Included</h4>
                  {plan.includes && plan.includes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.includes.map((item: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-green-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No items included</p>
                  )}
                </div>

                {/* Add-ons */}
                {plan.addOns && plan.addOns.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Add-ons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.addOns.map((addon: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-yellow-800">{addon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {plan.description && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{plan.description}</p>
                  </div>
                )}

                {/* Package Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Max Photos</h4>
                    <p className="text-sm text-gray-600">{plan.maxPhotos || 'Unlimited'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Max Videos</h4>
                    <p className="text-sm text-gray-600">{plan.maxVideos || 'Unlimited'}</p>
                  </div>
                </div>

                {/* Created/Updated Dates */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Created</h4>
                    <p className="text-sm text-gray-600">
                      {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Last Updated</h4>
                    <p className="text-sm text-gray-600">
                      {plan.updatedAt ? new Date(plan.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};




