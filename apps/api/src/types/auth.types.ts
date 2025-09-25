export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  address: string;
  userType: 'user' | 'freelancer';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailVerification {
  id: string;
  email: string;
  otp: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    expiresIn?: number;
  };
  error?: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    expiresIn: number;
  };
  error?: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    isVerified: boolean;
  };
  error?: string;
}






