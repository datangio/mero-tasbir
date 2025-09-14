"use client";

import React, { useState } from 'react';
import { ChevronDown, Star, MapPin, Tag, Calendar, User, Phone, Mail, MessageSquare, Camera, Eye } from 'lucide-react';


import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Wedding(){
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    phone: '',
    email: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const faqData = [
    {
      q: 'What is the minimum wedding budget that the customer should have to avail your services? (Typically includes budget for: Venue, food, accommodation, catering & décor)',
      a: 'Rs 10,00,000'
    },
    {
      q: 'Are you ready to host/provide service to events during COVID19, following the government guidelines?',
      a: 'Yes, with special deals'
    },
    {
      q: 'In or near which all locations do you provide planning services? (Typically includes locations where at least 3 events per location were organised)',
      a: 'Jaipur, Jodhpur, Udaipur, Mumbai, Goa, Uttarakhand (Mussourie/ Nainital), Pune/ Lonavala, Himachal (Shimla/ Manali), Vietnam, Thailand, Dubai/ UAE'
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // In a real app, you would send this to a backend.
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6 text-gray-700">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">What should you know about Ummang Events</h3>
              <p className="text-sm">Ummang Events is a leading wedding planning company in Bicholim (North Goa). With its wealth of expertise in orchestrating dream weddings and crafting exceptional events, Ummang Events has a knack for every detail, ensuring a truly extraordinary occasion. Renowned for its meticulous attention to detail, Ummang Events boasts a dedicated team of passionate and skilled professionals who strive to transform every preconceived notion of your big day into a captivating occasion, even with budgetary constraints. From the selection of the perfect venue to the harmonious infusion of music, Ummang Events offers a comprehensive suite of services aimed at transforming your entry into a timeless celebration that resonates with splendour and beauty.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">How Ummang Events stand out as a wedding planner</h3>
              <p className="text-sm">Ummang Events stands out as your comprehensive solution for modern and efficient event planning. From initial budgeting to venue selection, including destination weddings, and from conceptualizing décor themes to handling invitation printing and distribution, we take care of all the tiny details so you can focus on the bigger picture. Our dedicated team works closely with you to understand your needs and preferences, ensuring a seamless experience. Our services include venue selection, catering, décor, entertainment, photography, and more. Let us help you create an unforgettable celebration that reflects your unique style and personality.
              </p>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-xl text-gray-800">Frequently asked questions</h3>
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-700">{item.q}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        );
      case 'reviews':
        return <div className="p-4 text-center text-gray-500">Reviews content goes here.</div>;
      case 'promotions':
        return <div className="p-4 text-center text-gray-500">Promotions content goes here.</div>;
      case 'meet-the-team':
        return <div className="p-4 text-center text-gray-500">Meet the team content goes here.</div>;
      case 'map':
        return <div className="p-4 text-center text-gray-500">Map content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
          <Navbar />
      <section className="px-4 py-16 sm:px-6 lg:px-8">        
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Left Column: Image Gallery & Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
                  {/* Using a standard img tag since next/image is not available */}
                  <img src="https://placehold.co/800x600/F06292/FFFFFF?text=Wedding+Photo+1" alt="Wedding Photo 1" className="col-span-2 row-span-2 object-cover w-full h-full rounded-2xl"/>
                  <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                    <button className="bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full text-sm font-medium">
                      <MessageSquare size={20} />
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full text-sm font-medium">
                      <Camera size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-3 gap-2">
                <img src="https://placehold.co/400x300/F06292/FFFFFF?text=Photo+1" alt="Photo 1" className="h-28 w-full object-cover rounded-xl" />
                <img src="https://placehold.co/400x300/F06292/FFFFFF?text=Photo+2" alt="Photo 2" className="h-28 w-full object-cover rounded-xl" />
                <div className="relative">
                  <img src="https://placehold.co/400x300/F06292/FFFFFF?text=Photo+3" alt="Photo 3" className="h-28 w-full object-cover rounded-xl" />
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col justify-center items-center text-white text-xs font-semibold">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full">
                      <Eye size={16} />
                      <span>View videos</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 text-sm md:text-base overflow-x-auto whitespace-nowrap">
                {['about', 'faq', 'reviews', 'promotions', 'meet-the-team', 'map'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 border-b-2 font-medium capitalize transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-orange-600 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <div className="p-4">
                {renderContent()}
              </div>

              {/* Have any questions */}
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <MessageSquare size={20} className="text-orange-500" />
                  <span className="font-semibold text-gray-800">Do you have any questions?</span>
                </div>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-orange-700 transition-colors">Request pricing</button>
              </div>
            </div>

            {/* Right Column: Pricing & Contact Form */}
            <div className="md:col-span-1 p-6 bg-gray-50 rounded-2xl shadow-inner space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Ummang Events</h2>
              <div className="flex items-center space-x-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-semibold text-gray-700">5.0 Fantastic</span>
                <span className="text-sm text-gray-500">2 reviews</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Old Goa, North Goa</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Tag className="w-4 h-4" />
                <span className="text-sm">1 promotion, 10% discount</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Planning fee</span>
                <span className="font-bold text-lg text-gray-900">Rs. 20,000</span>
              </div>

              <button className="w-full bg-orange-600 text-white font-medium py-3 rounded-full text-lg shadow-md hover:bg-orange-700 transition-colors">Request pricing</button>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <ChevronDown className="w-4 h-4" />
                <span>Popular in your area</span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Plan your event</h3>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="flex items-start text-xs text-gray-500 space-x-2">
                  <input type="checkbox" className="mt-1" required />
                  <span>By clicking "Send request", you agree to sign up and accept WeddingWire's <a href="#" className="underline text-orange-600">Terms of Use</a></span>
                </div>
                
                <button type="submit" className="w-full bg-orange-600 text-white font-medium py-3 rounded-full text-lg shadow-md hover:bg-orange-700 transition-colors">Send</button>
              </form>
              <button className="w-full border-2 border-orange-600 text-orange-600 font-medium py-3 rounded-full text-lg hover:bg-orange-50 transition-colors">Write a review</button>
            </div>
          </div>
        </div>

        
      </section>

      {showConfirmation && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          Request sent successfully!
        </div>
      )}

      {/* Footer */}
          <Footer />
    </div>
  );
};
