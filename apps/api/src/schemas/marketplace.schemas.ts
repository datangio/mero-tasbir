import { z } from 'zod';

export const marketplaceItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  originalPrice: z.number().optional(),
  discount: z.number().optional(),
  currency: z.string().default('NPR'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  tags: z.array(z.string()).optional(),
  specifications: z.record(z.string(), z.unknown()).optional(),
  itemType: z.enum(['rental', 'sale']).default('sale'),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).default('new'),
  availability: z.enum(['in_stock', 'out_of_stock', 'limited']).default('in_stock'),
  quantity: z.number().min(0, 'Quantity must be non-negative').default(1),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().min(0).default(0),
  seller: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    rating: z.number().min(0).max(5).optional(),
    reviewCount: z.number().min(0).optional(),
  }),
  location: z.object({
    city: z.string(),
    country: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  views: z.number().min(0).default(0),
  likes: z.number().min(0).default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createMarketplaceItemSchema = marketplaceItemSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  views: true,
  likes: true,
});

export const updateMarketplaceItemSchema = marketplaceItemSchema.partial().omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  views: true,
  likes: true,
});

export const marketplaceSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
  availability: z.enum(['in_stock', 'out_of_stock', 'limited']).optional(),
  location: z.string().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'newest', 'oldest', 'popular', 'rating']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export type MarketplaceItem = z.infer<typeof marketplaceItemSchema>;
export type CreateMarketplaceItem = z.infer<typeof createMarketplaceItemSchema>;
export type UpdateMarketplaceItem = z.infer<typeof updateMarketplaceItemSchema>;
export type MarketplaceSearch = z.infer<typeof marketplaceSearchSchema>;


