/**
 * Zod-based validation middleware for the Mero Tasbir API
 * Provides type-safe validation with better TypeScript integration
 * Replaces express-validator with more modern Zod validation
 */
import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";

/**
 * Generic Zod validation middleware
 * Validates request data against provided Zod schema
 */
export const validateZod = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      // Validate query parameters
      if (schema.query) {
        req.query = schema.query.parse(req.query) as typeof req.query;
      }

      // Validate route parameters
      if (schema.params) {
        req.params = schema.params.parse(req.params) as typeof req.params;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(err => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors: errorMessages,
        });
      }

      // Handle unexpected errors
      return res.status(500).json({
        message: "Internal server error during validation",
      });
    }
  };
};

// ===== AUTHENTICATION SCHEMAS =====

/**
 * Admin login validation schema
 * Validates email and password for admin authentication
 */
export const adminLoginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .min(1, "Email is required")
    .transform(email => email.toLowerCase().trim()),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

/**
 * Admin registration validation schema
 * Validates admin creation data
 */
export const adminRegisterSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .min(1, "Email is required")
    .transform(email => email.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  role: z
    .string()
    .optional()
    .default("admin")
    .refine(role => ["admin", "super_admin"].includes(role), {
      message: "Role must be either 'admin' or 'super_admin'",
    }),
});

/**
 * Admin update validation schema
 * Validates admin profile update data (all fields optional except password requirements)
 */
export const adminUpdateSchema = z
  .object({
    email: z
      .string()
      .email("Please provide a valid email address")
      .transform(email => email.toLowerCase().trim())
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .optional(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters")
      .trim()
      .optional(),
    role: z
      .string()
      .refine(role => ["admin", "super_admin"].includes(role), {
        message: "Role must be either 'admin' or 'super_admin'",
      })
      .optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
    isActive: z.boolean().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// ===== COMMON SCHEMAS =====

/**
 * ID parameter validation schema
 * Validates route parameters that should be valid IDs
 */
export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

/**
 * Pagination query validation schema
 * Validates pagination parameters
 */
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 1))
    .refine(val => val > 0, "Page must be a positive integer"),
  limit: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 10))
    .refine(val => val > 0 && val <= 100, "Limit must be between 1 and 100"),
});

/**
 * Search query validation schema
 * Validates search parameters
 */
export const searchSchema = z.object({
  q: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query must not exceed 100 characters")
    .trim(),
  category: z.string().optional(),
  sort: z
    .string()
    .optional()
    .refine(
      val => !val || ["asc", "desc", "newest", "oldest"].includes(val),
      "Sort must be one of: asc, desc, newest, oldest"
    ),
});

// ===== USER SCHEMAS =====

/**
 * User creation validation schema
 * Validates user registration data
 */
export const userCreateSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .min(1, "Email is required")
    .transform(email => email.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number")
    .optional(),
});

/**
 * User update validation schema
 * Validates user profile update data
 */
export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters")
    .trim()
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number")
    .optional(),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
});

// ===== FILE UPLOAD SCHEMAS =====

/**
 * File upload validation schema
 * Validates file upload parameters
 */
export const fileUploadSchema = z.object({
  category: z
    .string()
    .refine(
      val => ["avatar", "document", "image", "gallery"].includes(val),
      "Category must be one of: avatar, document, image, gallery"
    ),
  maxSize: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 5 * 1024 * 1024)) // 5MB default
    .refine(val => val <= 10 * 1024 * 1024, "File size must not exceed 10MB"),
});

// ===== CONVENIENCE MIDDLEWARE EXPORTS =====

/**
 * Pre-configured validation middleware for common use cases
 */
export const validateAdminLogin = validateZod({ body: adminLoginSchema });
export const validateAdminRegister = validateZod({ body: adminRegisterSchema });
export const validateAdminUpdate = validateZod({ body: adminUpdateSchema });
export const validateUserCreate = validateZod({ body: userCreateSchema });
export const validateUserUpdate = validateZod({ body: userUpdateSchema });
export const validateIdParam = validateZod({ params: idParamSchema });
export const validatePagination = validateZod({ query: paginationSchema });
export const validateSearch = validateZod({ query: searchSchema });
export const validateFileUpload = validateZod({ query: fileUploadSchema });

// ===== INPUT SANITIZATION =====

/**
 * Simple input sanitization middleware
 * Basic sanitization for common security issues
 */
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Sanitize request body
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === "object") {
    req.query = sanitizeObject(req.query) as typeof req.query;
  }

  next();
};

/**
 * Sanitize object properties recursively
 */
function sanitizeObject(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null) {
    return typeof obj === "string" ? sanitizeString(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item =>
      typeof item === "object"
        ? sanitizeObject(item)
        : typeof item === "string"
          ? sanitizeString(item)
          : item
    );
  }

  const sanitized: Record<string, unknown> = {};

  for (const key in obj as Record<string, unknown>) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as Record<string, unknown>)[key];
      sanitized[key] =
        typeof value === "object"
          ? sanitizeObject(value)
          : typeof value === "string"
            ? sanitizeString(value)
            : value;
    }
  }

  return sanitized;
}

/**
 * Sanitize string input
 */
function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
    .replace(/javascript:/gi, "") // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Type exports for use in controllers
 * Provides TypeScript types for validated data
 */
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type AdminRegisterData = z.infer<typeof adminRegisterSchema>;
export type AdminUpdateData = z.infer<typeof adminUpdateSchema>;
export type UserCreateData = z.infer<typeof userCreateSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type SearchData = z.infer<typeof searchSchema>;
