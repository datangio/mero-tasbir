import { PrismaClient } from '../generated/prisma';
import { 
  MarketplaceItem, 
  CreateMarketplaceItemRequest, 
  UpdateMarketplaceItemRequest, 
  MarketplaceItemsResponse,
  MarketplaceSearchParams,
  MarketplaceStats 
} from '../types/marketplace.types';

const prisma = new PrismaClient();

export class MarketplaceService {
  async createItem(data: CreateMarketplaceItemRequest): Promise<MarketplaceItem> {
    const item = await prisma.marketplaceItem.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        currency: data.currency || 'NPR',
        images: data.images,
        tags: data.tags || [],
        specifications: data.specifications as any,
      itemType: data.itemType || 'sale',
      condition: data.condition || 'new',
      availability: data.availability || 'in_stock',
        quantity: data.quantity || 1,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        seller: data.seller as any,
        location: data.location as any,
        isActive: data.isActive !== false,
        isFeatured: data.isFeatured || false,
      },
    });

    return item as MarketplaceItem;
  }

  async getAllItems(params: MarketplaceSearchParams): Promise<MarketplaceItemsResponse> {
    const {
      query,
      category,
      subcategory,
      minPrice,
      maxPrice,
      condition,
      availability,
      location,
      sortBy = 'newest',
      page = 1,
      limit = 20,
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { hasSome: [query] } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (subcategory) {
      where.subcategory = { contains: subcategory, mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (condition) {
      where.condition = condition;
    }

    if (availability) {
      where.availability = availability;
    }

    if (location) {
      where.location = {
        path: ['city'],
        string_contains: location,
      };
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' };
    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'popular':
        orderBy = { views: 'desc' };
        break;
      case 'rating':
        orderBy = { seller: { path: ['rating'], mode: 'desc' } };
        break;
    }

    const [items, total] = await Promise.all([
      prisma.marketplaceItem.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.marketplaceItem.count({ where }),
    ]);

    // Get filter options
    const [categories, subcategories, priceRange] = await Promise.all([
      prisma.marketplaceItem.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ['category'],
      }),
      prisma.marketplaceItem.findMany({
        where: { isActive: true },
        select: { subcategory: true },
        distinct: ['subcategory'],
      }),
      prisma.marketplaceItem.aggregate({
        where: { isActive: true },
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    return {
      success: true,
      data: items as MarketplaceItem[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        categories: categories.map(c => c.category).filter(Boolean),
        subcategories: subcategories.map(c => c.subcategory).filter((sub): sub is string => Boolean(sub)),
        priceRange: {
          min: priceRange._min.price || 0,
          max: priceRange._max.price || 0,
        },
      },
    };
  }

  async getItemById(id: string): Promise<MarketplaceItem | null> {
    const item = await prisma.marketplaceItem.findUnique({
      where: { id },
    });

    if (item) {
      // Increment view count
      await prisma.marketplaceItem.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    }

    return item as MarketplaceItem | null;
  }

  async updateItem(id: string, data: UpdateMarketplaceItemRequest): Promise<MarketplaceItem | null> {
    const item = await prisma.marketplaceItem.update({
      where: { id },
      data: {
        ...data,
        specifications: data.specifications ? data.specifications as any : undefined,
        seller: data.seller ? data.seller as any : undefined,
        location: data.location ? data.location as any : undefined,
      },
    });

    return item as MarketplaceItem;
  }

  async deleteItem(id: string): Promise<boolean> {
    try {
      await prisma.marketplaceItem.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async toggleItemStatus(id: string): Promise<MarketplaceItem | null> {
    const item = await prisma.marketplaceItem.findUnique({
      where: { id },
    });

    if (!item) return null;

    const updatedItem = await prisma.marketplaceItem.update({
      where: { id },
      data: { isActive: !item.isActive },
    });

    return updatedItem as MarketplaceItem;
  }

  async toggleFeaturedStatus(id: string): Promise<MarketplaceItem | null> {
    const item = await prisma.marketplaceItem.findUnique({
      where: { id },
    });

    if (!item) return null;

    const updatedItem = await prisma.marketplaceItem.update({
      where: { id },
      data: { isFeatured: !item.isFeatured },
    });

    return updatedItem as MarketplaceItem;
  }

  async getItemsByCategory(category: string): Promise<MarketplaceItem[]> {
    const items = await prisma.marketplaceItem.findMany({
      where: {
        category: { contains: category, mode: 'insensitive' },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return items as MarketplaceItem[];
  }

  async getItemsBySeller(sellerId: string): Promise<MarketplaceItem[]> {
    const items = await prisma.marketplaceItem.findMany({
      where: {
        seller: {
          path: ['id'],
          equals: sellerId,
        },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return items as MarketplaceItem[];
  }

  async getFeaturedItems(limit: number = 10): Promise<MarketplaceItem[]> {
    const items = await prisma.marketplaceItem.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return items as MarketplaceItem[];
  }

  async getStats(): Promise<MarketplaceStats> {
    const [
      totalItems,
      totalCategories,
      totalSellers,
      averagePrice,
      featuredItems,
      activeItems,
    ] = await Promise.all([
      prisma.marketplaceItem.count(),
      prisma.marketplaceItem.findMany({
        select: { category: true },
        distinct: ['category'],
      }).then(result => result.length),
      prisma.marketplaceItem.findMany({
        select: { seller: true },
        distinct: ['seller'],
      }).then(result => result.length),
      prisma.marketplaceItem.aggregate({
        _avg: { price: true },
      }).then(result => result._avg.price || 0),
      prisma.marketplaceItem.count({
        where: { isFeatured: true },
      }),
      prisma.marketplaceItem.count({
        where: { isActive: true },
      }),
    ]);

    return {
      totalItems,
      totalCategories,
      totalSellers,
      averagePrice,
      featuredItems,
      activeItems,
    };
  }

  async likeItem(id: string): Promise<boolean> {
    try {
      await prisma.marketplaceItem.update({
        where: { id },
        data: { likes: { increment: 1 } },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async searchItems(query: string, limit: number = 20): Promise<MarketplaceItem[]> {
    const items = await prisma.marketplaceItem.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query] } },
          { category: { contains: query, mode: 'insensitive' } },
          { subcategory: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: { views: 'desc' },
    });

    return items as MarketplaceItem[];
  }
}


