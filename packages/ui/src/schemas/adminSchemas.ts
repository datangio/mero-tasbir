import { z } from "zod";

/**
 * Admin login validation schema
 * Matches the backend API validation
 */
export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .transform(email => email.toLowerCase().trim()),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

/**
 * Admin login API response types
 */
export interface AdminLoginResponse {
  message: string;
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface AdminLoginError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
