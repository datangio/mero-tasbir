"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { apiClient } from '@/utils/api';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  address: string;
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // 1: Email, 2: Email verification, 3: User details, 4: Password, 5: Account creation
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [userType, setUserType] = useState<'user' | 'freelancer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      fullName: '',
      address: ''
    }
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    if (isSignUp) {
      if (signUpStep === 1) {
        // Step 1: Email validation and send verification
        if (data.email) {
          setIsLoading(true);
          try {
            const response = await apiClient.sendVerificationEmail(data.email);
            if (response.success) {
        setSignUpStep(2);
              toast.success('Verification email sent! Check your inbox.');
            } else {
              toast.error(response.message || 'Failed to send verification email');
            }
          } catch (error) {
            console.error('Error sending verification email:', error);
            toast.error('Failed to send verification email. Please try again.');
          } finally {
            setIsLoading(false);
          }
        }
      } else if (signUpStep === 2) {
        // Step 2: Verify email OTP
        if (verificationCode) {
          setIsLoading(true);
          try {
            const response = await apiClient.verifyOTP(data.email, verificationCode);
            if (response.success) {
              setEmailVerified(true);
          setSignUpStep(3);
              toast.success('Email verified successfully!');
            } else {
              toast.error(response.message || 'Invalid verification code');
            }
          } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify code. Please try again.');
          } finally {
            setIsLoading(false);
          }
        } else {
          toast.error('Please enter the verification code');
        }
      } else if (signUpStep === 3) {
        // Step 3: User details (username, fullname, address)
        if (data.username && data.fullName && data.address) {
          setSignUpStep(4);
        } else {
          toast.error('Please fill in all required fields');
        }
      } else if (signUpStep === 4) {
        // Step 4: Password setup
        if (data.password && data.confirmPassword) {
          if (data.password === data.confirmPassword) {
            setSignUpStep(5);
          } else {
            toast.error('Passwords do not match');
          }
        } else {
          toast.error('Please fill in both password fields');
        }
      } else if (signUpStep === 5) {
        // Step 5: Account creation
        setIsLoading(true);
        try {
          const response = await apiClient.createUserAccount({
            email: data.email,
            username: data.username,
            fullName: data.fullName,
            address: data.address,
            password: data.password,
            confirmPassword: data.confirmPassword,
            userType: userType || 'user'
          });
          
          if (response.success) {
            toast.success('Account created successfully!');
            // Store token and user data
            if (response.data?.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            // Reset form and redirect
            reset();
            setIsSignUp(false);
            setSignUpStep(1);
            setUserType(null);
            setEmailVerified(false);
            // Redirect to dashboard or home
          window.location.href = '/dashboard';
          } else {
            toast.error(response.message || 'Failed to create account');
          }
        } catch (error) {
          console.error('Error creating account:', error);
          toast.error('Failed to create account. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Handle sign in
      setIsLoading(true);
      try {
        const response = await apiClient.loginUser(data.email, data.password);
        if (response.success) {
          toast.success('Login successful!');
          // Store token and user data
          if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          // Redirect to dashboard or home
          window.location.href = '/dashboard';
        } else {
          toast.error(response.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle step progression without form validation
  const handleStepContinue = async () => {
    if (isSignUp) {
      if (signUpStep === 1) {
        const email = watch('email');
        if (email) {
          setIsLoading(true);
          try {
            const response = await apiClient.sendVerificationEmail(email);
            if (response.success) {
              setSignUpStep(2);
              toast.success('Verification email sent! Check your inbox.');
            } else {
              toast.error(response.message || 'Failed to send verification email');
            }
          } catch (error) {
            console.error('Error sending verification email:', error);
            toast.error('Failed to send verification email. Please try again.');
          } finally {
            setIsLoading(false);
          }
        } else {
          toast.error('Please enter your email address');
        }
      } else if (signUpStep === 2) {
        if (verificationCode) {
          const email = watch('email');
          setIsLoading(true);
          try {
            const response = await apiClient.verifyOTP(email, verificationCode);
            if (response.success) {
              setEmailVerified(true);
              setSignUpStep(3);
              toast.success('Email verified successfully!');
            } else {
              toast.error(response.message || 'Invalid verification code');
            }
          } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify code. Please try again.');
          } finally {
            setIsLoading(false);
          }
        } else {
          toast.error('Please enter the verification code');
        }
      } else if (signUpStep === 3) {
        const username = watch('username');
        const fullName = watch('fullName');
        const address = watch('address');
        if (username && fullName && address) {
          setSignUpStep(4);
        } else {
          toast.error('Please fill in all required fields');
        }
      } else if (signUpStep === 4) {
        const password = watch('password');
        const confirmPassword = watch('confirmPassword');
        if (password && confirmPassword) {
          if (password === confirmPassword) {
            setSignUpStep(5);
          } else {
            toast.error('Passwords do not match');
          }
        } else {
          toast.error('Please fill in both password fields');
        }
      } else if (signUpStep === 5) {
        const allData = watch();
        setIsLoading(true);
        try {
          const response = await apiClient.createUserAccount({
            email: allData.email,
            username: allData.username,
            fullName: allData.fullName,
            address: allData.address,
            password: allData.password,
            confirmPassword: allData.confirmPassword,
            userType: userType || 'user'
          });
          
          if (response.success) {
            toast.success('Account created successfully!');
            // Store token and user data
            if (response.data?.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            // Reset form and redirect
            reset();
            setIsSignUp(false);
            setSignUpStep(1);
            setUserType(null);
            setEmailVerified(false);
            // Redirect to dashboard or home
            window.location.href = '/dashboard';
          } else {
            toast.error(response.message || 'Failed to create account');
          }
        } catch (error) {
          console.error('Error creating account:', error);
          toast.error('Failed to create account. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication here
    console.log('Google authentication clicked');
  };

  const resendVerificationCode = async () => {
    const email = watch('email');
    setIsLoading(true);
    try {
      const response = await apiClient.resendOTP(email);
      if (response.success) {
        toast.success('Verification code resent! Check your inbox.');
      } else {
        toast.error(response.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Error resending verification code:', error);
      toast.error('Failed to resend verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSignUpFlow = () => {
    setSignUpStep(1);
    setVerificationCode('');
    setUserType(null);
    reset();
  };

 

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side - Image (Hidden on mobile, visible on large screens) */}
        <div className="hidden lg:flex lg:w-[40%] xl:w-[35%] relative">
          <Image
            src="/images/photography.jpg"
            alt="Professional Photography"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex flex-col py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-white overflow-y-auto">
          {/* Back to Home - Top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-2 sm:mt-4 lg:mt-6"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-xs sm:text-sm text-orange-500 hover:text-orange-600 transition-colors mb-2 sm:mb-4"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            {isSignUp ? (
              signUpStep === 1 ? 'Create Your Account' :
              signUpStep === 2 ? 'Verify Your Email' :
              'Choose Your Account Type'
            ) : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {isSignUp ? (
              signUpStep === 1 ? 'Join Mero Tasbir to access premium photography services' :
              signUpStep === 2 ? `We've sent a verification code to ${watch('email')}` :
              'Select how you want to use Mero Tasbir'
            ) : 'Sign in to your Mero Tasbir account'}
          </p>
          
          {/* Step Indicator for Sign Up */}
          {isSignUp && (
            <div className="mt-4 sm:mt-6 flex justify-center">
              <div className="flex space-x-1 sm:space-x-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      step <= signUpStep ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8"
        >
          {/* Google Sign In Button - Only show on step 1 */}
          {(!isSignUp || signUpStep === 1) && (
            <>
              <motion.button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300 mb-4 sm:mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </motion.button>

              {/* Divider */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </>
          )}

          {/* Form Content Based on Step */}
          {isSignUp && signUpStep === 1 ? (
            /* Step 1: Email Input */
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Email Address
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <motion.button
                onClick={handleStepContinue}
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                whileHover={!isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Sending...' : 'Continue'}
              </motion.button>
            </div>
          ) : isSignUp && signUpStep === 2 ? (
            /* Step 2: Email Verification */
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  Enter the 6-digit code we sent to your email address
                </p>
              </div>
              
              <div>
                <label htmlFor="verificationCode" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-center text-lg sm:text-2xl tracking-widest text-black"
                  placeholder="123456"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendVerificationCode}
                  disabled={isLoading}
                  className={`text-xs sm:text-sm ${
                    isLoading 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-orange-500 hover:text-orange-600'
                  }`}
                >
                  {isLoading ? 'Resending...' : "Didn't receive the code? Resend"}
                </button>
              </div>

              <motion.button
                onClick={handleStepContinue}
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                whileHover={!isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </motion.button>
            </div>
          ) : isSignUp && signUpStep === 3 ? (
            /* Step 3: User Details (Username, Full Name, Address) */
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  Tell us a bit about yourself
                </p>
              </div>

              <div>
                <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Username
                </label>
                <input
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters' }
                  })}
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black"
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Full Name
                </label>
                <input
                  {...register('fullName', { 
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Full name must be at least 2 characters' }
                  })}
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Address
                </label>
                <textarea
                  {...register('address', { 
                    required: 'Address is required',
                    minLength: { value: 10, message: 'Please provide a complete address' }
                  })}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black resize-none"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <motion.button
                onClick={handleStepContinue}
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                whileHover={!isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </motion.button>
            </div>
          ) : isSignUp && signUpStep === 4 ? (
            /* Step 4: Password Setup */
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  Create a secure password for your account
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Password
                </label>
                <input
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                  })}
                  type="password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type="password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-black"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <motion.button
                onClick={handleStepContinue}
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                whileHover={!isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </motion.button>
            </div>
          ) : isSignUp && signUpStep === 5 ? (
            /* User Type Selection Step */
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  Almost done! Choose how you&apos;ll use Mero Tasbir
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <motion.button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`w-full p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl text-left transition-all ${
                    userType === 'user' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 mr-2 sm:mr-3 ${
                      userType === 'user' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}>
                      {userType === 'user' && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-black">I&apos;m looking for photography services</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Book photographers, buy images, and access premium content</p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setUserType('freelancer')}
                  className={`w-full p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl text-left transition-all ${
                    userType === 'freelancer' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 mr-2 sm:mr-3 ${
                      userType === 'freelancer' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}>
                      {userType === 'freelancer' && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-black">I&apos;m a photographer/videographer</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Sell your work, find clients, and grow your business</p>
                    </div>
                  </div>
                </motion.button>
              </div>

              <motion.button
                onClick={handleStepContinue}
                disabled={!userType || isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                  !userType || isLoading
                    ? 'text-gray-400 bg-gray-200 cursor-not-allowed' 
                    : 'text-white bg-orange-500 hover:bg-orange-600 shadow-lg'
                }`}
                whileHover={userType && !isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={userType && !isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </div>
          ) : (
            /* Basic Form (Step 1 for Sign Up or Sign In) */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { 
                      required: isSignUp ? 'Full name is required' : false,
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                      errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                  )}
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                    errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                    errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', { 
                      required: isSignUp ? 'Please confirm your password' : false,
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </motion.div>
              )}

              {!isSignUp && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-xs sm:text-sm text-orange-500 hover:text-orange-600">
                    Forgot password?
                  </Link>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                whileHover={!isLoading ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading 
                  ? (isSignUp ? 'Sending...' : 'Signing In...') 
                  : (isSignUp ? 'Continue' : 'Sign In')
                }
              </motion.button>
            </form>
          )}

          {/* Toggle Auth Mode */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  if (isSignUp) {
                    resetSignUpFlow();
                  }
                }}
                className="ml-1 text-orange-500 hover:text-orange-600 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
