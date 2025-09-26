import { Request, Response } from 'express';
import { 
  sendVerificationEmail, 
  verifyOTP, 
  createUserAccount, 
  loginUser, 
  resendOTP,
  forgotPassword,
  resetPassword
} from '../services/auth.service';
import { 
  emailVerificationSchema, 
  otpVerificationSchema, 
  userRegistrationSchema, 
  loginSchema,
  resendOtpSchema 
} from '../schemas/auth.schemas';
import asyncHandler from '../utils/asyncHandler';

// Send verification email
export const sendVerificationEmailController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = emailVerificationSchema.parse(req.body);
  const result = await sendVerificationEmail(validatedData);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Verify OTP
export const verifyOTPController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = otpVerificationSchema.parse(req.body);
  const result = await verifyOTP(validatedData);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Create user account
export const createUserAccountController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = userRegistrationSchema.parse(req.body);
  const result = await createUserAccount(validatedData);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

// User login
export const loginUserController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const result = await loginUser(validatedData);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

// Resend OTP
export const resendOTPController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = resendOtpSchema.parse(req.body);
  const result = await resendOTP(validatedData);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Forgot Password
export const forgotPasswordController = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400).json({
      success: false,
      message: 'Email is required',
      error: 'Validation error'
    });
    return;
  }
  
  const result = await forgotPassword({ email });
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Reset Password
export const resetPasswordController = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    res.status(400).json({
      success: false,
      message: 'Token and new password are required',
      error: 'Validation error'
    });
    return;
  }
  
  if (newPassword.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
      error: 'Validation error'
    });
    return;
  }
  
  const result = await resetPassword({ token, newPassword });
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

