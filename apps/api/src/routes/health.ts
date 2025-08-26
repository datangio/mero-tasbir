/**
 * Health check routes for the Mero Tasbir API
 * Provides endpoints to monitor API health and status
 * Used by load balancers, monitoring tools, and health checks
 */
import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * GET /api/v1/health
 * Returns the current health status of the API
 * Includes uptime, environment, and timestamp information
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
