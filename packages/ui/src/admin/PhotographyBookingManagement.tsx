"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  Camera,
  Video,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { PhotographyBooking, PhotographyBookingStats, PhotographyBookingQueryParams } from "../types/photography.types";

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

export const PhotographyBookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<PhotographyBooking[]>([]);
  const [stats, setStats] = useState<PhotographyBookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PhotographyBookingQueryParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc"
  });
  const [selectedBooking, setSelectedBooking] = useState<PhotographyBooking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockBookings: PhotographyBooking[] = [
      {
        id: "1",
        bookingNumber: "PH-2024-001",
        clientName: "John & Emily Smith",
        clientEmail: "john.emily@email.com",
        clientPhone: "+1-555-0123",
        eventType: "WEDDING",
        serviceCategory: "WEDDING",
        packageType: "BOTH",
        eventDate: "2024-06-15",
        eventTime: "10:00",
        duration: 8,
        location: "Grand Hotel, New York",
        address: "123 Park Avenue",
        city: "New York",
        state: "NY",
        country: "USA",
        packageId: "pkg-1",
        packageName: "Premium Wedding Package",
        isCustomPackage: false,
        basePrice: 5000,
        addOnPrice: 800,
        totalPrice: 5800,
        discountAmount: 0,
        finalPrice: 5800,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        addOns: [
          {
            id: "addon-1",
            addOnId: "addon-1",
            name: "Drone Photography",
            description: "Aerial shots of the venue",
            price: 500,
            quantity: 1,
            totalPrice: 500
          },
          {
            id: "addon-2",
            addOnId: "addon-2",
            name: "Extra Photographer",
            description: "Additional photographer for better coverage",
            price: 300,
            quantity: 1,
            totalPrice: 300
          }
        ],
        specialRequests: "Focus on candid moments and traditional ceremonies",
        deliveryPreferences: "Digital gallery + USB drive",
        adminNotes: "VIP client, priority service",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
      },
      {
        id: "2",
        bookingNumber: "PH-2024-002",
        clientName: "TechCorp Inc.",
        clientEmail: "events@techcorp.com",
        clientPhone: "+1-555-0456",
        eventType: "CORPORATE",
        serviceCategory: "CORPORATE",
        packageType: "PHOTOGRAPHY",
        eventDate: "2024-07-20",
        eventTime: "09:00",
        duration: 6,
        location: "Convention Center, San Francisco",
        address: "456 Market Street",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        packageId: "pkg-2",
        packageName: "Corporate Event Package",
        isCustomPackage: false,
        basePrice: 2500,
        addOnPrice: 0,
        totalPrice: 2500,
        discountAmount: 200,
        finalPrice: 2300,
        status: "PENDING",
        paymentStatus: "PENDING",
        addOns: [],
        specialRequests: "Professional headshots for all speakers",
        deliveryPreferences: "Online gallery with download access",
        adminNotes: "Standard corporate package",
        createdAt: "2024-01-20T14:15:00Z",
        updatedAt: "2024-01-20T14:15:00Z"
      },
      {
        id: "3",
        bookingNumber: "PH-2024-003",
        clientName: "Sarah Johnson",
        clientEmail: "sarah.j@email.com",
        clientPhone: "+1-555-0789",
        eventType: "PERSONAL",
        serviceCategory: "PERSONAL",
        packageType: "PHOTOGRAPHY",
        eventDate: "2024-08-10",
        eventTime: "16:00",
        duration: 3,
        location: "Central Park, New York",
        address: "Central Park",
        city: "New York",
        state: "NY",
        country: "USA",
        packageId: "pkg-3",
        packageName: "Portrait Session",
        isCustomPackage: false,
        basePrice: 800,
        addOnPrice: 150,
        totalPrice: 950,
        discountAmount: 0,
        finalPrice: 950,
        status: "IN_PROGRESS",
        paymentStatus: "PAID",
        addOns: [
          {
            id: "addon-3",
            addOnId: "addon-3",
            name: "Photo Editing",
            description: "Professional retouching and color correction",
            price: 150,
            quantity: 1,
            totalPrice: 150
          }
        ],
        specialRequests: "Natural lighting, outdoor setting",
        deliveryPreferences: "Digital gallery only",
        adminNotes: "Personal portrait session",
        createdAt: "2024-01-25T09:45:00Z",
        updatedAt: "2024-01-25T09:45:00Z"
      }
    ];

    const mockStats: PhotographyBookingStats = {
      totalBookings: 24,
      totalRevenue: 125000,
      averageBookingValue: 5208,
      monthlyRevenue: 35000,
      bookingsByStatus: [
        { status: "CONFIRMED", count: 12 },
        { status: "PENDING", count: 6 },
        { status: "IN_PROGRESS", count: 4 },
        { status: "COMPLETED", count: 2 }
      ],
      bookingsByEventType: [
        { eventType: "WEDDING", count: 15, revenue: 85000 },
        { eventType: "CORPORATE", count: 6, revenue: 25000 },
        { eventType: "PERSONAL", count: 3, revenue: 15000 }
      ],
      popularPackages: [
        { packageId: "pkg-1", packageName: "Premium Wedding Package", bookingCount: 8, revenue: 40000 },
        { packageId: "pkg-2", packageName: "Corporate Event Package", bookingCount: 6, revenue: 15000 },
        { packageId: "pkg-3", packageName: "Portrait Session", bookingCount: 4, revenue: 4000 }
      ],
      recentBookings: mockBookings.slice(0, 5)
    };

    setBookings(mockBookings);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PARTIAL":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-red-100 text-red-800";
      case "REFUNDED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case "WEDDING":
        return "💒";
      case "CORPORATE":
        return "🏢";
      case "PERSONAL":
        return "👤";
      case "EVENT":
        return "🎉";
      default:
        return "📷";
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

  const filteredBookings = bookings.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={ANIMATION_VARIANTS.container}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photography Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage photography and videography bookings
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Camera className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Bookings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalBookings}
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
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Revenue
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${stats.totalRevenue.toLocaleString()}
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
                      Avg. Booking Value
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${stats.averageBookingValue.toLocaleString()}
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
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      This Month
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${stats.monthlyRevenue.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      variants={ANIMATION_VARIANTS.item}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-600">
                                {getEventTypeIcon(booking.eventType)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.bookingNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.clientEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.eventType}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPackageTypeIcon(booking.packageType)}
                          <span className="ml-2 text-sm text-gray-900">
                            {booking.packageName || 'Custom Package'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.duration}h duration
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium">
                          ${booking.finalPrice.toLocaleString()}
                        </div>
                        {booking.discountAmount > 0 && (
                          <div className="text-xs text-green-600">
                            -${booking.discountAmount} discount
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowBookingModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
