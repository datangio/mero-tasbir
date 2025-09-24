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
  searchLimiter,
} from "./rateLimiter";

// Security middleware
export {
  hppProtection,
  compressionMiddleware,
  requestSizeLimiter,
  methodNotAllowed,
  requestTimeout,
  securityHeaders,
  ipWhitelist,
  userAgentValidator,
} from "./security";

// Modern Zod-based validation middleware (RECOMMENDED)
export {
  validateZod,
  validateAdminLogin,
  validateAdminRegister,
  validateAdminUpdate,
  validateUserCreate,
  validateUserUpdate as validateUserUpdateZod,
  validateIdParam,
  validatePagination as validatePaginationZod,
  validateSearch as validateSearchZod,
  validateFileUpload as validateFileUploadZod,
  sanitizeInput,
  adminLoginSchema,
  adminRegisterSchema,
  adminUpdateSchema,
  userCreateSchema,
  userUpdateSchema,
  idParamSchema,
  paginationSchema,
  searchSchema,
  fileUploadSchema,
} from "./zodValidation";

// Type exports from Zod validation
export type {
  AdminLoginData,
  AdminRegisterData,
  AdminUpdateData,
  UserCreateData,
  UserUpdateData,
  PaginationData,
  SearchData,
} from "./zodValidation";

// Multer file upload middleware
export {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadProfileImage,
  uploadCourseImages,
  uploadMarketplaceImages,
  uploadEventImages,
  uploadHeroImage,
  uploadMixedFiles,
  handleMulterError,
  default as multerUpload,
} from "./multer.config";
