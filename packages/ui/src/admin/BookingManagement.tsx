"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  Edit,
  Camera,
  X,
} from "lucide-react";
import { ANIMATION_VARIANTS } from "../constants/admin.constants";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { HeroSectionForm } from "../components/HeroSectionForm";
import { useHeroSection } from "../hooks/useHeroSection";

export const BookingManagement: React.FC = () => {
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [heroSectionData, setHeroSectionData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const { 
    heroSection, 
    isLoading: heroLoading, 
    createHeroSection, 
    updateHeroSection, 
    refreshHeroSection 
  } = useHeroSection();

  const handleHeroSectionSave = async (data: any) => {
    try {
      setIsSaving(true);
      
      if (data.id) {
        // Update existing hero section
        await updateHeroSection(data.id, data);
      } else {
        // Create new hero section
        await createHeroSection(data);
      }
      
      // Refresh the hero section data
      await refreshHeroSection();
      
      // Close the form and modal
      setShowHeroForm(false);
      setShowModal(false);
      setHeroSectionData(null);
      
      // You could add a success notification here
    } catch (error) {
      console.error("Error saving hero section:", error);
      // You could add an error notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleHeroSectionCancel = () => {
    setShowHeroForm(false);
    setShowModal(false);
    setHeroSectionData(null);
  };

  const openHeroForm = (mode: "create" | "edit" = "create", data?: any) => {
    setHeroSectionData(data || null);
    if (mode === "edit") {
      setShowModal(true);
    } else {
      setShowHeroForm(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setHeroSectionData(null);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hero Section Management</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your hero section content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="p-6">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ANIMATION_VARIANTS}
            className="space-y-6"
          >
            {/* Hero Section Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Hero Section</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your hero section content</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {heroSection && !showHeroForm && (
                      <motion.button
                        onClick={() => openHeroForm("edit", heroSection)}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit Hero Section</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              {/* Hero Section Content */}
              <div className="p-6">
                {heroLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : showHeroForm ? (
                  <HeroSectionForm
                    initialData={heroSectionData}
                    onSave={handleHeroSectionSave}
                    onCancel={handleHeroSectionCancel}
                  />
                ) : heroSection ? (
                  <HeroSectionManagement heroSection={heroSection} onEdit={() => openHeroForm("edit", heroSection)} />
                ) : (
                  <div className="text-center py-12">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hero Section Found</h3>
                    <p className="text-gray-500 mb-6">Create a hero section to showcase your booking services</p>
                    <motion.button
                      onClick={() => openHeroForm("create")}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Hero Section
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Edit Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50"
            onClick={closeModal}
          >
            <motion.div
              className="bg-white w-full max-w-2xl h-full max-h-screen overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Hero Section</h2>
                  <p className="text-sm text-gray-500 mt-1">Update your hero section content</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <HeroSectionForm
                  initialData={heroSectionData}
                  onSave={handleHeroSectionSave}
                  onCancel={handleHeroSectionCancel}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

// Hero Section Management Component
interface HeroSectionManagementProps {
  heroSection: any;
  onEdit: () => void;
}

const HeroSectionManagement: React.FC<HeroSectionManagementProps> = ({ heroSection, onEdit }) => {
  // Default content if no hero section exists
  const defaultContent = {
    id: null,
    title: "Every Moment of Your",
    subtitle: "Beautifully Captured", 
    description: "The tools you need to build your photography business. Get started - like, right now.",
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Get Started",
    rotatingTexts: ["Wedding", "Pasni", "Event", "Anniversary"],
  };

  const heroContent = heroSection || defaultContent;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div 
          className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600"
          style={{
            backgroundImage: heroContent.backgroundImage 
              ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroContent.backgroundImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h3 className="text-3xl font-bold mb-2">{heroContent.title}</h3>
              <p className="text-lg mb-4">{heroContent.subtitle}</p>
              <p className="text-blue-100 max-w-2xl mx-auto">{heroContent.description}</p>
              {heroContent.ctaText && (
                <button className="mt-6 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {heroContent.ctaText}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {heroContent.rotatingTexts && heroContent.rotatingTexts.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Rotating Texts:</h4>
              <div className="flex flex-wrap gap-2">
                {heroContent.rotatingTexts.map((text, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Active Hero Section</span>
              </span>
              <span>•</span>
              <span>Last updated: {heroContent.updatedAt ? new Date(heroContent.updatedAt).toLocaleDateString() : 'Never'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};