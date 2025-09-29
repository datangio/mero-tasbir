export interface UserAnalytics {
  overview: {
    totalImages: number;
    totalLikes: number;
    totalViews: number;
    totalSales: number;
    totalEarnings: number;
    averageEarningsPerImage: number;
  };
  recentSales: MediaSale[];
  monthlyEarnings: MonthlyEarnings[];
  categoryBreakdown: CategoryBreakdown[];
  media: UserMedia[];
}

export interface MediaAnalytics {
  media: {
    id: string;
    title: string;
    url: string;
    price: number | null;
    likes: number;
    views: number;
    sales: number;
    totalEarnings: number;
    createdAt: Date;
  };
  likes: MediaLike[];
  sales: MediaSale[];
}

export interface MediaLike {
  id: string;
  mediaId: string;
  userId: string;
  createdAt: Date;
}

export interface MediaSale {
  id: string;
  mediaId: string;
  buyerEmail: string;
  buyerName: string | null;
  price: number;
  status: string;
  paymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  media?: {
    title: string;
    url: string;
  };
}

export interface UserMedia {
  id: string;
  title: string;
  url: string;
  price: number | null;
  likes: number;
  views: number;
  sales: number;
  totalEarnings: number;
  createdAt: Date;
  category: string;
}

export interface MonthlyEarnings {
  month: string;
  earnings: number;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  totalLikes: number;
  totalViews: number;
  totalSales: number;
  totalEarnings: number;
}

export interface UserEarnings {
  totalEarnings: number;
  totalSales: number;
  availableBalance: number;
  withdrawals: Withdrawal[];
}

export interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  requestedAt: Date;
  processedAt?: Date;
}

export interface PurchaseRequest {
  buyerEmail: string;
  buyerName?: string;
  paymentId?: string;
}

export interface WithdrawalRequest {
  amount: number;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountHolderName: string;
  };
}

