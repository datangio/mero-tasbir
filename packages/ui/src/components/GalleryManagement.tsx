"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Image,
  Camera,
  X,
  Save,
  Eye,
  Grid3X3,
  Images,
  Calendar,
  User,
  FolderPlus,
  Search,
  Filter,
  SortAsc,
  Download,
  Share2,
} from "lucide-react";

interface GalleryImage {
  id?: string;
  url: string;
  alt?: string;
  caption?: string;
  order: number;
}

interface Gallery {
  id?: string;
  title: string;
  description: string;
  images: GalleryImage[];
  category: string;
  isActive: boolean;
  isPublic: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  isActive: boolean;
  isPublic: boolean;
  coverImage: string;
}

interface GalleryManagementProps {
  galleries?: Gallery[];
  onSave?: (gallery: GalleryFormData & { images: GalleryImage[] }) => void;
  onUpdate?: (id: string, gallery: GalleryFormData & { images: GalleryImage[] }) => void;
  onDelete?: (id: string) => void;
}

export const GalleryManagement: React.FC<GalleryManagementProps> = ({
  galleries = [],
  onSave,
  onUpdate,
  onDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "",
    isActive: true,
    isPublic: true,
    coverImage: "",
  });
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "createdAt" | "images">("createdAt");

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
    "Nature",
    "Architecture",
    "Travel",
    "Street",
    "Other"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Gallery title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Gallery description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (galleryImages.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const galleryData = {
      ...formData,
      images: galleryImages,
    };

    if (editingGallery?.id) {
      onUpdate?.(editingGallery.id, galleryData);
    } else {
      onSave?.(galleryData);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowModal(false);
    setEditingGallery(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      isActive: true,
      isPublic: true,
      coverImage: "",
    });
    setGalleryImages([]);
    setErrors({});
  };

  const handleEdit = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      description: gallery.description,
      category: gallery.category,
      isActive: gallery.isActive,
      isPublic: gallery.isPublic,
      coverImage: gallery.coverImage || "",
    });
    setGalleryImages(gallery.images || []);
    setShowModal(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: GalleryImage = {
          url: e.target?.result as string,
          alt: file.name,
          caption: "",
          order: galleryImages.length + index,
        };
        setGalleryImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateImageCaption = (index: number, caption: string) => {
    setGalleryImages(prev => prev.map((img, i) => 
      i === index ? { ...img, caption } : img
    ));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    setGalleryImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages.map((img, index) => ({ ...img, order: index }));
    });
  };

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || gallery.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGalleries = [...filteredGalleries].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "images":
        return (b.images?.length || 0) - (a.images?.length || 0);
      case "createdAt":
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  const GalleryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Gallery Title */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <FolderPlus className="h-4 w-4" />
          <span>Gallery Title</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., John & Jane's Wedding"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.title.length}/100 characters
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe this gallery..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/300 characters
        </p>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Images className="h-4 w-4" />
          <span>Gallery Images</span>
        </label>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="gallery-images-upload"
          />
          <label htmlFor="gallery-images-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload images or drag and drop multiple files
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB each
            </p>
          </label>
        </div>

        {/* Image Grid */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>

                {/* Move Buttons */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1 bg-black bg-opacity-50 text-white rounded"
                    >
                      ↑
                    </button>
                  )}
                  {index < galleryImages.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1 bg-black bg-opacity-50 text-white rounded"
                    >
                      ↓
                    </button>
                  )}
                </div>

                {/* Caption Input */}
                <input
                  type="text"
                  value={image.caption || ""}
                  onChange={(e) => updateImageCaption(index, e.target.value)}
                  placeholder="Image caption..."
                  className="w-full mt-2 px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}

        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {galleryImages.length} images selected
        </p>
      </div>

      {/* Gallery Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">Active Gallery</span>
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

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">Public Gallery</span>
          </label>
          <div className="flex items-center space-x-1">
            <Share2 className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-500">
              {formData.isPublic ? "Public" : "Private"}
            </span>
          </div>
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
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{editingGallery ? "Update Gallery" : "Create Gallery"}</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-sm text-gray-500 mt-1">Organize and manage your photography galleries</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4" />
          <span>Create Gallery</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search galleries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "createdAt" | "images")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="createdAt">Newest First</option>
              <option value="title">Title A-Z</option>
              <option value="images">Most Images</option>
            </select>
          </div>
        </div>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedGalleries.map((gallery) => (
          <motion.div
            key={gallery.id || gallery.title}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
            whileHover={{ y: -4 }}
          >
            {/* Cover Image */}
            <div className="relative aspect-video overflow-hidden">
              {gallery.coverImage ? (
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : gallery.images && gallery.images.length > 0 ? (
                <img
                  src={gallery.images[0].url}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button
                    onClick={() => handleEdit(gallery)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => gallery.id && onDelete?.(gallery.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  gallery.isActive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {gallery.isActive ? "Active" : "Inactive"}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  gallery.isPublic 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-orange-100 text-orange-800"
                }`}>
                  {gallery.isPublic ? "Public" : "Private"}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-medium">
                  {gallery.category}
                </span>
              </div>

              {/* Image Count */}
              <div className="absolute bottom-3 right-3">
                <span className="flex items-center space-x-1 px-2 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-medium">
                  <Images className="h-3 w-3" />
                  <span>{gallery.images?.length || 0}</span>
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                {gallery.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {gallery.description}
              </p>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Download className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Share2 className="h-4 w-4 text-gray-400 hover:text-green-500" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  {gallery.createdAt ? new Date(gallery.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {galleries.length === 0 && (
        <div className="text-center py-16">
          <Grid3X3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Galleries Found</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Create your first gallery to organize and showcase your photography work
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Your First Gallery
          </motion.button>
        </div>
      )}

      {/* No Results State */}
      {galleries.length > 0 && sortedGalleries.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Galleries Match Your Search</h3>
          <p className="text-gray-500 mb-8">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingGallery ? "Edit Gallery" : "Create New Gallery"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {editingGallery ? "Update gallery details and images" : "Create a new photography gallery"}
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
                <GalleryForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

