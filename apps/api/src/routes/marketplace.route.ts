import { Router } from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  toggleItemStatus,
  toggleFeaturedStatus,
  getItemsByCategory,
  getItemsBySeller,
  getFeaturedItems,
  getStats,
  likeItem,
  searchItems,
} from '../controller/marketplace.controller';
import { validateZod } from '../middleware/zodValidation';
import { createMarketplaceItemSchema, updateMarketplaceItemSchema } from '../schemas/marketplace.schemas';

const router = Router();

// Public routes
router.get('/', getAllItems);
router.get('/search', searchItems);
router.get('/featured', getFeaturedItems);
router.get('/category/:category', getItemsByCategory);
router.get('/seller/:sellerId', getItemsBySeller);
router.get('/stats', getStats);
router.get('/:id', getItemById);
router.post('/:id/like', likeItem);

// Admin routes (you can add authentication middleware here)
router.post('/', validateZod({ body: createMarketplaceItemSchema }), createItem);
router.put('/:id', validateZod({ body: updateMarketplaceItemSchema }), updateItem);
router.delete('/:id', deleteItem);
router.patch('/:id/toggle-status', toggleItemStatus);
router.patch('/:id/toggle-featured', toggleFeaturedStatus);

export default router;



