import { z } from 'zod';

// Email verification schema
export const emailVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// OTP verification schema
export const otpVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// User registration schema
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  address: z.string().min(10, 'Please provide a complete address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  userType: z.enum(['user', 'freelancer']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Resend OTP schema
export const resendOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Type exports
export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;
export type OtpVerificationInput = z.infer<typeof otpVerificationSchema>;
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResendOtpInput = z.infer<typeof resendOtpSchema>;



