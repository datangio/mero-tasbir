/**
 * Middleware index file
 * Exports all middleware functions for easy importing
 */

// Rate limiting middleware
export {
  apiLimiter,
  authLimiter,
  speedLimiter,
  uploadLimiter,
  searchLimiter
} from './rateLimiter';

// Security middleware
export {
  hppProtection,
  compressionMiddleware,
  requestSizeLimiter,
  methodNotAllowed,
  requestTimeout,
  securityHeaders,
  ipWhitelist,
  userAgentValidator
} from './security';

// Validation middleware
export {
  handleValidationErrors,
  validateUserCreation,
  validateUserUpdate,
  validateId,
  validatePagination,
  validateSearch,
  validateFileUpload,
  validateEventCreation,
  validateServiceCreation,
  validateAuth,
  sanitizeInput
} from './validation';
