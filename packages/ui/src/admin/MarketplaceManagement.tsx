
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, Search, Filter, X, MapPin, User, Heart } from 'lucide-react';
import { Button } from '../button';
import { Card } from '../card';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  images: string[];
  tags?: string[];
  specifications?: Record<string, string>;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  quantity: number;
  seller: {
    id: string;
    name: string;
    email: string;
    rating?: number;
    reviewCount?: number;
  };
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface MarketplaceFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  images: string[];
  tags: string[];
  specifications: Record<string, string>;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  quantity: number;
  seller: {
    id: string;
    name: string;
    email: string;
    rating: number;
    reviewCount: number;
  };
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const MarketplaceManagement: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MarketplaceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');

  const [formData, setFormData] = useState<MarketplaceFormData>({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: 'NPR',
    images: [],
    tags: [],
    specifications: {},
    condition: 'new',
    availability: 'in_stock',
    quantity: 1,
    seller: {
      id: '',
      name: '',
      email: '',
      rating: 0,
      reviewCount: 0,
    },
    location: {
      city: '',
      country: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
  });

  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const categories = [
    'Photography Equipment',
    'Video Equipment',
    'Lighting',
    'Audio Equipment',
    'Accessories',
    'Software',
    'Books & Courses',
    'Other'
  ];

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'like_new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const availabilityOptions = [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'limited', label: 'Limited' }
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/marketplace');
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `/api/v1/marketplace/${editingItem.id}`
        : '/api/v1/marketplace';
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchItems();
        resetForm();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving marketplace item:', error);
    }
  };

  const handleEdit = (item: MarketplaceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      subcategory: item.subcategory || '',
      price: item.price,
      originalPrice: item.originalPrice || 0,
      discount: item.discount || 0,
      currency: item.currency,
      images: item.images,
      tags: item.tags || [],
      specifications: item.specifications || {},
      condition: item.condition,
      availability: item.availability,
      quantity: item.quantity,
      seller: item.seller,
      location: item.location || {
        city: '',
        country: '',
        coordinates: { lat: 0, lng: 0 },
      },
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/v1/marketplace/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchItems();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/marketplace/${id}/toggle-status`, {
        method: 'PATCH',
      });
      if (response.ok) {
        await fetchItems();
      }
    } catch (error) {
      console.error('Error toggling item status:', error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/marketplace/${id}/toggle-featured`, {
        method: 'PATCH',
      });
      if (response.ok) {
        await fetchItems();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      subcategory: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      currency: 'NPR',
      images: [],
      tags: [],
      specifications: {},
      condition: 'new',
      availability: 'in_stock',
      quantity: 1,
      seller: {
        id: '',
        name: '',
        email: '',
        rating: 0,
        reviewCount: 0,
      },
      location: {
        city: '',
        country: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
    });
    setEditingItem(null);
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs,
      };
    });
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && item.isActive) ||
                         (filterStatus === 'inactive' && !item.isActive);
    const matchesFeatured = filterFeatured === 'all' ||
                           (filterFeatured === 'featured' && item.isFeatured) ||
                           (filterFeatured === 'not_featured' && !item.isFeatured);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black">Marketplace Management</h2>
          <p className="text-gray-600">Manage marketplace items and listings</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Items</option>
            <option value="featured">Featured</option>
            <option value="not_featured">Not Featured</option>
          </select>
        </div>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.images.length > 0 && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-black line-clamp-1">{item.title}</h3>
                <div className="flex space-x-1">
                  {item.isFeatured && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.seller.name}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location?.city}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-orange-500">
                    {formatPrice(item.price, item.currency)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(item.originalPrice, item.currency)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {item.views}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {item.likes}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(item.id)}
                  >
                    {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleFeatured(item.id)}
                  >
                    {item.isFeatured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-xs text-gray-500 capitalize">{item.condition}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Item Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-black">
                    {editingItem ? 'Edit Marketplace Item' : 'Add New Marketplace Item'}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Price</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Original Price</label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Currency</label>
                      <select
                        value={formData.currency}
                        onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="NPR">NPR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Condition</label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {conditions.map(condition => (
                          <option key={condition.value} value={condition.value}>{condition.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Availability</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {availabilityOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Quantity</label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Seller Information */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-black mb-4">Seller Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Seller Name</label>
                        <input
                          type="text"
                          value={formData.seller.name}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            seller: { ...prev.seller, name: e.target.value } 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Seller Email</label>
                        <input
                          type="email"
                          value={formData.seller.email}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            seller: { ...prev.seller, email: e.target.value } 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-black mb-4">Location Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">City</label>
                        <input
                          type="text"
                          value={formData.location.city}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            location: { ...prev.location, city: e.target.value } 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Country</label>
                        <input
                          type="text"
                          value={formData.location.country}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            location: { ...prev.location, country: e.target.value } 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Images</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Image URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <Button type="button" onClick={addImage} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {editingItem ? 'Update Item' : 'Create Item'}
                    </Button>
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

export default MarketplaceManagement;

