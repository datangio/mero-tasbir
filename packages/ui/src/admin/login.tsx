"use client";
import { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAdminLogin } from "../hooks/useAdminLogin";

export const AdminLogin = () => {
  const { form, onSubmit, isLoading, success } = useAdminLogin();
  const {
    register,
    formState: { errors },
  } = form;

  // Handle successful login - redirect to dashboard immediately
  useEffect(() => {
    if (success) {
      // Redirect to dashboard immediately after successful login
      window.location.href = '/dashboard';
    }
  }, [success]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7ff]">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#6366F1",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="min-w-sm w-full max-w-md rounded-lg bg-white p-12 shadow-md">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
          <h4 className="text-gray-600">Please log in to continue</h4>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email/Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email")}
                type="email"
                id="email"
                disabled={isLoading}
                className={`sm:text-md block w-full rounded-md border pl-12 pr-6 py-3 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                } ${isLoading ? "cursor-not-allowed bg-gray-50" : ""}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>


          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password")}
                type="password"
                id="password"
                disabled={isLoading}
                className={`sm:text-md block w-full rounded-md border pl-12 pr-6 py-3 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                } ${isLoading ? "cursor-not-allowed bg-gray-50" : ""}`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex justify-end">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Forgot password?
            </a>
          </div>

          <div className="mb-6">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 h-4 w-4 rounded-md border-gray-300"
            />
            <label htmlFor="remember" className="text-sm text-gray-500">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md px-4 py-3 font-semibold text-lg transition-all duration-200 shadow-md ${
              isLoading
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:scale-[1.02]"
            }`}
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              minHeight: '52px',
              border: 'none',
              outline: 'none'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                Signing in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
