import { PrismaClient } from "../generated/prisma";
import { CreateMediaData, UpdateMediaData, MediaCategory } from "../types/media.types";

const prisma = new PrismaClient();

export class MediaService {
  async createMedia(data: CreateMediaData) {
    // Validate client name requirement for client portfolio
    if (data.category === MediaCategory.CLIENT_PORTFOLIO && !data.clientName) {
      throw new Error('Client name is required for client portfolio media');
    }

    return await prisma.media.create({
      data: {
        ...data,
        tags: data.tags || [],
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getMediaById(id: string) {
    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    return media;
  }

  async getAllMedia(params: {
    page?: number;
    limit?: number;
    category?: MediaCategory;
    search?: string;
    isActive?: boolean;
  }) {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      isActive = true,
    } = params;

    const skip = (page - 1) * limit;

    const where: any = {
      isActive,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.media.count({ where }),
    ]);

    return {
      data: media,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateMedia(id: string, data: UpdateMediaData) {
    // Validate client name requirement for client portfolio
    if (data.category === MediaCategory.CLIENT_PORTFOLIO && !data.clientName) {
      throw new Error('Client name is required for client portfolio media');
    }

    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      throw new Error('Media not found');
    }

    return await prisma.media.update({
      where: { id },
      data: {
        ...data,
        tags: data.tags || existingMedia.tags,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteMedia(id: string) {
    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      throw new Error('Media not found');
    }

    return await prisma.media.delete({
      where: { id },
    });
  }

  async getMediaStats() {
    const [total, byCategory, recent] = await Promise.all([
      prisma.media.count({ where: { isActive: true } }),
      prisma.media.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: { category: true },
      }),
      prisma.media.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          originalName: true,
          category: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      total,
      byCategory: byCategory.reduce((acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      }, {} as Record<string, number>),
      recent,
    };
  }

  async getMediaByCategory(category: MediaCategory) {
    return await prisma.media.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getClientPortfolio(clientName: string) {
    return await prisma.media.findMany({
      where: {
        category: MediaCategory.CLIENT_PORTFOLIO,
        clientName: {
          contains: clientName,
          mode: 'insensitive',
        },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}




