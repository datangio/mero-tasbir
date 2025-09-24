"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Image,
  Camera,
  X,
  Save,
  User,
  Eye,
  Heart,
  Star,
} from "lucide-react";

interface PortfolioItem {
  id?: string;
  clientName: string;
  clientImage: string;
  category?: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
}

interface PortfolioFormData {
  clientName: string;
  clientImage: string;
  category: string;
  description: string;
  isActive: boolean;
}

interface PortfolioManagementProps {
  portfolioItems?: PortfolioItem[];
  onSave?: (item: PortfolioFormData) => void;
  onUpdate?: (id: string, item: PortfolioFormData) => void;
  onDelete?: (id: string) => void;
}

export const PortfolioManagement: React.FC<PortfolioManagementProps> = ({
  portfolioItems = [],
  onSave,
  onUpdate,
  onDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<PortfolioFormData>({
    clientName: "",
    clientImage: "",
    category: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Wedding",
    "Corporate",
    "Portrait",
    "Event",
    "Family",
    "Maternity",
    "Newborn",
    "Fashion",
    "Product",
    "Other"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.clientImage.trim()) {
      newErrors.clientImage = "Client image is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingItem?.id) {
      onUpdate?.(editingItem.id, formData);
    } else {
      onSave?.(formData);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      clientName: "",
      clientImage: "",
      category: "",
      description: "",
      isActive: true,
    });
    setErrors({});
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName,
      clientImage: item.clientImage,
      category: item.category || "",
      description: item.description || "",
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          clientImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const PortfolioForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Client Name */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <User className="h-4 w-4" />
          <span>Client Name</span>
        </label>
        <input
          type="text"
          value={formData.clientName}
          onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.clientName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., John & Jane Smith"
        />
        {errors.clientName && (
          <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.clientName.length}/100 characters
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Camera className="h-4 w-4" />
          <span>Category</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Brief description of this portfolio item..."
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/300 characters
        </p>
      </div>

      {/* Client Image Upload */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Image className="h-4 w-4" />
          <span>Client Image</span>
        </label>
        
        {formData.clientImage ? (
          <div className="relative">
            <img
              src={formData.clientImage}
              alt="Client preview"
              className="w-full h-64 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, clientImage: "" }))}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="portfolio-image-upload"
            />
            <label htmlFor="portfolio-image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload client image or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </label>
          </div>
        )}
        {errors.clientImage && (
          <p className="mt-1 text-sm text-red-600">{errors.clientImage}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Show in Portfolio</span>
        </label>
        <div className="flex items-center space-x-1">
          {formData.isActive ? (
            <Eye className="h-4 w-4 text-green-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
          <span className="text-xs text-gray-500">
            {formData.isActive ? "Visible" : "Hidden"}
          </span>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{editingItem ? "Update Portfolio Item" : "Add to Portfolio"}</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your photography portfolio with client images</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Portfolio Item</span>
        </motion.button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id || item.clientName}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
            whileHover={{ y: -4 }}
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.clientImage}
                alt={item.clientName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => item.id && onDelete?.(item.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.isActive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {item.isActive ? "Live" : "Hidden"}
                </span>
              </div>

              {/* Category Badge */}
              {item.category && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                {item.clientName}
              </h3>
              {item.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {portfolioItems.length === 0 && (
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Items</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start building your portfolio by adding client images and showcasing your photography work
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Portfolio Item
          </motion.button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingItem ? "Update portfolio item details" : "Add a new item to your portfolio"}
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <PortfolioForm />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

