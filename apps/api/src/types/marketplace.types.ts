export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  images: string[];
  tags?: string[];
  specifications?: Record<string, string>;
  itemType: 'rental' | 'sale';
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  quantity: number;
  rating: number;
  reviewCount: number;
  seller: {
    id: string;
    name: string;
    email: string;
    rating?: number;
    reviewCount?: number;
  };
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMarketplaceItemRequest {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  itemType?: 'rental' | 'sale';
  currency?: string;
  images: string[];
  tags?: string[];
  specifications?: Record<string, string>;
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability?: 'in_stock' | 'out_of_stock' | 'limited';
  quantity?: number;
  rating?: number;
  reviewCount?: number;
  seller: {
    id: string;
    name: string;
    email: string;
    rating?: number;
    reviewCount?: number;
  };
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface UpdateMarketplaceItemRequest {
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  currency?: string;
  images?: string[];
  tags?: string[];
  specifications?: Record<string, string>;
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability?: 'in_stock' | 'out_of_stock' | 'limited';
  quantity?: number;
  rating?: number;
  reviewCount?: number;
  seller?: {
    id: string;
    name: string;
    email: string;
    rating?: number;
    reviewCount?: number;
  };
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface MarketplaceSearchParams {
  query?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  availability?: 'in_stock' | 'out_of_stock' | 'limited';
  location?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'popular' | 'rating';
  page?: number;
  limit?: number;
}

export interface MarketplaceItemResponse {
  success: boolean;
  data?: MarketplaceItem;
  message?: string;
}

export interface MarketplaceItemsResponse {
  success: boolean;
  data?: MarketplaceItem[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters?: {
    categories: string[];
    subcategories: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export interface MarketplaceStats {
  totalItems: number;
  totalCategories: number;
  totalSellers: number;
  averagePrice: number;
  featuredItems: number;
  activeItems: number;
}


