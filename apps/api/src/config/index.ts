/**
 * Configuration management system for the Mero Tasbir API
 * Handles environment variables, validation, and type-safe configuration access
 * Provides centralized configuration with sensible defaults and validation
 */
import dotenv from 'dotenv';

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
 * Main application configuration interface
 * Combines all configuration sections into a single object
 */
interface AppConfig {
  /** Server configuration settings */
  server: ServerConfig;
  /** Flag indicating if running in development mode */
  isDevelopment: boolean;
  /** Flag indicating if running in production mode */
  isProduction: boolean;
  /** Flag indicating if running in test mode */
  isTest: boolean;
}

/**
 * Validates required environment variables
 * Currently no required variables for basic setup
 * Can be extended to validate specific requirements
 */
function validateEnv(): void {
  // No required variables for basic setup
}

/**
 * Creates and returns the application configuration object
 * Processes environment variables, sets defaults, and validates configuration
 * @returns {AppConfig} The complete configuration object
 */
function createConfig(): AppConfig {
  validateEnv();

  const env = process.env.NODE_ENV || 'development';
  const port = parseInt(process.env.PORT || '3001', 10);
  const host = process.env.HOST || 'localhost';

  return {
    server: {
      port,
      host,
      env,
      corsOrigin: process.env.CORS_ORIGIN 
        ? process.env.CORS_ORIGIN.split(',') 
        : ['http://localhost:3000', 'http://localhost:3001'],
    },
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test',
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
export const { server } = config;

/**
 * Type exports for use in other files
 * Provides TypeScript interfaces for configuration objects
 */
export type { AppConfig, ServerConfig };
