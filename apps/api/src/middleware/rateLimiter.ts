/**
 * Rate limiting middleware for API protection
 * Prevents abuse and ensures fair usage of the API
 * Implements both rate limiting and slow down strategies
 */
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

/**
 * General API rate limiter
 * Limits requests per IP address per window
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    });
  }
});

/**
 * Strict rate limiter for authentication endpoints
 * More restrictive for login/register attempts
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again later.',
      retryAfter: '15 minutes'
    });
  }
});

/**
 * Slow down middleware for repeated requests
 * Gradually slows down responses for abusive users
 */
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per 15 minutes, then...
  delayMs: 500, // Add 500ms delay per request above 50
  maxDelayMs: 20000, // Maximum delay of 20 seconds
});

/**
 * Upload rate limiter for file uploads
 * Prevents abuse of file upload endpoints
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 uploads per hour
  message: {
    error: 'Too many file uploads, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many file uploads, please try again later.',
      retryAfter: '1 hour'
    });
  }
});

/**
 * Search rate limiter for search endpoints
 * Prevents abuse of search functionality
 */
export const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 searches per 5 minutes
  message: {
    error: 'Too many search requests, please try again later.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many search requests, please try again later.',
      retryAfter: '5 minutes'
    });
  }
});
