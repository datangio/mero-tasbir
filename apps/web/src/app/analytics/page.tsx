"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Tag,
  Image as ImageIcon,
  Download,
  ArrowUpRight,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface UserAnalytics {
  overview: {
    totalImages: number;
    totalLikes: number;
    totalViews: number;
    totalSales: number;
    totalEarnings: number;
    totalWithdrawn: number;
    pendingWithdrawals: number;
    availableBalance: number;
    averageEarningsPerImage: number;
  };
  recentSales: any[];
  monthlyEarnings: { month: string; earnings: number }[];
  categoryBreakdown: any[];
  media: any[];
  withdrawals: any[];
}

interface UserMedia {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  price: number;
  likes: number;
  views: number;
  sales: number;
  totalEarnings: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AnalyticsPage() {
  const { user, token } = useAuth();
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [userMedia, setUserMedia] = useState<UserMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Get current user from either AuthContext or NextAuth session
  const getCurrentUser = () => {
    if (session?.user) {
      return {
        id: (session as any).databaseId || session.user?.email, // Use database ID if available, fallback to email
        fullName: session.user.name || '',
        username: session.user.email?.split('@')[0] || '',
        email: session.user.email || ''
      };
    }
    return user;
  };

  const getCurrentToken = () => {
    if (session?.user) {
      return 'nextauth-session'; // Placeholder token for NextAuth users
    }
    return token;
  };

  const currentUser = getCurrentUser();
  const currentToken = getCurrentToken();

  useEffect(() => {
    console.log('Analytics useEffect triggered:', {
      currentUser,
      currentToken,
      sessionUser: session?.user?.email,
      authUser: user?.id
    });
    
    if (currentUser && currentToken) {
      fetchAnalytics();
    } else {
      console.log('Not fetching analytics - missing user or token:', {
        hasCurrentUser: !!currentUser,
        hasCurrentToken: !!currentToken
      });
    }
  }, [session?.user?.email, user?.id]); // Only depend on actual values that change

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      console.log('Fetching analytics with headers:', headers);
      console.log('Current user:', currentUser);

      const response = await fetch('http://localhost:5000/api/v1/analytics/user', {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Analytics fetch error:', response.status, errorData);
        toast.error(`Failed to fetch analytics: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!analytics?.overview.availableBalance || analytics.overview.availableBalance <= 0) {
      toast.error('No available balance for withdrawal');
      return;
    }

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      const response = await fetch('http://localhost:5000/api/v1/analytics/withdrawal', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          amount: analytics.overview.availableBalance,
          bankDetails: {
            accountNumber: '1234567890', // This should come from user profile
            bankName: 'Nepal Bank',
            accountHolderName: currentUser?.fullName || currentUser?.username,
          },
        }),
      });

      if (response.ok) {
        toast.success('Withdrawal request submitted successfully');
      } else {
        toast.error('Failed to submit withdrawal request');
      }
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      toast.error('Error requesting withdrawal');
    }
  };

  const fetchUserMedia = async () => {
    try {
      setMediaLoading(true);
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      console.log('Fetching user media with headers:', headers);
      console.log('Current user:', currentUser);

      const response = await fetch('http://localhost:5000/api/v1/media/user', {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setUserMedia(data.data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('User media fetch error:', response.status, errorData);
        toast.error(`Failed to fetch user media: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user media:', error);
      toast.error('Error fetching user media');
    } finally {
      setMediaLoading(false);
    }
  };

  const deleteMedia = async (mediaId: string) => {
    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      const response = await fetch(`http://localhost:5000/api/v1/media/${mediaId}`, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        toast.success('Image deleted successfully');
        // Remove from local state
        setUserMedia(prev => prev.filter(media => media.id !== mediaId));
        // Refresh analytics to update counts
        fetchAnalytics();
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Error deleting image');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteClick = (mediaId: string) => {
    setDeleteConfirmId(mediaId);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteMedia(deleteConfirmId);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  // Fetch user media when component mounts
  useEffect(() => {
    console.log('User media useEffect triggered:', {
      currentUser,
      currentToken,
      sessionUser: session?.user?.email,
      authUser: user?.id
    });
    
    if (currentUser && currentToken) {
      fetchUserMedia();
    } else {
      console.log('Not fetching user media - missing user or token:', {
        hasCurrentUser: !!currentUser,
        hasCurrentToken: !!currentToken
      });
    }
  }, [session?.user?.email, user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Analytics Data</h2>
          <p className="text-gray-500">Start uploading images to see your analytics</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Images',
      value: analytics.overview.totalImages,
      icon: ImageIcon,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Likes',
      value: analytics.overview.totalLikes,
      icon: Heart,
      color: 'bg-red-500',
      change: '+8%',
    },
    {
      title: 'Total Views',
      value: analytics.overview.totalViews,
      icon: Eye,
      color: 'bg-green-500',
      change: '+15%',
    },
    {
      title: 'Total Sales',
      value: analytics.overview.totalSales,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+23%',
    },
    {
      title: 'Total Earnings',
      value: `NPR ${analytics.overview.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-orange-500',
      change: '+18%',
    },
    {
      title: 'Available Balance',
      value: `NPR ${analytics.overview.availableBalance.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12%',
    },
    {
      title: 'Total Withdrawn',
      value: `NPR ${analytics.overview.totalWithdrawn.toLocaleString()}`,
      icon: Download,
      color: 'bg-blue-600',
      change: '+8%',
    },
    {
      title: 'Pending Withdrawals',
      value: `NPR ${analytics.overview.pendingWithdrawals.toLocaleString()}`,
      icon: Calendar,
      color: 'bg-yellow-500',
      change: '+3%',
    },
    {
      title: 'Avg per Image',
      value: `NPR ${analytics.overview.averageEarningsPerImage.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      change: '+5%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your image performance and earnings</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
                <option value="12months">Last 12 months</option>
              </select>
              <button
                onClick={() => {
                  // Scroll to the My Uploaded Images section
                  const uploadSection = document.getElementById('my-uploads-section');
                  uploadSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                My Uploads
              </button>
              <button
                onClick={handleWithdrawal}
                disabled={analytics.overview.availableBalance <= 0}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Withdraw Earnings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.monthlyEarnings.slice(-6).map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(month.month + '-01').toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (month.earnings / Math.max(...analytics.monthlyEarnings.map(m => m.earnings))) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      NPR {month.earnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.categoryBreakdown.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <p className="text-xs text-gray-500">{category.count} images</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      NPR {category.totalEarnings.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{category.totalSales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Sales</h3>
          {analytics.recentSales.length > 0 ? (
            <div className="space-y-4">
              {analytics.recentSales.map((sale, index) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{sale.media?.title || 'Untitled'}</p>
                      <p className="text-sm text-gray-500">Sold to {sale.buyerEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">NPR {sale.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No sales yet</p>
            </div>
          )}
        </motion.div>

        {/* Recent Withdrawals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Withdrawals</h3>
          {analytics.withdrawals && analytics.withdrawals.length > 0 ? (
            <div className="space-y-4">
              {analytics.withdrawals.map((withdrawal, index) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      withdrawal.status === 'COMPLETED' ? 'bg-green-100' :
                      withdrawal.status === 'PENDING' ? 'bg-yellow-100' :
                      withdrawal.status === 'REJECTED' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Download className={`h-6 w-6 ${
                        withdrawal.status === 'COMPLETED' ? 'text-green-600' :
                        withdrawal.status === 'PENDING' ? 'text-yellow-600' :
                        withdrawal.status === 'REJECTED' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        NPR {withdrawal.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(withdrawal.requestedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      withdrawal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      withdrawal.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {withdrawal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No withdrawals yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* User Media Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          id="my-uploads-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Uploaded Images</h3>
            <ImageIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          {mediaLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : userMedia.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userMedia.map((media) => (
                <div key={media.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={media.thumbnailUrl || media.url}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Overlay with image info and delete button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-end">
                    <div className="w-full p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="mb-2">
                        <h4 className="font-medium text-sm truncate">{media.title}</h4>
                        <p className="text-xs text-gray-300">
                          NPR {media.price} • {media.likes} likes • {media.views} views
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {media.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-500 bg-opacity-80 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleDeleteClick(media.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No images uploaded yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Image</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this image? This action cannot be undone and will remove all associated analytics data.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
