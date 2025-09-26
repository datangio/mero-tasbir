'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Heart, Star, Clock, Users } from 'lucide-react';

const WeddingPackages = () => {
  const [packages] = useState([
    {
      id: 1,
      name: 'Basic Wedding Package',
      description: 'Essential wedding photography coverage',
      price: 25000,
      duration: '6 hours',
      photos: 200,
      status: 'active',
      features: ['Pre-wedding shoot', 'Ceremony coverage', 'Basic editing', 'Online gallery']
    },
    {
      id: 2,
      name: 'Premium Wedding Package',
      description: 'Complete wedding photography with premium features',
      price: 45000,
      duration: '10 hours',
      photos: 500,
      status: 'active',
      features: ['Pre-wedding shoot', 'Full day coverage', 'Premium editing', 'Print album', 'Online gallery']
    },
    {
      id: 3,
      name: 'Luxury Wedding Package',
      description: 'Ultimate wedding photography experience',
      price: 75000,
      duration: '12 hours',
      photos: 800,
      status: 'active',
      features: ['Pre-wedding shoot', 'Full day coverage', 'Premium editing', 'Luxury album', 'Drone footage', 'Online gallery']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wedding Photography Packages</h1>
              <p className="mt-2 text-gray-600">Manage wedding photography packages and pricing</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Add New Package
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/dashboard" className="hover:text-orange-500">Dashboard</Link></li>
            <li>/</li>
            <li><Link href="/photography" className="hover:text-orange-500">Photography</Link></li>
            <li>/</li>
            <li><Link href="/photography/packages" className="hover:text-orange-500">Packages</Link></li>
            <li>/</li>
            <li className="text-gray-900">Wedding</li>
          </ol>
        </nav>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900">{packages.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bookings</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
                <p className="text-2xl font-bold text-gray-900">9h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Package Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-orange-500">₹{pkg.price.toLocaleString()}</div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center mt-1">
                      <Eye className="w-4 h-4 mr-1" />
                      {pkg.photos} photos
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Features */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                    Edit Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no packages) */}
        {packages.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No wedding packages yet</h3>
            <p className="text-gray-500 mb-6">Create your first wedding photography package to get started.</p>
            <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
              Create Package
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingPackages;








