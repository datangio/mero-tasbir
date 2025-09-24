"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Save, Star, Clock, Users, Camera, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackageFeature {
  id: string;
  text: string;
  icon?: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  photographers: number;
  photos: number;
  videos?: number;
  features: PackageFeature[];
  image?: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PackageManagementProps {
  className?: string;
}

export const PackageManagement: React.FC<PackageManagementProps> = ({ className = "" }) => {
  // State management
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    currency: 'Rs.',
    duration: '',
    photographers: 1,
    photos: 0,
    videos: 0,
    features: [] as PackageFeature[],
    image: '',
    isPopular: false,
    isActive: true,
    order: 0,
    category: 'Event'
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newFeature, setNewFeature] = useState('');
  
  // UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'order' | 'name' | 'price' | 'createdAt'>('order');

  // Categories
  const categories = ['Event', 'Wedding', 'Portrait', 'Commercial', 'Corporate'];

  // Load packages on component mount
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/booking/packages');
      if (!response.ok) throw new Error('Failed to fetch packages');
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load packages');
      // Mock data for development
      setPackages([
        {
          id: '1',
          name: 'Basic',
          description: 'Perfect for small events and gatherings',
          price: 15000,
          currency: 'Rs.',
          duration: '4 hours',
          photographers: 1,
          photos: 300,
          features: [
            { id: '1', text: '4 hours of coverage' },
            { id: '2', text: '1 Photographer' },
            { id: '3', text: '300+ edited high-resolution photos' },
            { id: '4', text: 'Digital delivery within 7 days' },
            { id: '5', text: 'Online gallery access' },
            { id: '6', text: 'Travel within city included' }
          ],
          image: '',
          isPopular: false,
          isActive: true,
          order: 1,
          category: 'Event',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Standard',
          description: 'Most popular choice for weddings & parties',
          price: 25000,
          currency: 'Rs.',
          duration: '8 hours',
          photographers: 2,
          photos: 600,
          videos: 5,
          features: [
            { id: '1', text: '8 hours of coverage' },
            { id: '2', text: '2 Photographers' },
            { id: '3', text: '600+ edited high-resolution photos + 5-min highlight video' },
            { id: '4', text: 'Digital delivery within 5 days' },
            { id: '5', text: 'Online gallery with download rights' },
            { id: '6', text: 'Pre-wedding shoot (1 hour)' },
            { id: '7', text: 'Travel within 50 km included' }
          ],
          image: '',
          isPopular: true,
          isActive: true,
          order: 2,
          category: 'Wedding',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          name: 'Premium',
          description: 'Complete experience for large events',
          price: 40000,
          currency: 'Rs.',
          duration: '12+ hours',
          photographers: 3,
          photos: 1000,
          videos: 3,
          features: [
            { id: '1', text: '12+ hours of coverage (full day)' },
            { id: '2', text: '3 Photographers + 1 Videographer' },
            { id: '3', text: '1000+ edited photos + 3-minute cinematic video' },
            { id: '4', text: 'Same-day teaser video' },
            { id: '5', text: 'Photo book (20 pages)' },
            { id: '6', text: 'Drone shots (weather permitting)' },
            { id: '7', text: 'Priority editing (within 3 days)' },
            { id: '8', text: 'Travel anywhere in Nepal included' }
          ],
          image: '',
          isPopular: false,
          isActive: true,
          order: 3,
          category: 'Event',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Package name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (formData.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (!formData.duration.trim()) {
      errors.duration = 'Duration is required';
    }
    
    if (formData.photographers <= 0) {
      errors.photographers = 'Number of photographers must be at least 1';
    }
    
    if (formData.photos <= 0) {
      errors.photos = 'Number of photos must be greater than 0';
    }
    
    if (formData.features.length === 0) {
      errors.features = 'At least one feature is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const url = editingPackage ? `/api/booking/packages/${editingPackage.id}` : '/api/booking/packages';
      const method = editingPackage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error(`Failed to ${editingPackage ? 'update' : 'create'} package`);
      
      await loadPackages();
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save package');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      currency: pkg.currency,
      duration: pkg.duration,
      photographers: pkg.photographers,
      photos: pkg.photos,
      videos: pkg.videos || 0,
      features: pkg.features,
      image: pkg.image || '',
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
      order: pkg.order,
      category: pkg.category
    });
    setShowModal(true);
  };

  const handleDelete = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/booking/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete package');
      
      await loadPackages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete package');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (packageId: string, isActive: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/booking/packages/${packageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      
      if (!response.ok) throw new Error('Failed to update package status');
      
      await loadPackages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update package status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPackage(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      currency: 'Rs.',
      duration: '',
      photographers: 1,
      photos: 0,
      videos: 0,
      features: [],
      image: '',
      isPopular: false,
      isActive: true,
      order: 0,
      category: 'Event'
    });
    setFormErrors({});
    setNewFeature('');
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      const feature: PackageFeature = {
        id: Date.now().toString(),
        text: newFeature.trim()
      };
      setFormData({
        ...formData,
        features: [...formData.features, feature]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (featureId: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f.id !== featureId)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to your server
      // For now, we'll create a local URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter and sort packages
  const filteredPackages = packages
    .filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'order':
        default:
          return a.order - b.order;
      }
    });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Package Management</h2>
          <p className="text-gray-600 mt-1">Manage photography packages and pricing for your booking services</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Packages
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search packages..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'order' | 'name' | 'price' | 'createdAt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="order">Display Order</option>
              <option value="name">Name A-Z</option>
              <option value="price">Price Low to High</option>
              <option value="createdAt">Date Created</option>
            </select>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                pkg.isPopular ? 'border-orange-200 ring-2 ring-orange-100' : 'border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Package Image */}
                {pkg.image && (
                  <div className="mb-4">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Package Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{pkg.photographers} Photographer{pkg.photographers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      <span>{pkg.photos}+ Photos</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-orange-600 mb-4">
                    {pkg.currency} {pkg.price.toLocaleString()}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {pkg.features.slice(0, 4).map((feature) => (
                    <div key={feature.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                  {pkg.features.length > 4 && (
                    <div className="text-sm text-gray-500">
                      +{pkg.features.length - 4} more features
                    </div>
                  )}
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {pkg.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(pkg.id, pkg.isActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        pkg.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={pkg.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {pkg.isActive ? '✓' : '✗'}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Package"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first photography package.'
              }
            </p>
            {!searchTerm && selectedCategory === 'All' && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Package
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingPackage ? 'Edit Package' : 'Add New Package'}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Package Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Image
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="package-image"
                      />
                      <label
                        htmlFor="package-image"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </label>
                      {formData.image && (
                        <div className="relative">
                          <img
                            src={formData.image}
                            alt="Package preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Basic, Standard, Premium"
                      />
                      {formErrors.name && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        formErrors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Brief description of the package..."
                    />
                    {formErrors.description && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Rs.">Rs.</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                        <option value="£">£</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.price ? 'border-red-300' : 'border-gray-300'
                        }`}
                        min="0"
                        step="100"
                      />
                      {formErrors.price && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.duration ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 4 hours, 8 hours, Full day"
                      />
                      {formErrors.duration && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.duration}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photographers *
                      </label>
                      <input
                        type="number"
                        value={formData.photographers}
                        onChange={(e) => setFormData({ ...formData, photographers: parseInt(e.target.value) || 1 })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.photographers ? 'border-red-300' : 'border-gray-300'
                        }`}
                        min="1"
                      />
                      {formErrors.photographers && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.photographers}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photos *
                      </label>
                      <input
                        type="number"
                        value={formData.photos}
                        onChange={(e) => setFormData({ ...formData, photos: parseInt(e.target.value) || 0 })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.photos ? 'border-red-300' : 'border-gray-300'
                        }`}
                        min="0"
                      />
                      {formErrors.photos && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.photos}</p>
                      )}
                    </div>
                  </div>

                  {/* Videos (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Videos (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.videos}
                      onChange={(e) => setFormData({ ...formData, videos: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      placeholder="Number of video minutes included"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Features *
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Add a feature (e.g., 4 hours of coverage)"
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {formData.features.map((feature) => (
                          <div key={feature.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="flex-1 text-sm">{feature.text}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(feature.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {formErrors.features && (
                        <p className="text-red-600 text-sm">{formErrors.features}</p>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPopular"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPopular" className="ml-2 text-sm text-gray-700">
                        Mark as "Most Popular"
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                        Active (visible to customers)
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{editingPackage ? 'Update Package' : 'Create Package'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageManagement;
