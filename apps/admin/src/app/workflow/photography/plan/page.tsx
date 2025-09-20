"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AdminLayout, NewPhotographyPlanModal, ViewPhotographyPlanModal, EditPhotographyPlanModal, DeleteConfirmationModal } from "@repo/ui";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Camera, 
  Video, 
  Package,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";

const ANIMATION_VARIANTS = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

interface PhotographyPlan {
  id: string;
  title: string;
  eventDate: string;
  location: string;
  duration: number;
  clientName: string;
  packageType: 'PHOTOGRAPHY' | 'VIDEOGRAPHY' | 'BOTH';
  status: 'DRAFT' | 'PLANNING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
  requirements: string[];
  equipment: string[];
  team: string[];
  timeline: {
    time: string;
    activity: string;
    responsible: string;
  }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function PhotographyPlanPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [viewAllData, setViewAllData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch plans from API
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/packages');
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setPlans(data.data?.packages || []);
      } else {
        console.error('Failed to fetch plans');
        setPlans([]);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (planData: any) => {
    try {
      setIsCreating(true);
      console.log('Creating plan with data:', planData);
      
      // Using actual IDs from the seeded data
      const requestBody = {
        name: planData.title,
        description: planData.notes,
        basePrice: Number(planData.price),
        duration: Number(planData.duration),
        includes: planData.included,
        isActive: true,
        isCustomizable: false, // Default to false for new plans
        maxPhotos: 0,
        maxVideos: 0,
        packageTypeId: 'cmfp3oa9b0001tqqks97skdop', // Photography package type
        serviceCategoryId: 'cmfp3oaga0005tqqke7nm6pra', // Wedding service category
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch('http://localhost:5000/api/v1/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const newPlan = await response.json();
        console.log('Created plan response:', newPlan);
        setPlans(prev => [newPlan.data, ...prev]);
        setShowNewPlanModal(false);
        setCurrentPage(1); // Reset to first page
        toast.dismiss('create-plan');
        toast.success('Plan created successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to create plan:', response.status, errorData);
        toast.dismiss('create-plan');
        if (errorData.message && errorData.message.includes('already exists')) {
          toast.error('A plan with this name already exists. Please choose a different name.');
        } else if (errorData.message && errorData.message.includes('Validation error')) {
          toast.error(`Validation error: ${errorData.errors?.map((e: any) => e.message).join(', ')}`);
        } else {
          toast.error(`Failed to create plan: ${errorData.message || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.dismiss('create-plan');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowViewModal(true);
  };

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  const handleDeletePlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowDeleteModal(true);
  };

  const handleUpdatePlan = async (planData: any) => {
    if (!selectedPlan) return;

    try {
      setIsUpdating(true);
      console.log('Updating plan with data:', planData);
      
      const requestBody = {
        name: planData.name,
        description: planData.description,
        basePrice: Number(planData.basePrice),
        duration: Number(planData.duration),
        includes: planData.includes,
        isActive: Boolean(planData.isActive),
        isCustomizable: Boolean(planData.isCustomizable),
        maxPhotos: Number(planData.maxPhotos) || 0,
        maxVideos: Number(planData.maxVideos) || 0,
      };
      
      console.log('Update request body:', requestBody);
      
      const response = await fetch(`http://localhost:5000/api/v1/packages/${selectedPlan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const updatedPlan = await response.json();
        console.log('Updated plan response:', updatedPlan);
        setPlans(prev => prev.map(plan => plan.id === selectedPlan.id ? updatedPlan.data : plan));
        setShowEditModal(false);
        setSelectedPlan(null);
        toast.dismiss('update-plan');
        toast.success('Plan updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to update plan:', response.status, errorData);
        toast.dismiss('update-plan');
        if (errorData.message && errorData.message.includes('already exists')) {
          toast.error('A plan with this name already exists. Please choose a different name.');
        } else if (errorData.message && errorData.message.includes('Validation error')) {
          toast.error(`Validation error: ${errorData.errors?.map((e: any) => e.message).join(', ')}`);
        } else {
          toast.error(`Failed to update plan: ${errorData.message || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.dismiss('update-plan');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedPlan) return;

    try {
      setIsDeleting(true);
      console.log('Deleting plan:', selectedPlan.id);
      
      const response = await fetch(`http://localhost:5000/api/v1/packages/${selectedPlan.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlans(prev => prev.filter(plan => plan.id !== selectedPlan.id));
        setShowDeleteModal(false);
        setSelectedPlan(null);
        // Adjust current page if needed after deletion
        const newTotalPages = Math.ceil(((Array.isArray(plans) ? plans.length : 0) - 1) / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        toast.success('Plan deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete plan:', response.status, errorData);
        toast.error('Failed to delete plan. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil((Array.isArray(plans) ? plans.length : 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPlans = Array.isArray(plans) ? plans.slice(startIndex, endIndex) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "PLANNING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPackageTypeIcon = (packageType: string) => {
    switch (packageType) {
      case "PHOTOGRAPHY":
        return <Camera className="h-4 w-4" />;
      case "VIDEOGRAPHY":
        return <Video className="h-4 w-4" />;
      case "BOTH":
        return <Package className="h-4 w-4" />;
      default:
        return <Camera className="h-4 w-4" />;
    }
  };

  const breadcrumbs = [
    { label: "Workflow", href: "/workflow" },
    { label: "Photography", href: "/workflow/photography" },
    { label: "Plan", href: "/workflow/photography/plan", isActive: true }
  ];

  return (
    <AdminLayout pageTitle="Photography Planning" breadcrumbs={breadcrumbs}>
      <motion.div
        className="space-y-6 p-6"
        variants={ANIMATION_VARIANTS.container}
        initial="initial"
        animate="animate"
      >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photography Planning</h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan and organize photography shoots with detailed timelines and requirements
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowNewPlanModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Plans
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {plans.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {Array.isArray(plans) ? plans.filter(p => p.isActive).length : 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Customizable
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {Array.isArray(plans) ? plans.filter(p => p.isCustomizable).length : 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    High Price
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {Array.isArray(plans) ? plans.filter(p => p.basePrice > 500).length : 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            variants={ANIMATION_VARIANTS.stagger}
            initial="initial"
            animate="animate"
            className="contents"
          >
          {currentPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={ANIMATION_VARIANTS.item}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {plan.name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status || 'ACTIVE')}`}>
                    {(plan.status || 'ACTIVE').replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    ${plan.basePrice || 0}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {plan.duration || 0} hours
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {plan.isCustomizable ? 'Customizable' : 'Fixed Package'}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Included:</div>
                  <div className="flex flex-wrap gap-1">
                    {plan.includes && plan.includes.length > 0 ? plan.includes.slice(0, 3).map((item, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {item}
                      </span>
                    )) : (
                      <span className="text-xs text-gray-400">No items included</span>
                    )}
                    {plan.includes && plan.includes.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        +{plan.includes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPlan(plan)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setViewAllData(!viewAllData)}
                      className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        viewAllData 
                          ? "border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:ring-indigo-500" 
                          : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
                      }`}
                      title={viewAllData ? "Hide all data" : "View all data"}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Edit className="h-4 w-4" onClick={() => handleEditPlan(plan)} />
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <Trash2 className="h-4 w-4" onClick={() => handleDeletePlan(plan)} />
                    </button>
                  </div>
                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{startIndex + 1}</span>
                {' '}to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, Array.isArray(plans) ? plans.length : 0)}
                </span>
                {' '}of{' '}
                <span className="font-medium">{Array.isArray(plans) ? plans.length : 0}</span>
                {' '}results
              </p>
              
              {/* Direct page input */}
              <div className="flex items-center space-x-2">
                <label htmlFor="page-input" className="text-sm text-gray-700">
                  Go to page:
                </label>
                <input
                  id="page-input"
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page);
                    }
                  }}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-sm text-gray-500">of {totalPages}</span>
              </div>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers with smart pagination */}
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 5;
                  
                  if (totalPages <= maxVisiblePages) {
                    // Show all pages if total is small
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Smart pagination with ellipsis
                    if (currentPage <= 3) {
                      // Show first 3 pages, ellipsis, last page
                      for (let i = 1; i <= 3; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 2) {
                      // Show first page, ellipsis, last 3 pages
                      pages.push(1);
                      pages.push('...');
                      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
                    } else {
                      // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
                      pages.push(1);
                      pages.push('...');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    }
                  }
                  
                  return pages.map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          page === currentPage
                            ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ));
                })()}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* All Data View */}
      {viewAllData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Photography Plans Data</h3>
            <p className="mt-1 text-sm text-gray-500">Complete overview of all photography plans with detailed information</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Included</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(plans) && plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                      <div className="text-sm text-gray-500">${plan.basePrice || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{plan.duration || 0} hours</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{plan.isActive ? 'Active' : 'Inactive'}</div>
                      <div className="text-sm text-gray-500">{plan.isCustomizable ? 'Customizable' : 'Fixed'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-sm text-gray-900">Photography Plan</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status || 'ACTIVE')}`}>
                        {(plan.status || 'ACTIVE').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.duration || 0} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {plan.includes ? plan.includes.length : 0} items
                      </div>
                      <div className="text-sm text-gray-500">
                        {plan.includes ? plan.includes.slice(0, 2).join(', ') : 'No items'}
                        {plan.includes && plan.includes.length > 2 && ` +${plan.includes.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {plan.description || 'No notes'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* New Plan Modal */}
      <NewPhotographyPlanModal
        isOpen={showNewPlanModal}
        onClose={() => setShowNewPlanModal(false)}
        onSubmit={handleCreatePlan}
        isLoading={isCreating}
      />

      {/* View Plan Modal */}
      <ViewPhotographyPlanModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        plan={selectedPlan}
      />

      {/* Edit Plan Modal */}
      <EditPhotographyPlanModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdatePlan}
        plan={selectedPlan}
        isLoading={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Photography Plan"
        message={`Are you sure you want to delete "${selectedPlan?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
      </motion.div>
    </AdminLayout>
  );
}
