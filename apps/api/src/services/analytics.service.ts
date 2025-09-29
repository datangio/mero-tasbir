import { PrismaClient } from '../generated/prisma';
import { MediaService } from './media.service';

const prisma = new PrismaClient();
const mediaService = new MediaService();

export class AnalyticsService {
  async getUserAnalytics(userId: string) {
    // Handle both user ID and email-based identification
    let whereClause: any = {
      isActive: true,
    };

    // Check if userId is an email (NextAuth users) or user ID
    if (userId.includes('@')) {
      // It's an email, find user by email first
      const user = await prisma.user.findUnique({
        where: { email: userId },
        select: { id: true },
      });
      
      if (!user) {
        // For NextAuth users who don't exist yet, return empty analytics
        // This allows them to see the analytics page even before uploading
        return {
          overview: {
            totalImages: 0,
            totalLikes: 0,
            totalViews: 0,
            totalSales: 0,
            totalEarnings: 0,
            totalWithdrawn: 0,
            pendingWithdrawals: 0,
            availableBalance: 0,
            averageEarningsPerImage: 0,
          },
          recentSales: [],
          monthlyEarnings: this.getEmptyMonthlyEarnings(),
          categoryBreakdown: [],
          media: [],
          withdrawals: [],
        };
      }
      
      whereClause.uploadedBy = user.id;
    } else {
      // It's a user ID
      whereClause.uploadedBy = userId;
    }

    // Get user's media with analytics data
    const userMedia = await prisma.media.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        url: true,
        price: true,
        likes: true,
        views: true,
        sales: true,
        totalEarnings: true,
        createdAt: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total analytics
    const totalImages = userMedia.length;
    const totalLikes = userMedia.reduce((sum, media) => sum + media.likes, 0);
    const totalViews = userMedia.reduce((sum, media) => sum + media.views, 0);
    const totalSales = userMedia.reduce((sum, media) => sum + media.sales, 0);
    const totalEarnings = userMedia.reduce((sum, media) => sum + media.totalEarnings, 0);

    // Get recent sales
    const recentSales = await prisma.mediaSale.findMany({
      where: {
        media: {
          uploadedBy: userId,
        },
      },
      include: {
        media: {
          select: {
            title: true,
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get monthly earnings data for the last 12 months
    const monthlyEarnings = await this.getMonthlyEarnings(userId);

    // Get category breakdown
    const categoryBreakdown = await this.getCategoryBreakdown(userId);

    // Get withdrawal information
    const actualUserId = userId.includes('@') ? 
      (await prisma.user.findUnique({ where: { email: userId }, select: { id: true } }))?.id || userId :
      userId;

    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: actualUserId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate withdrawal totals
    const totalWithdrawn = withdrawals
      .filter(w => w.status === 'COMPLETED')
      .reduce((sum, w) => sum + w.amount, 0);
    
    const pendingWithdrawals = withdrawals
      .filter(w => w.status === 'PENDING' || w.status === 'APPROVED' || w.status === 'PROCESSING')
      .reduce((sum, w) => sum + w.amount, 0);

    const availableBalance = totalEarnings - totalWithdrawn - pendingWithdrawals;

    return {
      overview: {
        totalImages,
        totalLikes,
        totalViews,
        totalSales,
        totalEarnings,
        totalWithdrawn,
        pendingWithdrawals,
        availableBalance,
        averageEarningsPerImage: totalImages > 0 ? totalEarnings / totalImages : 0,
      },
      recentSales,
      monthlyEarnings,
      categoryBreakdown,
      media: userMedia,
      withdrawals: withdrawals.slice(0, 10), // Last 10 withdrawals
    };
  }

  async getMediaAnalytics(userId: string, mediaId: string) {
    // Handle both user ID and email-based identification
    let whereClause: any = {
      id: mediaId,
    };

    // Check if userId is an email (NextAuth users) or user ID
    if (userId.includes('@')) {
      // It's an email, find user by email first
      const user = await prisma.user.findUnique({
        where: { email: userId },
        select: { id: true },
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      whereClause.uploadedBy = user.id;
    } else {
      // It's a user ID
      whereClause.uploadedBy = userId;
    }

    // Verify user owns the media
    const media = await prisma.media.findFirst({
      where: whereClause,
    });

    if (!media) {
      throw new Error('Media not found');
    }

    // Get detailed analytics for the media
    const likes = await prisma.mediaLike.findMany({
      where: {
        mediaId: mediaId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const sales = await prisma.mediaSale.findMany({
      where: {
        mediaId: mediaId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      media: {
        id: media.id,
        title: media.title,
        url: media.url,
        price: media.price,
        likes: media.likes,
        views: media.views,
        sales: media.sales,
        totalEarnings: media.totalEarnings,
        createdAt: media.createdAt,
      },
      likes,
      sales,
    };
  }

  async likeMedia(userId: string, mediaId: string) {
    // Check if media exists
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    // Check if user already liked this media
    const existingLike = await prisma.mediaLike.findUnique({
      where: {
        mediaId_userId: {
          mediaId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.mediaLike.delete({
        where: {
          mediaId_userId: {
            mediaId,
            userId,
          },
        },
      });

      // Decrease like count
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return {
        message: 'Media unliked successfully',
        data: { liked: false, likes: media.likes - 1 },
      };
    } else {
      // Like
      await prisma.mediaLike.create({
        data: {
          mediaId,
          userId,
        },
      });

      // Increase like count
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return {
        message: 'Media liked successfully',
        data: { liked: true, likes: media.likes + 1 },
      };
    }
  }

  async purchaseMedia(userId: string, mediaId: string, purchaseData: {
    buyerEmail: string;
    buyerName?: string;
    paymentId?: string;
  }) {
    // Check if media exists and is available for purchase
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    if (!media.price || media.price <= 0) {
      throw new Error('Media not available for purchase');
    }

    // Create sale record
    const sale = await prisma.mediaSale.create({
      data: {
        mediaId,
        buyerEmail: purchaseData.buyerEmail,
        buyerName: purchaseData.buyerName,
        price: media.price,
        paymentId: purchaseData.paymentId,
        status: 'completed',
      },
    });

    // Update media sales count and earnings
    await prisma.media.update({
      where: { id: mediaId },
      data: {
        sales: {
          increment: 1,
        },
        totalEarnings: {
          increment: media.price,
        },
      },
    });

    return sale;
  }

  async getUserEarnings(userId: string) {
    // Handle both user ID and email-based identification
    let whereClause: any = {};

    // Check if userId is an email (NextAuth users) or user ID
    if (userId.includes('@')) {
      // It's an email, find user by email first
      const user = await prisma.user.findUnique({
        where: { email: userId },
        select: { id: true },
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      whereClause.uploadedBy = user.id;
    } else {
      // It's a user ID
      whereClause.uploadedBy = userId;
    }

    const media = await prisma.media.findMany({
      where: whereClause,
      select: {
        totalEarnings: true,
        sales: true,
      },
    });

    const totalEarnings = media.reduce((sum, m) => sum + m.totalEarnings, 0);
    const totalSales = media.reduce((sum, m) => sum + m.sales, 0);

    // Get withdrawal history (if you implement withdrawal tracking)
    const withdrawals = await this.getWithdrawalHistory(userId);

    return {
      totalEarnings,
      totalSales,
      availableBalance: totalEarnings, // For now, all earnings are available
      withdrawals,
    };
  }

  async requestWithdrawal(userId: string, amount: number, bankDetails: any) {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    // Handle both user ID and email-based identification
    let actualUserId = userId;
    if (userId.includes('@')) {
      const user = await prisma.user.findUnique({
        where: { email: userId },
        select: { id: true },
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      actualUserId = user.id;
    }

    const earnings = await this.getUserEarnings(actualUserId);
    
    if (amount > earnings.availableBalance) {
      throw new Error('Insufficient balance');
    }

    // Create withdrawal request record
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: actualUserId,
        amount,
        method: 'bank_transfer',
        accountDetails: bankDetails,
        status: 'PENDING',
      },
    });
    
    return {
      withdrawalId: withdrawal.id,
      amount: withdrawal.amount,
      status: withdrawal.status,
      requestedAt: withdrawal.requestedAt,
    };
  }

  private async getMonthlyEarnings(userId: string) {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const sales = await prisma.mediaSale.findMany({
      where: {
        media: {
          uploadedBy: userId,
        },
        createdAt: {
          gte: twelveMonthsAgo,
        },
      },
      select: {
        price: true,
        createdAt: true,
      },
    });

    // Group by month
    const monthlyData: { [key: string]: number } = {};
    
    sales.forEach(sale => {
      const monthKey = `${sale.createdAt.getFullYear()}-${String(sale.createdAt.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + sale.price;
    });

    // Fill in missing months with 0
    const result = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      result.push({
        month: monthKey,
        earnings: monthlyData[monthKey] || 0,
      });
    }

    return result;
  }

  private async getCategoryBreakdown(userId: string) {
    const categories = await prisma.media.groupBy({
      by: ['category'],
      where: {
        uploadedBy: userId,
      },
      _count: {
        id: true,
      },
      _sum: {
        likes: true,
        views: true,
        sales: true,
        totalEarnings: true,
      },
    });

    return categories.map(cat => ({
      category: cat.category,
      count: cat._count.id,
      totalLikes: cat._sum.likes || 0,
      totalViews: cat._sum.views || 0,
      totalSales: cat._sum.sales || 0,
      totalEarnings: cat._sum.totalEarnings || 0,
    }));
  }

  private async getWithdrawalHistory(userId: string) {
    // Placeholder for withdrawal history
    // In a real implementation, you would query a withdrawals table
    return [];
  }

  private getEmptyMonthlyEarnings() {
    // Generate empty monthly earnings for the last 12 months
    const result = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      result.push({
        month: monthKey,
        earnings: 0,
      });
    }
    return result;
  }
}
