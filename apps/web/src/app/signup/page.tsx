"use client";

import { useState } from "react";
import Image from "next/image";

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side: Geometric Art (Hidden on mobile) */}
      <div className="hidden items-center justify-center p-8 lg:flex lg:w-1/2">
        <div className="relative h-64 w-64">
          <Image
            src="/images/MeroTasbir-logo.png"
            alt="Logo"
            width={256}
            height={256}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="mb-2 text-2xl font-semibold text-orange-500">
            Create an account
          </h1>
          <p className="mb-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-orange-500 hover:underline"
            >
              Log in
            </a>
          </p>

          {/* Form */}
          <form className="space-y-4 text-gray-800">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {passwordVisible ? (
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      )}
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 6.943 5.523 3 10 3s8.268 3.943 9.542 7c-1.274 3.057-5.064 7-9.542 7S1.732 13.057.458 10zM14 10a2 2 0 11-4 0 2 2 0 014 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm text-gray-700"
                >
                  Confirm your password
                </label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                    aria-label={
                      confirmPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {confirmPasswordVisible ? (
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      )}
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 6.943 5.523 3 10 3s8.268 3.943 9.542 7c-1.274 3.057-5.064 7-9.542 7S1.732 13.057.458 10zM14 10a2 2 0 11-4 0 2 2 0 014 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <p className="mt-1 text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>

            {/* Terms & Privacy */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                By creating an account, I agree to our{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white shadow-sm transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70"
            >
              Create an account
            </button>

            {/* OR Separator */}
            <div className="my-4 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-sm text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <path d="M42.428 2c.234 3.388-.871 6.116-2.501 8.117-2.398 2.943-5.932 4.315-8.016 3.907-.392-2.351.58-5.352 2.557-7.771C36.33 3.975 39.083 2.214 42.428 2zM32.359 17.045c2.378 0 4.953-2.41 9.193-2.41 1.911 0 7.388.578 10.408 5.222-1.2.869-5.632 3.659-5.632 10.008 0 7.481 6.059 10.07 6.978 10.544-.331 1.236-1.929 5.523-4.623 8.88-.834 1.039-3.339 5.027-7.079 5.027-3.397 0-4.689-2.102-8.608-2.102-4.464 0-4.678 2.14-9.02 2.14-.912 0-2.25-.412-3.31-1.345-3.765-3.315-9.973-11.883-9.973-22.569 0-10.559 7.003-15.628 13.144-15.628C27.699 14.811 29.902 17.045 32.359 17.045z"></path>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
