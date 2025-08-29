/**
 * Configuration management system for the Mero Tasbir API
 * Handles environment variables, validation, and type-safe configuration access
 * Provides centralized configuration with sensible defaults and validation
 */
import dotenv from "dotenv";

/**
 * Load environment variables from .env file
 * Must be called before accessing any process.env variables
 */
dotenv.config();

/**
 * Server configuration interface
 * Defines the structure for server-related configuration values
 */
interface ServerConfig {
  /** Server port number */
  port: number;
  /** Server host address */
  host: string;
  /** Current environment (development, production, test) */
  env: string;
  /** Array of allowed CORS origins */
  corsOrigin: string[];
}

/**
 * JWT configuration interface
 * Defines the structure for JWT-related configuration values
 */
interface JWTConfig {
  /** JWT secret key for signing tokens */
  secret: string;
  /** JWT expiration time */
  expiresIn: string;
  /** JWT issuer */
  issuer: string;
}

/**
 * Main application configuration interface
 * Combines all configuration sections into a single object
 */
interface AppConfig {
  /** Server configuration settings */
  server: ServerConfig;
  /** JWT configuration settings */
  jwt: JWTConfig;
  /** Flag indicating if running in development mode */
  isDevelopment: boolean;
  /** Flag indicating if running in production mode */
  isProduction: boolean;
  /** Flag indicating if running in test mode */
  isTest: boolean;
}

/**
 * Validates required environment variables
 * Ensures JWT_SECRET is provided in production
 * Can be extended to validate other specific requirements
 */
function validateEnv(): void {
  const env = process.env.NODE_ENV || "development";

  if (env === "production" && !process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in production environment");
  }
}

/**
 * Creates and returns the application configuration object
 * Processes environment variables, sets defaults, and validates configuration
 * @returns {AppConfig} The complete configuration object
 */
function createConfig(): AppConfig {
  validateEnv();

  const env = process.env.NODE_ENV || "development";
  const port = parseInt(process.env.PORT || "5001", 10);
  const host = process.env.HOST || "localhost";

  return {
    server: {
      port,
      host,
      env,
      corsOrigin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",")
        : [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:3003",
          ],
    },
    jwt: {
      secret:
        process.env.JWT_SECRET ||
        "your-super-secret-jwt-key-change-in-production",
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      issuer: process.env.JWT_ISSUER || "mero-tasbir-api",
    },
    isDevelopment: env === "development",
    isProduction: env === "production",
    isTest: env === "test",
  };
}

/**
 * Exported configuration instance
 * Contains all validated and processed configuration values
 */
export const config = createConfig();

/**
 * Individual configuration exports for convenience
 * Allows importing specific config sections directly
 */
export const { server, jwt } = config;

/**
 * Type exports for use in other files
 * Provides TypeScript interfaces for configuration objects
 */
export type { AppConfig, ServerConfig, JWTConfig };
