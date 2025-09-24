"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Palette
} from "lucide-react";

interface HeroSectionData {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  rotatingTexts?: string[];
  isActive?: boolean;
}

interface HeroSectionFormProps {
  initialData?: HeroSectionData;
  onSave: (data: HeroSectionData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

export const HeroSectionForm: React.FC<HeroSectionFormProps> = ({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
  mode = "create"
}) => {
  const [formData, setFormData] = useState<HeroSectionData>({
    title: "",
    subtitle: "",
    description: "",
    backgroundImage: "",
    ctaText: "Get Started",
    rotatingTexts: ["Wedding", "Event", "Anniversary", "Pasni"],
    ...initialData
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    } else if (formData.subtitle.length > 300) {
      newErrors.subtitle = "Subtitle must be less than 300 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (formData.ctaText && formData.ctaText.length > 50) {
      newErrors.ctaText = "CTA text must be less than 50 characters";
    }

    if (formData.backgroundImage && !isValidUrl(formData.backgroundImage)) {
      newErrors.backgroundImage = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: keyof HeroSectionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const addRotatingText = () => {
    setFormData(prev => ({
      ...prev,
      rotatingTexts: [...(prev.rotatingTexts || []), ""]
    }));
  };

  const updateRotatingText = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      rotatingTexts: (prev.rotatingTexts || []).map((text, i) => i === index ? value : text)
    }));
  };

  const removeRotatingText = (index: number) => {
    if ((formData.rotatingTexts || []).length > 1) {
      setFormData(prev => ({
        ...prev,
        rotatingTexts: (prev.rotatingTexts || []).filter((_, i) => i !== index)
      }));
    }
  };

  const PreviewComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <button
            onClick={() => setPreviewMode(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Preview Hero Section */}
          <div className="relative min-h-[400px] bg-gradient-to-br from-gray-50 to-white">
            {formData.backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ backgroundImage: `url(${formData.backgroundImage})` }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center min-h-[400px] p-8">
              <div className="text-center max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  {formData.title}
                </h1>
                <h2 className="text-2xl md:text-4xl font-medium text-gray-800 mb-6">
                  {formData.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  {formData.description}
                </p>
                {formData.ctaText && (
                  <button className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                    {formData.ctaText}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Rotating Text Preview */}
          {formData.rotatingTexts && formData.rotatingTexts.length > 0 && (
            <div className="p-8 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Rotating Text Preview:</h3>
              <div className="flex flex-wrap gap-2">
                {formData.rotatingTexts.map((text, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {text || `Text ${index + 1}`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "Create Hero Section" : "Edit Hero Section"}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Type className="h-4 w-4" />
              <span>Title</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter hero section title..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Subtitle */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <AlignLeft className="h-4 w-4" />
              <span>Subtitle</span>
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.subtitle ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter hero section subtitle..."
            />
            {errors.subtitle && (
              <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.subtitle.length}/300 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <AlignLeft className="h-4 w-4" />
              <span>Description</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter hero section description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Background Image */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="h-4 w-4" />
              <span>Background Image URL</span>
            </label>
            <input
              type="url"
              value={formData.backgroundImage || ""}
              onChange={(e) => handleInputChange("backgroundImage", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.backgroundImage ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.backgroundImage && (
              <p className="mt-1 text-sm text-red-600">{errors.backgroundImage}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Enter a valid image URL for the background
            </p>
          </div>

          {/* CTA Text - Optional */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Palette className="h-4 w-4" />
              <span>Call-to-Action Text (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.ctaText || ""}
              onChange={(e) => handleInputChange("ctaText", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.ctaText ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Get Started (optional)"
            />
            {errors.ctaText && (
              <p className="mt-1 text-sm text-red-600">{errors.ctaText}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {(formData.ctaText || "").length}/50 characters - Optional field
            </p>
          </div>

          {/* Rotating Texts - Optional */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Type className="h-4 w-4" />
                <span>Rotating Texts (Optional)</span>
              </label>
              <button
                type="button"
                onClick={addRotatingText}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Text</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {(formData.rotatingTexts || []).map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center space-x-3"
                >
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => updateRotatingText(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Rotating text ${index + 1}`}
                  />
                  {(formData.rotatingTexts || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRotatingText(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            
            {errors.rotatingTexts && (
              <p className="mt-1 text-sm text-red-600">{errors.rotatingTexts}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              These texts will rotate in the hero section every few seconds - Optional field
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{mode === "create" ? "Create" : "Save Changes"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewMode && <PreviewComponent />}
      </AnimatePresence>
    </>
  );
};
