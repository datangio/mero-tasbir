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
import { sendVerificationEmail as sendEmail, sendWelcomeEmail, sendResetPasswordEmail } from '../utils/emailService';

const prisma = new PrismaClient();

// Database storage - using Prisma

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send verification email
export const sendVerificationEmail = async (data: EmailVerificationInput): Promise<OtpResponse> => {
  try {
    const { email } = data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists with this email',
        error: 'USER_EXISTS'
      };
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    // Store OTP in database
    await prisma.emailVerification.create({
      data: {
        email,
        otp,
        expiresAt,
        isUsed: false
      }
    });
    
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
    
    // Find verification record in database
    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        otp,
        isUsed: false,
        expiresAt: {
          gt: new Date()
        }
      }
    });
    
    if (!verification) {
      return {
        success: false,
        message: 'Invalid or expired OTP',
        error: 'OTP verification failed'
      };
    }
    
    // Mark OTP as used
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { isUsed: true }
    });
    
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
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists with this email or username',
        error: 'User already exists'
      };
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        username,
        fullName,
        address,
        password: hashedPassword,
        userType,
        isEmailVerified: true,
        isActive: true
      }
    });
    
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
        user: {
          ...user,
          userType: user.userType as 'user' | 'freelancer'
        },
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
    
    // Find user in database
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
          userType: userWithoutPassword.userType as 'user' | 'freelancer'
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
    
    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
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

// Forgot Password
export const forgotPassword = async (data: { email: string }): Promise<OtpResponse> => {
  try {
    const { email } = data;
    
    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!existingUser) {
      return {
        success: false,
        message: 'No account found with this email address',
        error: 'User not found'
      };
    }
    
    // Generate reset token
    const resetToken = jwt.sign(
      { 
        userId: existingUser.id, 
        email: existingUser.email,
        type: 'password_reset'
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    
    // Store reset token in database
    await prisma.emailVerification.create({
      data: {
        email,
        otp: resetToken, // Using otp field to store reset token
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        isUsed: false
      }
    });
    
    // Send reset password email
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    const emailSent = await sendResetPasswordEmail(email, resetLink, existingUser.fullName);
    
    if (!emailSent) {
      return {
        success: false,
        message: 'Failed to send reset password email',
        error: 'Email service unavailable'
      };
    }
    
    return {
      success: true,
      message: 'Password reset email sent successfully',
      data: {
        email,
        expiresIn: 3600 // 1 hour in seconds
      }
    };
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    return {
      success: false,
      message: 'Failed to send reset password email',
      error: 'Internal server error'
    };
  }
};

// Reset Password
export const resetPassword = async (data: { token: string; newPassword: string }): Promise<AuthResponse> => {
  try {
    const { token, newPassword } = data;
    
    // Verify reset token
    const verification = await prisma.emailVerification.findFirst({
      where: {
        otp: token,
        isUsed: false,
        expiresAt: {
          gt: new Date()
        }
      }
    });
    
    if (!verification) {
      return {
        success: false,
        message: 'Invalid or expired reset token',
        error: 'Token verification failed'
      };
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: verification.email }
    });
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        error: 'User not found'
      };
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });
    
    // Mark token as used
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { isUsed: true }
    });
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      message: 'Password reset successfully',
      data: {
        user: {
          ...userWithoutPassword,
          userType: userWithoutPassword.userType as 'user' | 'freelancer'
        }
      }
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      success: false,
      message: 'Failed to reset password',
      error: 'Internal server error'
    };
  }
};
