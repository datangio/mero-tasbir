"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart
  } = useCart();

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-orange-500 p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-orange-600 rounded-full transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">Your cart is empty</h3>
                  <p className="text-black mb-6">Add some courses or services to get started!</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        {/* Item Image */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-black truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-black">
                            {item.type === 'course' && item.instructor && `by ${item.instructor}`}
                            {item.type === 'course' && item.duration && ` • ${item.duration}`}
                            {item.type === 'course' && item.level && ` • ${item.level}`}
                            {item.shift && ` • ${item.shift}`}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-lg font-bold text-black">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-black line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-black" />
                          </button>
                          <span className="w-8 text-center font-semibold text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-black" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold text-black">Total:</span>
                      <span className="text-2xl font-bold text-black">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={clearCart}
                        className="flex-1 px-4 py-3 text-black border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Clear Cart
                      </button>
                      <button
                        onClick={() => {
                          // Handle checkout logic here
                          console.log('Proceeding to checkout...');
                          alert('Checkout functionality will be implemented!');
                        }}
                        className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;








