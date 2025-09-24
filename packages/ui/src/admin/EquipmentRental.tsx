"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Utensils, 
  ChefHat, 
  Square, 
  Music, 
  Sparkles, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Loader2
} from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  isAvailable: boolean;
}

interface EquipmentCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: EquipmentItem[];
}

const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    id: "tableware",
    name: "Tableware & Cutlery",
    icon: <Utensils className="w-8 h-8 text-orange-600" />,
    items: [
      {
        id: "1",
        name: "Premium Dinner Plates",
        description: "Elegant ceramic dinner plates",
        price: 200,
        unit: "plate",
        category: "tableware",
        isAvailable: true
      },
      {
        id: "2",
        name: "Silver Cutlery Set",
        description: "Complete knife, fork, and spoon set",
        price: 150,
        unit: "set",
        category: "tableware",
        isAvailable: true
      },
      {
        id: "3",
        name: "Crystal Glassware",
        description: "High-quality drinking glasses",
        price: 100,
        unit: "glass",
        category: "tableware",
        isAvailable: true
      },
      {
        id: "4",
        name: "Table Napkins",
        description: "Linen napkins in various colors",
        price: 50,
        unit: "piece",
        category: "tableware",
        isAvailable: true
      }
    ]
  },
  {
    id: "serving",
    name: "Serving Equipment",
    icon: <Utensils className="w-8 h-8 text-blue-600" />,
    items: [
      {
        id: "5",
        name: "Chafing Dishes",
        description: "Keep food warm during service",
        price: 1500,
        unit: "unit",
        category: "serving",
        isAvailable: true
      },
      {
        id: "6",
        name: "Serving Platters",
        description: "Large decorative serving dishes",
        price: 800,
        unit: "platter",
        category: "serving",
        isAvailable: true
      },
      {
        id: "7",
        name: "Serving Spoons & Tongs",
        description: "Professional serving utensils",
        price: 200,
        unit: "set",
        category: "serving",
        isAvailable: true
      },
      {
        id: "8",
        name: "Beverage Dispensers",
        description: "Self-serve drink stations",
        price: 1200,
        unit: "unit",
        category: "serving",
        isAvailable: true
      }
    ]
  },
  {
    id: "tables",
    name: "Table Setup",
    icon: <Square className="w-8 h-8 text-green-600" />,
    items: [
      {
        id: "9",
        name: "Round Tables (8-seater)",
        description: "Elegant round dining tables",
        price: 2500,
        unit: "table",
        category: "tables",
        isAvailable: true
      },
      {
        id: "10",
        name: "Chairs",
        description: "Comfortable dining chairs",
        price: 300,
        unit: "chair",
        category: "tables",
        isAvailable: true
      },
      {
        id: "11",
        name: "Table Linens",
        description: "Premium tablecloths and runners",
        price: 800,
        unit: "table",
        category: "tables",
        isAvailable: true
      },
      {
        id: "12",
        name: "Centerpieces",
        description: "Decorative table centerpieces",
        price: 1500,
        unit: "piece",
        category: "tables",
        isAvailable: true
      }
    ]
  },
  {
    id: "kitchen",
    name: "Kitchen Equipment",
    icon: <ChefHat className="w-8 h-8 text-red-600" />,
    items: [
      {
        id: "13",
        name: "Commercial Stoves",
        description: "Professional cooking equipment",
        price: 5000,
        unit: "day",
        category: "kitchen",
        isAvailable: true
      },
      {
        id: "14",
        name: "Refrigeration Units",
        description: "Food storage and cooling",
        price: 4000,
        unit: "day",
        category: "kitchen",
        isAvailable: true
      },
      {
        id: "15",
        name: "Food Processors",
        description: "Preparation equipment",
        price: 2000,
        unit: "day",
        category: "kitchen",
        isAvailable: true
      },
      {
        id: "16",
        name: "Coffee Machines",
        description: "Professional coffee service",
        price: 3000,
        unit: "day",
        category: "kitchen",
        isAvailable: true
      }
    ]
  },
  {
    id: "audio",
    name: "Audio & Lighting",
    icon: <Music className="w-8 h-8 text-purple-600" />,
    items: [
      {
        id: "17",
        name: "Sound System",
        description: "Complete PA system with microphones",
        price: 8000,
        unit: "day",
        category: "audio",
        isAvailable: true
      },
      {
        id: "18",
        name: "LED Lighting",
        description: "Ambient and decorative lighting",
        price: 6000,
        unit: "day",
        category: "audio",
        isAvailable: true
      },
      {
        id: "19",
        name: "Spotlights",
        description: "Stage and area lighting",
        price: 4000,
        unit: "day",
        category: "audio",
        isAvailable: true
      },
      {
        id: "20",
        name: "DJ Equipment",
        description: "Complete DJ setup",
        price: 10000,
        unit: "day",
        category: "audio",
        isAvailable: true
      }
    ]
  },
  {
    id: "specialty",
    name: "Specialty Items",
    icon: <Sparkles className="w-8 h-8 text-yellow-600" />,
    items: [
      {
        id: "21",
        name: "Photo Booth",
        description: "Complete photo booth setup",
        price: 15000,
        unit: "day",
        category: "specialty",
        isAvailable: true
      },
      {
        id: "22",
        name: "Backdrop & Props",
        description: "Decorative backgrounds",
        price: 5000,
        unit: "day",
        category: "specialty",
        isAvailable: true
      },
      {
        id: "23",
        name: "Tent & Canopy",
        description: "Outdoor event coverage",
        price: 8000,
        unit: "day",
        category: "specialty",
        isAvailable: true
      },
      {
        id: "24",
        name: "Generator",
        description: "Power supply for outdoor events",
        price: 6000,
        unit: "day",
        category: "specialty",
        isAvailable: true
      }
    ]
  }
];

export const EquipmentRental: React.FC = () => {
  const [equipmentCategories, setEquipmentCategories] = useState<EquipmentCategory[]>(EQUIPMENT_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<EquipmentCategory | null>(null);

  const filteredCategories = equipmentCategories.filter(category => {
    const matchesCategory = categoryFilter === "all" || category.id === categoryFilter;
    const matchesSearch = category.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setShowAddForm(true);
  };

  const handleEditItem = (item: EquipmentItem) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setEquipmentCategories(prev => 
        prev.map(category => ({
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        }))
      );
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: EquipmentCategory) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category and all its items?")) {
      setEquipmentCategories(prev => 
        prev.filter(category => category.id !== categoryId)
      );
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Equipment Rental</h1>
            <p className="text-black mt-1">Manage equipment rental pricing and availability</p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              onClick={handleAddCategory}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-5 w-5" />
              <span>Add Category</span>
            </motion.button>
            <motion.button
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-5 w-5" />
              <span>Add Equipment</span>
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {equipmentCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-black">
                {equipmentCategories.reduce((total, category) => total + category.items.length, 0)} items
              </span>
            </div>
          </div>
        </div>

        {/* Equipment Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-black">{category.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-black text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-green-600">
                          {formatPrice(item.price)}/{item.unit}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <motion.button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Equipment Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Equipment' : 'Add New Equipment'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={editingItem?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Equipment name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Description</label>
                  <textarea
                    defaultValue={editingItem?.description || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="Equipment description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Price (NPR)</label>
                    <input
                      type="number"
                      defaultValue={editingItem?.price || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Unit</label>
                    <select
                      defaultValue={editingItem?.unit || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="piece">Piece</option>
                      <option value="set">Set</option>
                      <option value="day">Day</option>
                      <option value="unit">Unit</option>
                      <option value="table">Table</option>
                      <option value="chair">Chair</option>
                      <option value="glass">Glass</option>
                      <option value="plate">Plate</option>
                      <option value="platter">Platter</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Category</label>
                  <select
                    defaultValue={editingItem?.category || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {equipmentCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Add'} Equipment
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add/Edit Category Modal */}
        {showCategoryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Category Name</label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Category ID</label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.id || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="category-id (lowercase, no spaces)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Icon Color</label>
                  <select
                    defaultValue="blue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="orange">Orange</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCategoryForm(false)}
                  className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCategoryForm(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
  );
};



