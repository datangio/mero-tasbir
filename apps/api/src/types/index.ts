/**
 * TypeScript type definitions for the Mero Tasbir API
 * Contains interfaces and types used throughout the application
 * Provides type safety and IntelliSense for API responses and data structures
 */

/**
 * Generic API response wrapper
 * Standardizes all API responses with consistent structure
 * @template T - The type of data being returned
 */
export interface ApiResponse<T = unknown> {
  /** Indicates if the request was successful */
  success: boolean;
  /** The actual data payload (optional for error responses) */
  data?: T;
  /** Human-readable message about the response */
  message?: string;
  /** Error details (only present for error responses) */
  error?: string;
}

/**
 * Health check response structure
 * Defines the format for health check endpoint responses
 */
export interface HealthResponse {
  /** Current health status (usually 'OK') */
  status: string;
  /** ISO timestamp of when the health check was performed */
  timestamp: string;
  /** Server uptime in seconds */
  uptime: number;
  /** Current environment (development, production, test) */
  environment: string;
}

/**
 * API v1 information response structure
 * Defines the format for the main API endpoint response
 */
export interface ApiV1Response {
  /** Welcome message for the API */
  message: string;
  /** Current API version */
  version: string;
  /** Available API endpoints */
  endpoints: {
    /** Health check endpoint */
    health: string;
    /** Main API endpoint */
    v1: string;
  };
}

/**
 * Error response structure
 * Standardized format for all error responses
 */
export interface ErrorResponse {
  /** Human-readable error message */
  message: string;
  /** HTTP status code */
  statusCode: number;
  /** ISO timestamp of when the error occurred */
  timestamp: string;
}
