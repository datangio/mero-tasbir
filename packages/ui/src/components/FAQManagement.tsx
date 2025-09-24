"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Save, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FAQManagementProps {
  className?: string;
}

export const FAQManagement: React.FC<FAQManagementProps> = ({ className = "" }) => {
  // State management
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // UI states
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'order' | 'question' | 'createdAt'>('order');

  // Categories
  const categories = ['General', 'Pricing', 'Booking', 'Services', 'Technical', 'Payment'];

  // Load FAQs on component mount
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/photography/faq');
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      setFaqs(data.faqs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load FAQs');
      // Mock data for development
      setFaqs([
        {
          id: '1',
          question: 'What types of photography services do you offer?',
          answer: 'We offer wedding photography, portrait photography, event photography, commercial photography, and product photography services.',
          category: 'Services',
          order: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          question: 'How much do your photography packages cost?',
          answer: 'Our photography packages range from $200 for basic portraits to $2000+ for full wedding packages. Contact us for a detailed quote based on your specific needs.',
          category: 'Pricing',
          order: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 2-3 months in advance for weddings and major events, and 1-2 weeks for portrait sessions.',
          category: 'Booking',
          order: 3,
          isActive: true,
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
    
    if (!formData.question.trim()) {
      errors.question = 'Question is required';
    } else if (formData.question.length < 10) {
      errors.question = 'Question must be at least 10 characters';
    }
    
    if (!formData.answer.trim()) {
      errors.answer = 'Answer is required';
    } else if (formData.answer.length < 20) {
      errors.answer = 'Answer must be at least 20 characters';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (formData.order < 0) {
      errors.order = 'Order must be a positive number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const url = editingFaq ? `/api/photography/faq/${editingFaq.id}` : '/api/photography/faq';
      const method = editingFaq ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error(`Failed to ${editingFaq ? 'update' : 'create'} FAQ`);
      
      await loadFAQs();
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save FAQ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isActive: faq.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/photography/faq/${faqId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete FAQ');
      
      await loadFAQs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete FAQ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (faqId: string, isActive: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/photography/faq/${faqId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      
      if (!response.ok) throw new Error('Failed to update FAQ status');
      
      await loadFAQs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update FAQ status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order: 0,
      isActive: true
    });
    setFormErrors({});
  };

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFaqs(newExpanded);
  };

  // Filter and sort FAQs
  const filteredFaqs = faqs
    .filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'question':
          return a.question.localeCompare(b.question);
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
          <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>
          <p className="text-gray-600 mt-1">Manage frequently asked questions for your photography services</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
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
              Search FAQs
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions or answers..."
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
              onChange={(e) => setSortBy(e.target.value as 'order' | 'question' | 'createdAt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="order">Display Order</option>
              <option value="question">Question A-Z</option>
              <option value="createdAt">Date Created</option>
            </select>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredFaqs.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="flex items-center gap-2 text-left flex-1"
                      >
                        <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                          {faq.question}
                        </h3>
                        {expandedFaqs.has(faq.id) ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFaqs.has(faq.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 mb-4">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {faq.category}
                      </span>
                      <span>Order: {faq.order}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                        faq.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {faq.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(faq.id, faq.isActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={faq.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first FAQ.'
              }
            </p>
            {!searchTerm && selectedCategory === 'All' && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First FAQ
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
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question *
                    </label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        formErrors.question ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter the frequently asked question..."
                    />
                    {formErrors.question && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.question}</p>
                    )}
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer *
                    </label>
                    <textarea
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        formErrors.answer ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter a detailed answer to the question..."
                    />
                    {formErrors.answer && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.answer}</p>
                    )}
                  </div>

                  {/* Category and Order */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.category ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {formErrors.category && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.category}</p>
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
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          formErrors.order ? 'border-red-300' : 'border-gray-300'
                        }`}
                        min="0"
                      />
                      {formErrors.order && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.order}</p>
                      )}
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active (visible to visitors)
                    </label>
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
                      <span>{editingFaq ? 'Update FAQ' : 'Create FAQ'}</span>
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

export default FAQManagement;
