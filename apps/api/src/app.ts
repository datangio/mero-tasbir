/**
 * Main Express application entry point
 * Sets up middleware, routes, and error handling
 * Configures the server with environment-based settings
 */
import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import healthRoutes from "./routes/health";
import v1Routes from "./routes/v1";
import { config } from "./config";

import {
  // Rate limiting
  apiLimiter,
  speedLimiter,
  // Security
  hppProtection,
  compressionMiddleware,
  requestSizeLimiter,
  methodNotAllowed,
  requestTimeout,
  securityHeaders,
  userAgentValidator,
  // Validation
  sanitizeInput,
} from "./middleware";

const app: Application = express();
const httpServer = createServer(app);

/**
 * Security and middleware configuration
 * - Helmet: Security headers
 * - CORS: Cross-origin resource sharing
 * - Morgan: HTTP request logging
 * - Body parsing for JSON and URL-encoded data
 * - Rate limiting: API abuse prevention
 * - Security: Additional protection layers
 * - Compression: Response optimization
 * - Validation: Input sanitization
 */
app.use(helmet());
app.use(
  cors({
    origin: config.server.corsOrigin,
    credentials: true,
  })
);
app.use(morgan(config.isDevelopment ? "dev" : "combined"));

// Security middleware
app.use(hppProtection);
app.use(securityHeaders);
app.use(userAgentValidator);
app.use(requestSizeLimiter);
app.use(methodNotAllowed);
app.use(requestTimeout(30000)); // 30 second timeout

// Performance middleware
app.use(compressionMiddleware);

// Rate limiting
app.use(apiLimiter);
app.use(speedLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Input sanitization
app.use(sanitizeInput);

/**
 * API route configuration
 * All routes are prefixed with /api/v1 for versioning
 */
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1", v1Routes);

/**
 * 404 handler for unmatched routes
 * Returns a JSON error response for any undefined endpoints
 */
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Global error handler middleware
 * Catches all errors and returns a standardized error response
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default httpServer;
