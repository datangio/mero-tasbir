import { Request, Response } from 'express';
import { MarketplaceService } from '../services/marketplace.service';
import asyncHandler from '../utils/asyncHandler';
import { createMarketplaceItemSchema, updateMarketplaceItemSchema, marketplaceSearchSchema } from '../schemas/marketplace.schemas';

const marketplaceService = new MarketplaceService();

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createMarketplaceItemSchema.parse(req.body);
  
  const item = await marketplaceService.createItem({
    ...validatedData,
    specifications: validatedData.specifications as Record<string, string> | undefined,
  });
  
  res.status(201).json({
    success: true,
    data: item,
    message: 'Marketplace item created successfully',
  });
});

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const searchParams = marketplaceSearchSchema.parse({
    ...req.query,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  });
  
  const result = await marketplaceService.getAllItems(searchParams);
  
  res.status(200).json(result);
});

export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const item = await marketplaceService.getItemById(id);
  
  if (!item) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: item,
  });
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateMarketplaceItemSchema.parse(req.body);
  
  const item = await marketplaceService.updateItem(id, {
    ...validatedData,
    specifications: validatedData.specifications as Record<string, string> | undefined,
  });
  
  if (!item) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: item,
    message: 'Marketplace item updated successfully',
  });
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const success = await marketplaceService.deleteItem(id);
  
  if (!success) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found or could not be deleted',
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Marketplace item deleted successfully',
  });
});

export const toggleItemStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const item = await marketplaceService.toggleItemStatus(id);
  
  if (!item) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: item,
    message: `Marketplace item ${item.isActive ? 'activated' : 'deactivated'} successfully`,
  });
});

export const toggleFeaturedStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const item = await marketplaceService.toggleFeaturedStatus(id);
  
  if (!item) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: item,
    message: `Marketplace item ${item.isFeatured ? 'featured' : 'unfeatured'} successfully`,
  });
});

export const getItemsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;
  
  const items = await marketplaceService.getItemsByCategory(category);
  
  res.status(200).json({
    success: true,
    data: items,
  });
});

export const getItemsBySeller = asyncHandler(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  
  const items = await marketplaceService.getItemsBySeller(sellerId);
  
  res.status(200).json({
    success: true,
    data: items,
  });
});

export const getFeaturedItems = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  
  const items = await marketplaceService.getFeaturedItems(limit);
  
  res.status(200).json({
    success: true,
    data: items,
  });
});

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await marketplaceService.getStats();
  
  res.status(200).json({
    success: true,
    data: stats,
  });
});

export const likeItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const success = await marketplaceService.likeItem(id);
  
  if (!success) {
    res.status(404).json({
      success: false,
      message: 'Marketplace item not found',
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Item liked successfully',
  });
});

export const searchItems = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
  
  if (!q || typeof q !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
    return;
  }
  
  const items = await marketplaceService.searchItems(q, limit);
  
  res.status(200).json({
    success: true,
    data: items,
  });
});

