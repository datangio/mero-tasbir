"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wedding, CreateWeddingDto } from "../types/admin.types";
import { ANIMATION_VARIANTS } from "../constants/admin.constants";
import { useWeddings } from "../hooks/useWeddings";
import { validateWedding, formatWeddingForApi } from "../utils/validation";
import { StatusBadge } from "../components/StatusBadge";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const WeddingManagement: React.FC = () => {
  const {
    filteredWeddings,
    loading,
    error,
    createWedding,
    deleteWedding,
    refreshWeddings,
  } = useWeddings();

  return (
    <ErrorBoundary>
      <motion.div
        className="space-y-6"
        variants={ANIMATION_VARIANTS.page}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <WeddingActions onRefresh={refreshWeddings} isLoading={loading} />

        {error && <ErrorMessage message={error} onRetry={refreshWeddings} />}

        <WeddingTable
          weddings={filteredWeddings}
          onDelete={deleteWedding}
          isLoading={loading}
        />

        <CreateWeddingForm onSubmit={createWedding} isLoading={loading} />
      </motion.div>
    </ErrorBoundary>
  );
};

interface WeddingActionsProps {
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const WeddingActions: React.FC<WeddingActionsProps> = ({
  onRefresh,
  isLoading,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">Wedding Events</h2>
      <div className="flex space-x-3">
        <motion.button
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 
                    transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "🔄"} Refresh
        </motion.button>
        <motion.button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showCreateForm ? "Cancel" : "Add Wedding"}
        </motion.button>
      </div>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="rounded-lg border border-red-200 bg-red-50 p-4"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-red-500">⚠️</span>
        <span className="font-medium text-red-700">Error</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Retry
        </button>
      )}
    </div>
    <p className="mt-1 text-sm text-red-600">{message}</p>
  </motion.div>
);

interface WeddingTableProps {
  weddings: Wedding[];
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

const WeddingTable: React.FC<WeddingTableProps> = ({
  weddings,
  onDelete,
  isLoading,
}) => {
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string) => {
    setDeletingIds(prev => new Set(prev).add(id));
    try {
      await onDelete(id);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (isLoading && weddings.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-gray-600">Loading weddings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Couple",
                "Date",
                "Venue",
                "Status",
                "Budget",
                "Plan",
                "Actions",
              ].map(header => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {weddings.map((wedding, index) => (
              <motion.tr
                key={wedding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {wedding.couple}
                  </div>
                  {wedding.contactEmail && (
                    <div className="text-sm text-gray-500">
                      {wedding.contactEmail}
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(wedding.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {wedding.venue}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={wedding.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  NPR.{wedding.budget.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {wedding.guests}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <motion.button
                    onClick={() => handleDelete(wedding.id)}
                    disabled={deletingIds.has(wedding.id)}
                    className="text-red-600 transition-colors hover:text-red-900 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {deletingIds.has(wedding.id) ? (
                      <LoadingSpinner size="sm" color="primary" />
                    ) : (
                      "Delete"
                    )}
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {weddings.length === 0 && !isLoading && (
        <div className="py-12 text-center">
          <span className="mb-4 block text-4xl">💒</span>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No weddings found
          </h3>
          <p className="text-gray-500">
            Start by adding your first wedding event.
          </p>
        </div>
      )}
    </div>
  );
};

interface CreateWeddingFormProps {
  onSubmit: (wedding: CreateWeddingDto) => Promise<void>;
  isLoading: boolean;
}

const CreateWeddingForm: React.FC<CreateWeddingFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateWeddingDto>({
    couple: "",
    date: new Date(),
    venue: "",
    status: "planning",
    budget: 0,
    guests: 0,
    contactEmail: "",
    contactPhone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateWedding(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const sanitizedData = formatWeddingForApi(formData);
      await onSubmit(sanitizedData);

      // Reset form
      setFormData({
        couple: "",
        date: new Date(),
        venue: "",
        status: "planning",
        budget: 0,
        guests: 0,
        contactEmail: "",
        contactPhone: "",
      });
      setErrors({});
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create wedding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <motion.button
        onClick={() => setShowForm(true)}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 
                  text-gray-600 transition-colors hover:border-blue-400
                  hover:bg-blue-50 hover:text-blue-600"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="mb-2 block text-2xl">➕</span>
        <span className="font-medium">Add New Wedding</span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        <h3 className="mb-4 text-lg font-medium">Add New Wedding</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Form fields would go here - simplified for brevity */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Couple Names *
            </label>
            <input
              type="text"
              value={formData.couple}
              onChange={e =>
                setFormData({ ...formData, couple: e.target.value })
              }
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.couple ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John & Emily"
            />
            {errors.couple && (
              <p className="mt-1 text-sm text-red-500">{errors.couple}</p>
            )}
          </div>

          {/* Additional form fields would be added here */}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 
                      py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting && <LoadingSpinner size="sm" color="white" />}
            <span>{isSubmitting ? "Creating..." : "Create Wedding"}</span>
          </motion.button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};
