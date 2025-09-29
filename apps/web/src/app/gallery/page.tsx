"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, DollarSign, Tag, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  price: number;
  likes: number;
  views: number;
  sales: number;
  tags: string[];
  uploadedBy?: string;
  createdAt: string;
}

export default function GalleryPage() {
  const { user, token } = useAuth();
  const { data: session } = useSession();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

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

  const categories = ['All', 'Portrait', 'Wedding', 'Event', 'Nature', 'Architecture', 'Street', 'Fashion', 'Sports', 'Food', 'Travel', 'Other'];

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/media', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMedia(data.data || []);
      } else {
        toast.error('Failed to fetch media');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Error fetching media');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (mediaId: string) => {
    if (!currentToken) {
      toast.error('Please log in to like images');
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

      const response = await fetch(`http://localhost:5000/api/v1/analytics/media/${mediaId}/like`, {
        method: 'POST',
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data.liked) {
          setLikedItems(prev => new Set([...prev, mediaId]));
        } else {
          setLikedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(mediaId);
            return newSet;
          });
        }
        
        // Update local state
        setMedia(prev => prev.map(item => 
          item.id === mediaId 
            ? { ...item, likes: data.data.likes }
            : item
        ));
        
        toast.success(data.message);
      } else {
        toast.error('Failed to like image');
      }
    } catch (error) {
      console.error('Error liking image:', error);
      toast.error('Error liking image');
    }
  };

  const handlePurchase = async (item: MediaItem) => {
    if (!currentToken) {
      toast.error('Please log in to purchase images');
      return;
    }

    const buyerEmail = prompt('Enter your email for purchase confirmation:');
    if (!buyerEmail) return;

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      };
      
      // Add user email header for NextAuth users
      if (session?.user?.email) {
        headers['x-user-email'] = session.user.email;
      }

      const response = await fetch(`http://localhost:5000/api/v1/analytics/media/${item.id}/purchase`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          buyerEmail,
          buyerName: currentUser?.fullName || currentUser?.username,
        }),
      });

      if (response.ok) {
        toast.success(`Successfully purchased "${item.title}" for NPR ${item.price.toLocaleString()}`);
        // Update local state
        setMedia(prev => prev.map(mediaItem => 
          mediaItem.id === item.id 
            ? { ...mediaItem, sales: mediaItem.sales + 1 }
            : mediaItem
        ));
      } else {
        toast.error('Failed to purchase image');
      }
    } catch (error) {
      console.error('Error purchasing image:', error);
      toast.error('Error purchasing image');
    }
  };

  const filteredMedia = selectedCategory === 'All' 
    ? media 
    : media.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Image Gallery</h1>
            <p className="text-gray-600 mb-6">Discover and purchase amazing photography</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Tag className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedItems.has(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  {item.price > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      NPR {item.price.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  )}
                  
                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {item.views}
                      </div>
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {item.sales}
                      </div>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  {item.price > 0 && (
                    <button
                      onClick={() => handlePurchase(item)}
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Purchase
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
