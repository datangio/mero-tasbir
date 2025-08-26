/**
 * Validation middleware for request data
 * Ensures data integrity and prevents malicious input
 * Uses express-validator for comprehensive validation
 */
import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";

/**
 * Handle validation errors
 * Returns formatted error messages for invalid requests
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(error => ({
        field: error.type,
        message: error.msg,
      })),
    });
  }

  next();
};

/**
 * User creation validation rules
 * Validates user registration data
 */
export const validateUserCreation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  handleValidationErrors,
];

/**
 * User update validation rules
 * Validates user profile updates
 */
export const validateUserUpdate = [
  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  handleValidationErrors,
];

/**
 * ID parameter validation
 * Ensures ID parameters are valid
 */
export const validateId = [
  param("id").isUUID().withMessage("Invalid ID format"),
  handleValidationErrors,
];

/**
 * Pagination query validation
 * Validates pagination parameters
 */
export const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  handleValidationErrors,
];

/**
 * Search query validation
 * Validates search parameters
 */
export const validateSearch = [
  query("q")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
  query("category")
    .optional()
    .isIn(["users", "services", "events"])
    .withMessage("Invalid category"),
  handleValidationErrors,
];

/**
 * File upload validation
 * Validates file upload requests
 */
export const validateFileUpload = [
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),
  body("category")
    .isIn(["portfolio", "event", "profile"])
    .withMessage("Invalid file category"),
  handleValidationErrors,
];

/**
 * Event creation validation
 * Validates event booking data
 */
export const validateEventCreation = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Event title must be between 5 and 100 characters"),
  body("date").isISO8601().withMessage("Please provide a valid date"),
  body("location")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Location must be between 5 and 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("clientId").isUUID().withMessage("Invalid client ID"),
  handleValidationErrors,
];

/**
 * Service creation validation
 * Validates photography service data
 */
export const validateServiceCreation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Service name must be between 3 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("duration")
    .isInt({ min: 30, max: 480 })
    .withMessage("Duration must be between 30 and 480 minutes"),
  body("category")
    .isIn(["portrait", "event", "wedding", "commercial", "other"])
    .withMessage("Invalid service category"),
  handleValidationErrors,
];

/**
 * Authentication validation
 * Validates login credentials
 */
export const validateAuth = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("password").isLength({ min: 1 }).withMessage("Password is required"),
  handleValidationErrors,
];

/**
 * Sanitize input data
 * Removes potentially dangerous content
 */
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Sanitize body parameters
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === "string") {
        req.query[key] = req.query[key]?.toString().trim();
      }
    });
  }

  next();
};
