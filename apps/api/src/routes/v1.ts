/**
 * API v1 routes for the Mero Tasbir application
 * Contains the main API endpoints and version information
 * All v1 API functionality is organized under this router
 */
import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * GET /api/v1
 * Returns API version information and available endpoints
 * Provides a welcome message and endpoint discovery
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Mero Tasbir API v1',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      v1: '/api/v1'
    }
  });
});

export default router;
