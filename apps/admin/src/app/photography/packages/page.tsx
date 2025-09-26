'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Camera, Heart, Users, Settings } from 'lucide-react';

const PhotographyPackages = () => {
  const [packages] = useState([
    {
      id: 'wedding',
      name: 'Wedding Photography',
      description: 'Complete wedding photography packages with different tiers',
      icon: Heart,
      color: 'bg-pink-500',
      count: 3,
      href: '/photography/packages/wedding'
    },
    {
      id: 'other',
      name: 'Other Photography',
      description: 'Portrait, event, commercial and other photography packages',
      icon: Camera,
      color: 'bg-blue-500',
      count: 5,
      href: '/photography/packages/other'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Photography Packages</h1>
              <p className="mt-2 text-gray-600">Manage photography service packages and pricing</p>
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
            <li className="text-gray-900">Packages</li>
          </ol>
        </nav>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Link
                key={pkg.id}
                href={pkg.href}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-orange-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${pkg.color} text-white`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">{pkg.count}</span>
                    <p className="text-sm text-gray-500">packages</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {pkg.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {pkg.description}
                </p>
                
                <div className="flex items-center text-orange-500 text-sm font-medium group-hover:text-orange-600">
                  Manage packages
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹2.4L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyPackages;








