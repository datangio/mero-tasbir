"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

interface EventHeroData {
  id?: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isActive: boolean;
}

interface EventHeroFormProps {
  eventHeroData: EventHeroData;
  setEventHeroData: (data: EventHeroData) => void;
  loading: boolean;
  onSave: (data: EventHeroData) => Promise<void>;
  onUpdate: (id: string, data: EventHeroData) => Promise<void>;
}

export const EventHeroForm: React.FC<EventHeroFormProps> = ({
  eventHeroData,
  setEventHeroData,
  loading,
  onSave,
  onUpdate,
}) => {
  // File upload states
  const [eventHeroFile, setEventHeroFile] = useState<File | null>(null);
  const [eventHeroPreview, setEventHeroPreview] = useState<string>('');

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      mediaUrl: '',
      mediaType: 'image',
      isActive: true
    }
  });

  const watchedMediaType = watch('mediaType');

  // File upload handlers
  const handleEventHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventHeroFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEventHeroPreview(result);
        setValue('mediaUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventHeroVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventHeroFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEventHeroPreview(result);
        setValue('mediaUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const onEventHeroSubmit = async (data: any) => {
    try {
      if (eventHeroData.id) {
        await onUpdate(eventHeroData.id, data);
        toast.success('Event hero updated successfully!');
      } else {
        await onSave(data);
        toast.success('Event hero saved successfully!');
      }
    } catch (error) {
      console.error('Error saving event hero:', error);
      toast.error('Error saving event hero. Please try again.');
    }
  };

  // Reset form when data changes
  useEffect(() => {
    if (eventHeroData) {
      reset(eventHeroData);
      if (eventHeroData.mediaUrl && eventHeroData.mediaType === 'image') {
        setEventHeroPreview(eventHeroData.mediaUrl);
      }
    }
  }, [eventHeroData, reset]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Event Hero Section</h2>
          <p className="text-black">Manage the hero section content for your event pages.</p>
        </div>
        <button
          type="submit"
          form="event-hero-form"
          disabled={loading}
          className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#E08E45' }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#D17A2F'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#E08E45'}
        >
          <Save className="w-4 h-4" />
          <span>{eventHeroData.id ? 'Update' : 'Save'} Event Hero</span>
        </button>
      </div>
      
      <form id="event-hero-form" onSubmit={handleSubmit(onEventHeroSubmit)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title *</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Enter event description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">Media Type *</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="image"
                  {...register('mediaType', { required: 'Media type is required' })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-black">Image</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  {...register('mediaType', { required: 'Media type is required' })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-black">Video</span>
              </label>
            </div>
            {errors.mediaType && (
              <p className="mt-1 text-sm text-red-600">{errors.mediaType.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {watchedMediaType === 'image' ? 'Upload Image' : 'Upload Video'} *
            </label>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor={watchedMediaType === 'image' ? 'eventHeroFile' : 'eventHeroVideoFile'} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6a5 5 0 0 0-10 0 5.56 5.56 0 0 0-.025 1H3a3 3 0 1 0 0 6h3m0 0v-3a1 1 0 0 1 2 0v3m-2 0h2m0 0v-3a1 1 0 0 1 2 0v3m-2 0h2"/>
                    </svg>
                  <p className="mb-2 text-sm text-black">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-black">
                    {watchedMediaType === 'image' ? 'PNG, JPG, GIF (MAX. 10MB)' : 'MP4, MOV, AVI (MAX. 50MB)'}
                  </p>
                  </div>
                  <input 
                    id={watchedMediaType === 'image' ? 'eventHeroFile' : 'eventHeroVideoFile'}
                    type="file" 
                    className="hidden" 
                    accept={watchedMediaType === 'image' ? 'image/*' : 'video/*'}
                    onChange={watchedMediaType === 'image' ? handleEventHeroFileUpload : handleEventHeroVideoUpload}
                  />
                </label>
              </div>
              
              {eventHeroPreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-black mb-2">Preview:</p>
                  {watchedMediaType === 'image' ? (
                    <img 
                      src={eventHeroPreview} 
                      alt="Preview" 
                      className="w-full h-80 object-cover rounded-lg border border-gray-300"
                    />
                  ) : (
                    <video 
                      src={eventHeroPreview} 
                      controls
                      className="w-full h-80 object-cover rounded-lg border border-gray-300"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-black">
              Active (show on website)
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};



