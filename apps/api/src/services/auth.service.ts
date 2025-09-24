import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';
import { 
  EmailVerificationInput, 
  OtpVerificationInput, 
  UserRegistrationInput, 
  LoginInput,
  ResendOtpInput 
} from '../schemas/auth.schemas';
import { 
  AuthResponse, 
  OtpResponse, 
  VerificationResponse, 
  User 
} from '../types/auth.types';
import { sendVerificationEmail as sendEmail, sendWelcomeEmail } from '../utils/emailService';

const prisma = new PrismaClient();

// In-memory storage for testing
const otpStorage = new Map<string, { otp: string; expiresAt: Date; isUsed: boolean }>();
const users = new Map<string, any>();

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send verification email
export const sendVerificationEmail = async (data: EmailVerificationInput): Promise<OtpResponse> => {
  try {
    const { email } = data;
    
    // Check if user already exists
    if (users.has(email)) {
      return {
        success: false,
        message: 'User already exists with this email',
        error: 'USER_EXISTS'
      };
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    // Store OTP in memory
    otpStorage.set(email, { otp, expiresAt, isUsed: false });
    
    // Send email
    const emailSent = await sendEmail(email, otp);
    
    if (!emailSent) {
      return {
        success: false,
        message: 'Failed to send verification email',
        error: 'Email service unavailable'
      };
    }
    
    return {
      success: true,
      message: 'Verification email sent successfully',
      data: {
        email,
        expiresIn: 600 // 10 minutes in seconds
      }
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      message: 'Failed to send verification email',
      error: 'Internal server error'
    };
  }
};

// Verify OTP
export const verifyOTP = async (data: OtpVerificationInput): Promise<VerificationResponse> => {
  try {
    const { email, otp } = data;
    
    // Find verification record in memory
    const verification = otpStorage.get(email);
    
    if (!verification || verification.otp !== otp || verification.isUsed || verification.expiresAt < new Date()) {
      return {
        success: false,
        message: 'Invalid or expired OTP',
        error: 'OTP verification failed'
      };
    }
    
    // Mark OTP as used
    verification.isUsed = true;
    otpStorage.set(email, verification);
    
    return {
      success: true,
      message: 'Email verified successfully',
      data: {
        email,
        isVerified: true
      }
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: 'Failed to verify OTP',
      error: 'Internal server error'
    };
  }
};

// Create user account
export const createUserAccount = async (data: UserRegistrationInput): Promise<AuthResponse> => {
  try {
    const { email, username, fullName, address, password, userType } = data;
    
    // Check if user already exists
    if (users.has(email)) {
      return {
        success: false,
        message: 'User already exists with this email or username',
        error: 'User already exists'
      };
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user in memory
    const user = {
      id: `user_${Date.now()}`,
      email,
      username,
      fullName,
      address,
      password: hashedPassword,
      userType,
      isEmailVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.set(email, user);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        userType: user.userType 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    // Send welcome email (don't wait for it to complete)
    sendWelcomeEmail(user.email, user.fullName).catch(error => {
      console.error('Failed to send welcome email:', error);
    });
    
    return {
      success: true,
      message: 'Account created successfully',
      data: {
        user,
        token,
        expiresIn: 7 * 24 * 60 * 60 // 7 days in seconds
      }
    };
  } catch (error) {
    console.error('Error creating user account:', error);
    return {
      success: false,
      message: 'Failed to create account',
      error: 'Internal server error'
    };
  }
};

// User login
export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  try {
    const { email, password } = data;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
        error: 'Authentication failed'
      };
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        error: 'Authentication failed'
      };
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        userType: user.userType 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          ...userWithoutPassword,
          userType: userWithoutPassword.userType as 'user' | 'freelancer',
        },
        token,
        expiresIn: 7 * 24 * 60 * 60 // 7 days in seconds
      }
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    return {
      success: false,
      message: 'Login failed',
      error: 'Internal server error'
    };
  }
};

// Resend OTP
export const resendOTP = async (data: ResendOtpInput): Promise<OtpResponse> => {
  try {
    const { email } = data;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (user) {
      return {
        success: false,
        message: 'User already exists with this email',
        error: 'User already exists'
      };
    }
    
    // Send new verification email
    return await sendVerificationEmail({ email });
  } catch (error) {
    console.error('Error resending OTP:', error);
    return {
      success: false,
      message: 'Failed to resend OTP',
      error: 'Internal server error'
    };
  }
};
