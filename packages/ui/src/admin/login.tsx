"use client";
import { Toaster } from "react-hot-toast";
import { useAdminLogin } from "../hooks/useAdminLogin";

export const AdminLogin = () => {
  const { form, onSubmit, isLoading, success } = useAdminLogin();
  const {
    register,
    formState: { errors },
  } = form;

  // Handle successful login
  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7ff]">
        <div className="min-w-sm w-full max-w-md rounded-lg bg-white p-12 text-center shadow-md">
          <div className="mb-4 text-green-600">
            <svg
              className="mx-auto h-16 w-16"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Login Successful!
          </h2>
          <p className="mb-4 text-gray-600">
            Welcome back, {success.admin.name}
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

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
            <input
              {...register("email")}
              type="email"
              id="email"
              disabled={isLoading}
              className={`sm:text-md mt-1 block w-full rounded-md border px-6 py-3 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } ${isLoading ? "cursor-not-allowed bg-gray-50" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex justify-end">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Forgot password?
            </a>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              disabled={isLoading}
              className={`sm:text-md mt-1 block w-full rounded-md border px-6 py-3 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
                errors.password
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } ${isLoading ? "cursor-not-allowed bg-gray-50" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
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
            className={`w-full rounded-md px-4 py-3 font-medium transition-colors ${
              isLoading
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
