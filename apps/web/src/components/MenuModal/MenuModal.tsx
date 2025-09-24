"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Utensils, Cake, Pizza, Leaf } from 'lucide-react';

interface MenuItem {
  name: string;
  description: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCategories: MenuCategory[] = [
  {
    id: 'snacks',
    name: 'Snacks',
    icon: <Clock className="w-4 h-4" />,
    items: [
      {
        name: 'Chicken Tikka',
        description: 'Tender chicken marinated in spices and grilled'
      },
      {
        name: 'Vegetable Samosa',
        description: 'Crispy pastry filled with spiced vegetables'
      },
      {
        name: 'Paneer Tikka',
        description: 'Cottage cheese marinated and grilled to perfection'
      },
      {
        name: 'Chicken Wings',
        description: 'Spicy buffalo wings with ranch dip'
      },
      {
        name: 'Fish Fingers',
        description: 'Crispy fish fingers with tartar sauce'
      }
    ]
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: <Utensils className="w-4 h-4" />,
    items: [
      {
        name: 'Dal Bhat',
        description: 'Traditional Nepali rice with lentil soup and vegetables'
      },
      {
        name: 'Chicken Curry',
        description: 'Aromatic chicken curry with basmati rice'
      },
      {
        name: 'Momo',
        description: 'Steamed dumplings with meat or vegetable filling'
      },
      {
        name: 'Thakali Set',
        description: 'Complete Thakali meal with rice, dal, and vegetables'
      },
      {
        name: 'Newari Khaja',
        description: 'Traditional Newari platter with various delicacies'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: <Cake className="w-4 h-4" />,
    items: [
      {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings in rose-flavored syrup'
      },
      {
        name: 'Ras Malai',
        description: 'Cottage cheese dumplings in sweetened milk'
      },
      {
        name: 'Kheer',
        description: 'Traditional rice pudding with nuts and raisins'
      },
      {
        name: 'Ice Cream',
        description: 'Vanilla, chocolate, and strawberry flavors'
      },
      {
        name: 'Fruit Salad',
        description: 'Fresh seasonal fruits with honey dressing'
      }
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza Counter',
    icon: <Pizza className="w-4 h-4" />,
    items: [
      {
        name: 'Margherita Pizza',
        description: 'Classic tomato, mozzarella, and basil pizza'
      },
      {
        name: 'Chicken BBQ Pizza',
        description: 'BBQ chicken with red onions and cilantro'
      },
      {
        name: 'Vegetarian Supreme',
        description: 'Loaded with fresh vegetables and cheese'
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Traditional pepperoni with mozzarella cheese'
      }
    ]
  },
  {
    id: 'pani-puri',
    name: 'Pani Puri Counter',
    icon: <Leaf className="w-4 h-4" />,
    items: [
      {
        name: 'Classic Pani Puri',
        description: 'Crispy puris with spiced water and tamarind'
      },
      {
        name: 'Dahi Puri',
        description: 'Puri with yogurt, chutney, and spices'
      },
      {
        name: 'Sev Puri',
        description: 'Puri topped with sev, onions, and chutney'
      },
      {
        name: 'Bhel Puri',
        description: 'Mixed puri with puffed rice and vegetables'
      }
    ]
  }
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [activeCategory, setActiveCategory] = useState('snacks');

  const activeCategoryData = menuCategories.find(cat => cat.id === activeCategory);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Our Complete Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-orange-600 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {activeCategoryData?.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-black mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-4">
              * Menu items may vary based on event size and customization
            </p>
            <div className="flex justify-center">
              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close Menu
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
