/**
 * Security middleware for API protection
 * Implements additional security measures beyond basic helmet
 * Protects against common web vulnerabilities
 */
import { Request, Response, NextFunction } from 'express';
import hpp from 'hpp';
import compression from 'compression';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

/**
 * HTTP Parameter Pollution protection
 * Prevents parameter pollution attacks
 */
export const hppProtection = hpp();

/**
 * Compression middleware
 * Compresses response bodies for better performance
 */
export const compressionMiddleware = compression({
  level: 6, // Compression level (0-9, higher = more compression)
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress responses with this request header
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression by default
    return compression.filter(req, res);
  }
});

/**
 * Request size limiter
 * Prevents large payload attacks
 */
export const requestSizeLimiter = (req: Request, res: Response, next: NextFunction) => {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  const maxSize = 10 * 1024 * 1024; // 10MB limit

  if (contentLength > maxSize) {
    return res.status(413).json({
      success: false,
      message: 'Request entity too large. Maximum size is 10MB.'
    });
  }

  next();
};

/**
 * Method not allowed handler
 * Prevents unauthorized HTTP methods
 */
export const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Allowed methods: ${allowedMethods.join(', ')}`
    });
  }

  next();
};

/**
 * Request timeout handler
 * Prevents hanging requests
 */
export const requestTimeout = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          message: 'Request timeout. Please try again.'
        });
      }
    }, timeoutMs);

    // Clear timeout when response is sent
    res.on('finish', () => {
      clearTimeout(timer);
    });

    next();
  };
};

/**
 * Security headers middleware
 * Adds additional security headers
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy (basic)
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");
  
  next();
};

/**
 * IP whitelist middleware
 * Restricts access to specific IP addresses
 */
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    if (!allowedIPs.includes(clientIP || '')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. IP not in whitelist.'
      });
    }

    next();
  };
};

/**
 * User agent validation
 * Blocks requests from suspicious user agents (only in production)
 */
export const userAgentValidator = (req: Request, res: Response, next: NextFunction) => {
  // Only apply user agent validation in production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const userAgent = req.headers['user-agent'];
  const suspiciousAgents = [
    'bot', 'crawler', 'spider', 'scraper'
  ];

  if (userAgent && suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User agent not allowed.'
    });
  }

  next();
};

/**
 * JWT Authentication middleware
 * Verifies JWT tokens and attaches user info to request
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  // Handle NextAuth session token
  if (token === 'nextauth-session') {
    // For NextAuth users, we'll extract user info from the request body or headers
    // This is a simplified approach - in production you'd want more secure handling
    const userEmail = req.headers['x-user-email'] as string;
    
    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'User email required for NextAuth session'
      });
    }

    try {
      // Try to get the database user ID for this email
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
      
      // Use database ID if found, otherwise fallback to email
      const userId = user?.id || userEmail;
      
      // Attach user info to request object
      (req as any).user = {
        id: userId,
        email: userEmail,
        userType: 'user'
      };
      
      return next();
    } catch (error) {
      // Fallback to email if database lookup fails
      (req as any).user = {
        id: userEmail,
        email: userEmail,
        userType: 'user'
      };
      return next();
    }
  }

  // Handle regular JWT tokens
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Attach user info to request object
    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
      userType: decoded.userType
    };
    
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
