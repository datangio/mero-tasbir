"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X, Save, Upload, Plus, Trash2, Image } from "lucide-react";

interface PackageFeature {
  id: string;
  text: string;
}

interface EventPackageData {
  id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  features: PackageFeature[];
  maxGuests: number;
  isPopular: boolean;
  icon: string;
  iconFile?: File;
}

interface EventPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EventPackageData) => Promise<void>;
  onUpdate?: (id: string, data: EventPackageData) => Promise<void>;
  packageData?: EventPackageData | null;
  loading?: boolean;
}

export const EventPackageModal: React.FC<EventPackageModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  packageData = null,
  loading = false,
}) => {
  const [features, setFeatures] = useState<PackageFeature[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<{
    name: string;
    price: number;
    discountPrice?: number;
    description: string;
    maxGuests: number;
    isPopular: boolean;
    icon: string;
  }>({
    defaultValues: {
      name: '',
      price: 0,
      discountPrice: undefined,
      description: '',
      maxGuests: 0,
      isPopular: false,
      icon: ''
    }
  });

  const watchedIsPopular = watch('isPopular');

  // Add feature
  const addFeature = () => {
    if (newFeature.trim()) {
      const feature: PackageFeature = {
        id: Date.now().toString(),
        text: newFeature.trim()
      };
      setFeatures(prev => [...prev, feature]);
      setNewFeature('');
    }
  };

  // Remove feature
  const removeFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id));
  };

  // Handle icon file upload
  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setIconFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle base64 icon input
  const handleBase64IconChange = (value: string) => {
    setIconPreview(value);
    setIconFile(null); // Clear file when using base64
  };

  // Form submission
  const onSubmit = async (data: any) => {
    try {
      // Validate icon - can be either uploaded file or base64 data
      if (!iconFile && !iconPreview) {
        toast.error('Please upload a package icon or provide icon data');
        return;
      }

      // Validate icon content if it's base64 - check if it starts with data:image/
      if (iconPreview && !iconPreview.startsWith('data:image/')) {
        toast.error('Please upload a valid image file or provide valid base64 data (must start with data:image/)');
        return;
      }

      // Determine the final icon - prioritize uploaded file, then preview, then default
      let finalIcon;
      if (iconPreview) {
        finalIcon = iconPreview;
      } else if (iconFile) {
        // Convert file to base64 if needed
        finalIcon = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(iconFile);
        });
      } else {
        // Default fallback icon
        finalIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDdMMTIgM0w0IDdMMTIgMTFMMjAgN1oiIHN0cm9rZT0iI0Y5OTU0MyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTQgN1YxN0wxMiAyMUwyMCAxN1Y3IiBzdHJva2U9IiNGOUE1NDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
      }

      // Validate features
      if (features.length === 0) {
        toast.error('Please add at least one feature');
        return;
      }

      // Clean up the data - remove discountPrice if it's 0 or empty
      const cleanData = { ...data };
      if (cleanData.discountPrice === 0 || cleanData.discountPrice === '') {
        delete cleanData.discountPrice;
      }

      // Convert string numbers to actual numbers
      cleanData.price = Number(cleanData.price);
      cleanData.maxGuests = Number(cleanData.maxGuests);
      if (cleanData.discountPrice) {
        cleanData.discountPrice = Number(cleanData.discountPrice);
      }

      // Validate that numbers are valid
      if (isNaN(cleanData.price) || cleanData.price < 0) {
        toast.error('Please enter a valid price');
        return;
      }
      if (isNaN(cleanData.maxGuests) || cleanData.maxGuests < 1) {
        toast.error('Please enter a valid number of guests');
        return;
      }
      if (cleanData.discountPrice && (isNaN(cleanData.discountPrice) || cleanData.discountPrice < 0)) {
        toast.error('Please enter a valid discount price');
        return;
      }

      // Ensure features array is properly formatted
      const formattedFeatures = features.map(feature => ({
        id: feature.id || Date.now().toString() + Math.random(),
        text: feature.text
      }));

      const packageData = {
        ...cleanData,
        features: formattedFeatures,
        icon: finalIcon
      };

      console.log('Package data being sent:', packageData);

      if (packageData?.id && onUpdate) {
        await onUpdate(packageData.id, packageData);
        toast.success('Event package updated successfully!');
      } else {
        await onSave(packageData);
        toast.success('Event package saved successfully!');
      }
      onClose();
      reset();
      setFeatures([]);
      setIconFile(null);
      setIconPreview('');
    } catch (error) {
      console.error('Error saving event package:', error);
      toast.error('Error saving event package. Please try again.');
    }
  };

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      if (packageData) {
        // Convert numbers properly
        const formData = {
          name: packageData.name || '',
          price: Number(packageData.price) || 0,
          discountPrice: packageData.discountPrice ? Number(packageData.discountPrice) : undefined,
          description: packageData.description || '',
          maxGuests: Number(packageData.maxGuests) || 0,
          isPopular: packageData.isPopular || false,
          icon: packageData.icon || '',
        };
        reset(formData);
        setFeatures(packageData.features || []);
        setIconPreview(packageData.icon || '');
        setIconFile(null);
      } else {
        reset();
        setFeatures([]);
        setIconFile(null);
        setIconPreview('');
      }
    }
  }, [isOpen, packageData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">
            {packageData?.id ? 'Edit Event Package' : 'Add Event Package'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Package Name *</label>
              <input
                type="text"
                {...register('name', { required: 'Package name is required' })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Essential Package"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Price (NPR) *</label>
              <input
                type="number"
                {...register('price', { 
                  required: 'Price is required', 
                  min: 0,
                  valueAsNumber: true
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Discount Price (NPR)</label>
              <input
                type="number"
                {...register('discountPrice', { 
                  min: 0,
                  valueAsNumber: true
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="2000 (optional)"
              />
              <p className="mt-1 text-xs text-gray-500">Leave empty if no discount</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Max Guests *</label>
              <input
                type="number"
                {...register('maxGuests', { 
                  required: 'Max guests is required', 
                  min: 1,
                  valueAsNumber: true
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.maxGuests ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50"
              />
              {errors.maxGuests && (
                <p className="mt-1 text-sm text-red-600">{errors.maxGuests.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Package description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Package Icon *</label>
              <div className="space-y-3">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {iconPreview ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center">
                          <img 
                            src={iconPreview} 
                            alt="Icon preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <>
                          <Image className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> package icon
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, SVG (MAX. 5MB)</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {iconFile && (
                  <div className="text-sm text-gray-600">
                    Selected: {iconFile.name}
                  </div>
                )}
                
                <div className="text-center text-sm text-gray-500">
                  <span className="font-medium">OR</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Base64 Icon Data</label>
                  <textarea
                    value={iconPreview && iconPreview.startsWith('data:') ? iconPreview : ''}
                    onChange={(e) => handleBase64IconChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Paste base64 data URL here (data:image/...)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Paste a base64 encoded image data URL (starts with data:image/)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">Package Features</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-black">{feature.text}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature.id)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPopular"
              {...register('isPopular')}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="isPopular" className="ml-2 block text-sm text-black">
              Mark as "Most Popular"
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: '#E08E45' }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#D17A2F'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#E08E45'}
            >
              <Save className="w-4 h-4" />
              <span>{packageData?.id ? 'Update' : 'Save'} Package</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
