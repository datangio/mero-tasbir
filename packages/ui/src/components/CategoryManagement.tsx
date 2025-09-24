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
  Palette,
  Eye,
  EyeOff,
} from "lucide-react";

interface Category {
  id?: string;
  name: string;
  description: string;
  image?: string;
  color: string;
  isActive: boolean;
  itemCount?: number;
}

interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  color: string;
  isActive: boolean;
}

interface CategoryManagementProps {
  categories?: Category[];
  onSave?: (category: CategoryFormData) => void;
  onUpdate?: (id: string, category: CategoryFormData) => void;
  onDelete?: (id: string) => void;
}

export const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories = [],
  onSave,
  onUpdate,
  onDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    image: "",
    color: "#3B82F6",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const colorOptions = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingCategory?.id) {
      onUpdate?.(editingCategory.id, formData);
    } else {
      onSave?.(formData);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      color: "#3B82F6",
      isActive: true,
    });
    setErrors({});
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image || "",
      color: category.color,
      isActive: category.isActive,
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
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const CategoryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Name */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Camera className="h-4 w-4" />
          <span>Category Name</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Wedding Photography"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.name.length}/50 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe this category..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/200 characters
        </p>
      </div>

      {/* Color Selection */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <Palette className="h-4 w-4" />
          <span>Category Color</span>
        </label>
        <div className="grid grid-cols-4 gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
              className={`relative w-full h-12 rounded-lg border-2 transition-all ${
                formData.color === color.value
                  ? "border-gray-900 scale-105"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
            >
              {formData.color === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Save className="w-3 h-3 text-gray-900" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Choose a color that represents this category
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Image className="h-4 w-4" />
          <span>Category Image</span>
        </label>
        
        {formData.image ? (
          <div className="relative">
            <img
              src={formData.image}
              alt="Category preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="category-image-upload"
            />
            <label htmlFor="category-image-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload an image or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </label>
          </div>
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
          <span className="text-sm font-medium text-gray-700">Active Category</span>
        </label>
        <div className="flex items-center space-x-1">
          {formData.isActive ? (
            <Eye className="h-4 w-4 text-green-500" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-400" />
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
          <span>{editingCategory ? "Update Category" : "Create Category"}</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photography Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your photography categories</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </motion.button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id || category.name}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => category.id && onDelete?.(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {category.image && (
                <div className="mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {category.itemCount || 0} items
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  category.isActive 
                    ? "bg-green-100 text-green-600" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
          <p className="text-gray-500 mb-6">Create your first photography category to organize your work</p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create First Category
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
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingCategory ? "Update category details" : "Create a new photography category"}
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
              <CategoryForm />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

