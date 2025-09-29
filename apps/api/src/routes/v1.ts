/**
 * API v1 routes for the Mero Tasbir application
 * Contains the main API endpoints and version information
 * All v1 API functionality is organized under this router
 */
import { Router, Request, Response } from 'express';
import adminRoutes from './admin.route';
import eventRoutes from './event.routes';
import heroRoutes from './hero.route';
import { mediaRoutes } from './media.route';
import courseRoutes from './course.route';
import marketplaceRoutes from './marketplace.route';
import uploadRoutes from './upload.route';
import authRoutes from './auth.route';
import bookingRoutes from './booking.route';
import analyticsRoutes from './analytics.route';
import userRoutes from './user.route';

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
      admin: '/api/v1/admin',
      events: '/api/v1/events',
      hero: '/api/v1/hero',
      media: '/api/v1/media',
      courses: '/api/v1/courses',
      marketplace: '/api/v1/marketplace',
      upload: '/api/v1/upload',
      auth: '/api/v1/auth',
      bookings: '/api/v1/bookings',
      analytics: '/api/v1/analytics',
      users: '/api/v1/users',
      v1: '/api/v1'
    }
  });
});

// Mount route modules
router.use('/admin', adminRoutes);
router.use('/events', eventRoutes);
router.use('/hero', heroRoutes);
router.use('/media', mediaRoutes);
router.use('/courses', courseRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/users', userRoutes);

export default router;
