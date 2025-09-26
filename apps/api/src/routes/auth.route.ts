import { Router } from 'express';
import { 
  sendVerificationEmailController,
  verifyOTPController,
  createUserAccountController,
  loginUserController,
  resendOTPController,
  forgotPasswordController,
  resetPasswordController
} from '../controller/auth.controller';

const router = Router();

/**
 * POST /api/v1/auth/send-verification
 * Send verification email with OTP
 */
router.post('/send-verification', sendVerificationEmailController);

/**
 * POST /api/v1/auth/verify-otp
 * Verify OTP code
 */
router.post('/verify-otp', verifyOTPController);

/**
 * POST /api/v1/auth/register
 * Create new user account
 */
router.post('/register', createUserAccountController);

/**
 * POST /api/v1/auth/login
 * User login
 */
router.post('/login', loginUserController);

/**
 * POST /api/v1/auth/resend-otp
 * Resend OTP code
 */
router.post('/resend-otp', resendOTPController);

/**
 * POST /api/v1/auth/forgot-password
 * Send password reset email
 */
router.post('/forgot-password', forgotPasswordController);

/**
 * POST /api/v1/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', resetPasswordController);

export default router;








