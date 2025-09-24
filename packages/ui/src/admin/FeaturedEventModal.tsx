"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X, Save, Upload } from "lucide-react";

interface FeaturedEventData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FeaturedEventData) => Promise<void>;
  onUpdate?: (id: string, data: FeaturedEventData) => Promise<void>;
  eventData?: FeaturedEventData | null;
  loading?: boolean;
}

export const FeaturedEventModal: React.FC<FeaturedEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  eventData = null,
  loading = false,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      imageUrl: ''
    }
  });

  // File upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue('imageUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const onSubmit = async (data: any) => {
    try {
      if (eventData?.id && onUpdate) {
        await onUpdate(eventData.id, data);
        toast.success('Featured event updated successfully!');
      } else {
        await onSave(data);
        toast.success('Featured event saved successfully!');
      }
      onClose();
      reset();
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error saving featured event:', error);
      toast.error('Error saving featured event. Please try again.');
    }
  };

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      if (eventData) {
        reset(eventData);
        if (eventData.imageUrl) {
          setImagePreview(eventData.imageUrl);
        }
      } else {
        reset();
        setImagePreview('');
      }
    }
  }, [isOpen, eventData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">
            {eventData?.id ? 'Edit Featured Event' : 'Add Featured Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Featured Title *</label>
            <input
              type="text"
              {...register('title', { required: 'Featured title is required' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter featured title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Featured Description *</label>
            <textarea
              {...register('description', { required: 'Featured description is required' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Enter featured description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Featured Image *</label>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="eventImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-black">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-black">PNG, JPG, GIF (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="eventImage"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-black mb-2">Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Featured image preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
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
              <span>{eventData?.id ? 'Update' : 'Save'} Featured Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
