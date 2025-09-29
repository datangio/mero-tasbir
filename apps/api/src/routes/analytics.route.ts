import { Router } from 'express';
import {
  getUserAnalytics,
  getMediaAnalytics,
  likeMedia,
  purchaseMedia,
  getUserEarnings,
  requestWithdrawal,
} from '../controller/analytics.controller';
import { authenticateToken } from '../middleware/security';

const router = Router();

// All analytics routes require authentication
router.use(authenticateToken);

// User analytics routes
router.get('/user', getUserAnalytics);
router.get('/earnings', getUserEarnings);
router.post('/withdrawal', requestWithdrawal);

// Media analytics routes
router.get('/media/:mediaId', getMediaAnalytics);
router.post('/media/:mediaId/like', likeMedia);
router.post('/media/:mediaId/purchase', purchaseMedia);

export default router;

