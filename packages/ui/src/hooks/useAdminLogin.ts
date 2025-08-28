"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  adminLoginSchema,
  type AdminLoginData,
  type AdminLoginResponse,
  type AdminLoginError,
} from "../schemas/adminSchemas";

interface UseAdminLoginReturn {
  form: ReturnType<typeof useForm<AdminLoginData>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: AdminLoginResponse | null;
}

export const useAdminLogin = (
  apiBaseUrl = "http://localhost:5000"
): UseAdminLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<AdminLoginResponse | null>(null);

  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Show loading toast
    const loadingToast = toast.loading("Signing in...");

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorData = result as AdminLoginError;

        // Handle validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach(err => {
            form.setError(err.field as keyof AdminLoginData, {
              type: "server",
              message: err.message,
            });
          });
          toast.error("Please fix the validation errors", { id: loadingToast });
          setError("Please fix the validation errors");
        } else {
          toast.error(errorData.message || "Login failed", {
            id: loadingToast,
          });
          setError(errorData.message || "Login failed");
        }
        return;
      }

      const successData = result as AdminLoginResponse;
      setSuccess(successData);

      // Store token in localStorage (you might want to use a more secure approach)
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", successData.token);
        localStorage.setItem("admin_user", JSON.stringify(successData.admin));
      }

      // Show success toast
      toast.success(`Welcome back, ${successData.admin.name}!`, {
        id: loadingToast,
      });

      // Reset form on success
      form.reset();
    } catch {
      toast.error("Network error. Please try again.", { id: loadingToast });
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
    success,
  };
};
