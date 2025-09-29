"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Camera, FileText, DollarSign, Tag, Plus, Minus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PhotoMetadata {
  id: string;
  file: File;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { data: session } = useSession();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photoMetadata, setPhotoMetadata] = useState<PhotoMetadata[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<'upload' | 'metadata'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Portrait',
    'Wedding',
    'Event',
    'Nature',
    'Architecture',
    'Street',
    'Fashion',
    'Sports',
    'Food',
    'Travel',
    'Other'
  ];

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Handle file selection
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast.error('Please select only image files');
    }
    
    if (imageFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...imageFiles]);
      
      // Create metadata for new files
      const newMetadata = imageFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        title: file.name.split('.')[0] || 'Untitled',
        description: '',
        price: 0,
        category: 'Other',
        tags: []
      }));
      
      setPhotoMetadata(prev => [...prev, ...newMetadata]);
      toast.success(`${imageFiles.length} image(s) selected`);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Remove file from selection
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPhotoMetadata(prev => prev.filter((_, i) => i !== index));
  };

  // Update metadata for a specific photo
  const updateMetadata = (index: number, field: keyof PhotoMetadata, value: any) => {
    setPhotoMetadata(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  // Add tag to a photo
  const addTag = (index: number, tag: string) => {
    if (tag.trim() && photoMetadata[index] && !photoMetadata[index].tags.includes(tag.trim())) {
      updateMetadata(index, 'tags', [...photoMetadata[index].tags, tag.trim()]);
    }
  };

  // Remove tag from a photo
  const removeTag = (index: number, tagToRemove: string) => {
    if (photoMetadata[index]) {
      updateMetadata(index, 'tags', photoMetadata[index].tags.filter(tag => tag !== tagToRemove));
    }
  };

  // Proceed to metadata step
  const proceedToMetadata = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    setCurrentStep('metadata');
  };

  // Go back to upload step
  const goBackToUpload = () => {
    setCurrentStep('upload');
  };

  // Handle upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    // Validate metadata
    const invalidPhotos = photoMetadata.filter(photo => 
      !photo.title.trim() || photo.price <= 0 || !photo.category
    );

    if (invalidPhotos.length > 0) {
      toast.error('Please fill in all required fields (title, price, category) for all photos');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Check for authentication - either NextAuth session or local token
      let token = null;
      let userId = null;
      
      if (session?.user) {
        // NextAuth session (Google OAuth)
        token = 'nextauth-session'; // Placeholder token for NextAuth users
        userId = (session as any).databaseId || session.user?.email; // Use database ID if available, fallback to email
        
        // User account is already created/verified in NextAuth signIn callback
        console.log('Using NextAuth session with userId:', userId);
      } else {
        // Check for local auth token
        token = localStorage.getItem('auth_token');
        if (token) {
          const user = localStorage.getItem('auth_user');
          userId = user ? JSON.parse(user).id : null;
        }
      }
      
      if (!token) {
        toast.error('Please log in to upload images');
        return;
      }

      // Create a single FormData with all files and metadata
      const formData = new FormData();
      
      // Add all files with the same field name 'files'
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      
      // Add metadata for all files - send as JSON string
      formData.append('metadata', JSON.stringify(photoMetadata));
      
      // Add common fields
      formData.append('clientName', session?.user?.name || 'user');
      formData.append('uploadedBy', userId || 'anonymous');

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      // Single upload request for all files
      const response = await fetch('http://localhost:5000/api/v1/media/upload', {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to upload files. Status: ${response.status}`);
      }

      const result = await response.json();
      
      // For compatibility with existing progress tracking, create individual results
      const uploadResults = selectedFiles.map((file, index) => ({
        success: true,
        data: result.data?.[index] || { url: '', id: '' },
        file: file.name
      }));

      // Update progress to 100% since we uploaded all files at once
      setUploadProgress(100);
      
      // Use the results we created
      const results = uploadResults;

      const totalValue = photoMetadata.reduce((sum, photo) => sum + photo.price, 0);
      toast.success(`Successfully uploaded ${selectedFiles.length} image(s) with total value NPR ${totalValue.toLocaleString()}!`);
      
      // Reset state
      setSelectedFiles([]);
      setPhotoMetadata([]);
      setUploadProgress(0);
      setCurrentStep('upload');
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Camera className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Upload Photography</h2>
                  <p className="text-sm text-black">
                    {currentStep === 'upload' 
                      ? 'Share your amazing shots with the world' 
                      : 'Add pricing and details to your photos'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={uploading}
              >
                <X className="h-5 w-5 text-black" />
              </button>
            </div>

            {/* Step Indicator */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${currentStep === 'upload' ? 'text-orange-600' : 'text-green-600'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep === 'upload' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Select Photos</span>
                </div>
                <div className={`flex-1 h-px ${currentStep === 'metadata' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className={`flex items-center ${currentStep === 'metadata' ? 'text-orange-600' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep === 'metadata' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Add Details & Pricing</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {currentStep === 'upload' ? (
                <>
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-100 rounded-full mb-4">
                        <Upload className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Drag & drop your images here
                      </h3>
                      <p className="text-black mb-4">
                        or click to browse files
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        disabled={uploading}
                      >
                        Choose Files
                      </button>
                      <p className="text-xs text-black mt-2">
                        Supports: JPG, PNG, GIF, WebP (Max 10MB each)
                      </p>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-black mb-4">
                        Selected Files ({selectedFiles.length})
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <ImageIcon className="h-8 w-8 text-black mr-3" />
                              <div>
                                <p className="text-sm font-medium text-black">
                                  {file.name}
                                </p>
                                <p className="text-xs text-black">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              disabled={uploading}
                            >
                              <X className="h-4 w-4 text-black" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Metadata Step */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-black">
                        Photo Details & Pricing ({photoMetadata.length} photos)
                      </h4>
                      <button
                        onClick={goBackToUpload}
                        className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        ← Back to Files
                      </button>
                    </div>

                    {photoMetadata.map((photo, index) => (
                      <div key={photo.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          {/* Photo Preview */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-black" />
                          </div>

                          {/* Photo Details */}
                          <div className="flex-1 space-y-4">
                            {/* Title */}
                            <div>
                              <label className="block text-sm font-medium text-black mb-1">
                                Title *
                              </label>
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) => updateMetadata(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                                placeholder="Enter photo title"
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="block text-sm font-medium text-black mb-1">
                                Description
                              </label>
                              <textarea
                                value={photo.description}
                                onChange={(e) => updateMetadata(index, 'description', e.target.value)}
                                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                rows={2}
                                placeholder="Describe your photo..."
                              />
                            </div>

                            {/* Price and Category Row */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* Price */}
                              <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                  Price (NPR) *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-4 w-4 text-black" />
                                  </div>
                                  <input
                                    type="number"
                                    value={photo.price}
                                    onChange={(e) => updateMetadata(index, 'price', parseFloat(e.target.value) || 0)}
                                    className="w-full pl-10 pr-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="0"
                                    min="0"
                                    step="1"
                                  />
                                </div>
                              </div>

                              {/* Category */}
                              <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                  Category *
                                </label>
                                <select
                                  value={photo.category}
                                  onChange={(e) => updateMetadata(index, 'category', e.target.value)}
                                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                  {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Tags */}
                            <div>
                              <label className="block text-sm font-medium text-black mb-1">
                                Tags
                              </label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {photo.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                                  >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                    <button
                                      onClick={() => removeTag(index, tag)}
                                      className="ml-1 hover:text-orange-900"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div className="flex">
                                <input
                                  type="text"
                                  className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                  placeholder="Add a tag..."
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      addTag(index, e.currentTarget.value);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    const input = document.querySelector(`input[placeholder="Add a tag..."]`) as HTMLInputElement;
                                    if (input?.value) {
                                      addTag(index, input.value);
                                      input.value = '';
                                    }
                                  }}
                                  className="px-3 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-black">Uploading...</span>
                    <span className="text-sm text-black">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                {currentStep === 'metadata' && (
                  <button
                    onClick={goBackToUpload}
                    className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={uploading}
                  >
                    ← Back
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {currentStep === 'upload' ? (
                  <button
                    onClick={proceedToMetadata}
                    disabled={selectedFiles.length === 0 || uploading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    Next: Add Details →
                  </button>
                ) : (
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload & Publish ({photoMetadata.length} photos)
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
