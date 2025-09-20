/**
 * Event Management Service
 * Handles business logic for events, catering services, and equipment rental
 */

import { PrismaClient, EventType, EventStatus, EquipmentCategory, EquipmentStatus, CateringCategory } from '../generated/prisma';
import {
  CreateEventRequest,
  UpdateEventRequest,
  EventQueryParams,
  CreateCateringServiceRequest,
  UpdateCateringServiceRequest,
  CateringServiceQueryParams,
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
  EquipmentQueryParams,
  CreateEventCateringServiceRequest,
  UpdateEventCateringServiceRequest,
  CreateEventEquipmentRentalRequest,
  UpdateEventEquipmentRentalRequest,
  EventStatsResponse
} from '../types/event.types';

const prisma = new PrismaClient();

// Event Service
export class EventService {
  // Create a new event
  async createEvent(data: CreateEventRequest) {
    // Calculate pricing
    const totalPrice = Number(data.basePrice || 0);
    const discountAmount = Number(data.discountAmount || 0);
    const finalPrice = Math.max(0, totalPrice - discountAmount);

    const event = await prisma.event.create({
      data: {
        ...data,
        eventDate: new Date(data.eventDate),
        basePrice: totalPrice,
        totalPrice: totalPrice,
        discountAmount: discountAmount,
        finalPrice: finalPrice,
      },
      include: {
        cateringServices: {
          include: {
            cateringService: true
          }
        },
        equipmentRentals: {
          include: {
            equipment: true
          }
        }
      }
    });

    return event;
  }

  // Get event by ID
  async getEventById(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        cateringServices: {
          include: {
            cateringService: true
          }
        },
        equipmentRentals: {
          include: {
            equipment: true
          }
        }
      }
    });
  }

  // Get all events with filtering and pagination
  async getEvents(params: EventQueryParams) {
    const {
      page = 1,
      limit = 10,
      eventType,
      status,
      eventDateFrom,
      eventDateTo,
      location,
      city,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (eventType) where.eventType = eventType;
    if (status) where.status = status;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (city) where.city = { contains: city, mode: 'insensitive' };

    if (eventDateFrom || eventDateTo) {
      where.eventDate = {};
      if (eventDateFrom) where.eventDate.gte = new Date(eventDateFrom);
      if (eventDateTo) where.eventDate.lte = new Date(eventDateTo);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { contactName: { contains: search, mode: 'insensitive' } },
        { contactEmail: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build orderBy clause
    const orderBy: Record<string, string> = {};
    orderBy[sortBy] = sortOrder;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          cateringServices: {
            include: {
              cateringService: true
            }
          },
          equipmentRentals: {
            include: {
              equipment: true
            }
          }
        }
      }),
      prisma.event.count({ where })
    ]);

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Update event
  async updateEvent(id: string, data: UpdateEventRequest) {
    // Recalculate pricing if base price or discount changes
    if (data.basePrice !== undefined || data.discountAmount !== undefined) {
      const event = await prisma.event.findUnique({
        where: { id },
        select: { basePrice: true, discountAmount: true }
      });

      if (event) {
        const basePrice = data.basePrice !== undefined ? Number(data.basePrice) : Number(event.basePrice);
        const discountAmount = data.discountAmount !== undefined ? Number(data.discountAmount) : Number(event.discountAmount);
        const totalPrice = basePrice;
        const finalPrice = Math.max(0, totalPrice - discountAmount);

        (data as Record<string, unknown>).totalPrice = totalPrice;
        (data as Record<string, unknown>).finalPrice = finalPrice;
      }
    }

    return await prisma.event.update({
      where: { id },
      data: {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined
      },
      include: {
        cateringServices: {
          include: {
            cateringService: true
          }
        },
        equipmentRentals: {
          include: {
            equipment: true
          }
        }
      }
    });
  }

  // Delete event
  async deleteEvent(id: string) {
    return await prisma.event.delete({
      where: { id }
    });
  }

  // Get event statistics
  async getEventStats(params: { startDate?: string; endDate?: string; eventType?: EventType; status?: EventStatus } = {}) {
    const { startDate, endDate, eventType, status } = params;

    // Build where clause for date range
    const where: Record<string, unknown> = {};
    if (startDate || endDate) {
      where.eventDate = {};
      if (startDate) where.eventDate.gte = new Date(startDate);
      if (endDate) where.eventDate.lte = new Date(endDate);
    }
    if (eventType) where.eventType = eventType;
    if (status) where.status = status;

    const [
      totalEvents,
      revenueData,
      monthlyRevenueData,
      eventsByType,
      eventsByStatus,
      popularCateringServices,
      popularEquipment
    ] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.aggregate({
        where,
        _sum: { finalPrice: true },
        _avg: { finalPrice: true }
      }),
      prisma.event.aggregate({
        where: {
          ...where,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { finalPrice: true }
      }),
      prisma.event.groupBy({
        by: ['eventType'],
        where,
        _count: { eventType: true },
        _sum: { finalPrice: true }
      }),
      prisma.event.groupBy({
        by: ['status'],
        where,
        _count: { status: true }
      }),
      prisma.eventCateringService.groupBy({
        by: ['cateringServiceId'],
        where: {
          event: where
        },
        _count: { cateringServiceId: true },
        _sum: { totalPrice: true },
        orderBy: { _count: { cateringServiceId: 'desc' } },
        take: 5
      }),
      prisma.eventEquipmentRental.groupBy({
        by: ['equipmentId'],
        where: {
          event: where
        },
        _count: { equipmentId: true },
        _sum: { totalPrice: true },
        orderBy: { _count: { equipmentId: 'desc' } },
        take: 5
      })
    ]);

    // Get service and equipment names
    const serviceIds = popularCateringServices.map(s => s.cateringServiceId);
    const equipmentIds = popularEquipment.map(e => e.equipmentId);

    const [services, equipment] = await Promise.all([
      prisma.cateringService.findMany({
        where: { id: { in: serviceIds } },
        select: { id: true, name: true }
      }),
      prisma.equipment.findMany({
        where: { id: { in: equipmentIds } },
        select: { id: true, name: true }
      })
    ]);

    return {
      totalEvents,
      totalRevenue: Number(revenueData._sum.finalPrice || 0),
      averageEventValue: Number(revenueData._avg.finalPrice || 0),
      monthlyRevenue: Number(monthlyRevenueData._sum.finalPrice || 0),
      eventsByType: eventsByType.map(e => ({
        eventType: e.eventType,
        count: e._count.eventType,
        revenue: Number(e._sum.finalPrice || 0)
      })),
      eventsByStatus: eventsByStatus.map(e => ({
        status: e.status,
        count: e._count.status
      })),
      popularCateringServices: popularCateringServices.map(s => ({
        serviceId: s.cateringServiceId,
        serviceName: services.find(service => service.id === s.cateringServiceId)?.name || 'Unknown',
        bookingCount: s._count.cateringServiceId,
        revenue: Number(s._sum.totalPrice || 0)
      })),
      popularEquipment: popularEquipment.map(e => ({
        equipmentId: e.equipmentId,
        equipmentName: equipment.find(eq => eq.id === e.equipmentId)?.name || 'Unknown',
        rentalCount: e._count.equipmentId,
        revenue: Number(e._sum.totalPrice || 0)
      }))
    };
  }
}

// Catering Service Service
export class CateringServiceService {
  // Create catering service
  async createCateringService(data: CreateCateringServiceRequest) {
    return await prisma.cateringService.create({
      data: {
        ...data,
        basePrice: Number(data.basePrice)
      }
    });
  }

  // Get catering service by ID
  async getCateringServiceById(id: string) {
    return await prisma.cateringService.findUnique({
      where: { id }
    });
  }

  // Get all catering services with filtering and pagination
  async getCateringServices(params: CateringServiceQueryParams) {
    const {
      page = 1,
      limit = 10,
      category,
      isActive,
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build orderBy clause
    const orderBy: Record<string, string> = {};
    orderBy[sortBy] = sortOrder;

    const [services, total] = await Promise.all([
      prisma.cateringService.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.cateringService.count({ where })
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Update catering service
  async updateCateringService(id: string, data: UpdateCateringServiceRequest) {
    return await prisma.cateringService.update({
      where: { id },
      data: {
        ...data,
        basePrice: data.basePrice ? Number(data.basePrice) : undefined
      }
    });
  }

  // Delete catering service
  async deleteCateringService(id: string) {
    return await prisma.cateringService.delete({
      where: { id }
    });
  }
}

// Equipment Service
export class EquipmentService {
  // Create equipment
  async createEquipment(data: CreateEquipmentRequest) {
    return await prisma.equipment.create({
      data: {
        ...data,
        dailyRentalPrice: Number(data.dailyRentalPrice),
        weeklyRentalPrice: data.weeklyRentalPrice ? Number(data.weeklyRentalPrice) : undefined,
        monthlyRentalPrice: data.monthlyRentalPrice ? Number(data.monthlyRentalPrice) : undefined,
        securityDeposit: data.securityDeposit ? Number(data.securityDeposit) : undefined,
        availableFrom: data.availableFrom ? new Date(data.availableFrom) : undefined,
        availableTo: data.availableTo ? new Date(data.availableTo) : undefined,
        weight: data.weight ? Number(data.weight) : undefined,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : undefined,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : undefined
      }
    });
  }

  // Get equipment by ID
  async getEquipmentById(id: string) {
    return await prisma.equipment.findUnique({
      where: { id }
    });
  }

  // Get all equipment with filtering and pagination
  async getEquipment(params: EquipmentQueryParams) {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (status) where.status = status;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build orderBy clause
    const orderBy: Record<string, string> = {};
    orderBy[sortBy] = sortOrder;

    const [equipment, total] = await Promise.all([
      prisma.equipment.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.equipment.count({ where })
    ]);

    return {
      equipment,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Update equipment
  async updateEquipment(id: string, data: UpdateEquipmentRequest) {
    return await prisma.equipment.update({
      where: { id },
      data: {
        ...data,
        dailyRentalPrice: data.dailyRentalPrice ? Number(data.dailyRentalPrice) : undefined,
        weeklyRentalPrice: data.weeklyRentalPrice ? Number(data.weeklyRentalPrice) : undefined,
        monthlyRentalPrice: data.monthlyRentalPrice ? Number(data.monthlyRentalPrice) : undefined,
        securityDeposit: data.securityDeposit ? Number(data.securityDeposit) : undefined,
        availableFrom: data.availableFrom ? new Date(data.availableFrom) : undefined,
        availableTo: data.availableTo ? new Date(data.availableTo) : undefined,
        weight: data.weight ? Number(data.weight) : undefined,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : undefined,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : undefined
      }
    });
  }

  // Delete equipment
  async deleteEquipment(id: string) {
    return await prisma.equipment.delete({
      where: { id }
    });
  }
}

// Event Catering Service Service
export class EventCateringServiceService {
  // Add catering service to event
  async addCateringServiceToEvent(data: CreateEventCateringServiceRequest) {
    // Get catering service details
    const cateringService = await prisma.cateringService.findUnique({
      where: { id: data.cateringServiceId }
    });

    if (!cateringService) {
      throw new Error('Catering service not found');
    }

    // Calculate pricing
    const unitPrice = cateringService.pricePerPerson 
      ? Number(cateringService.pricePerPerson)
      : Number(cateringService.basePrice);
    const totalPrice = unitPrice * data.quantity;

    return await prisma.eventCateringService.create({
      data: {
        ...data,
        unitPrice,
        totalPrice
      },
      include: {
        cateringService: true,
        event: true
      }
    });
  }

  // Update event catering service
  async updateEventCateringService(id: string, data: UpdateEventCateringServiceRequest) {
    // Recalculate pricing if quantity changes
    if (data.quantity !== undefined) {
      const eventCateringService = await prisma.eventCateringService.findUnique({
        where: { id },
        include: { cateringService: true }
      });

      if (eventCateringService) {
        const unitPrice = eventCateringService.cateringService.pricePerPerson 
          ? Number(eventCateringService.cateringService.pricePerPerson)
          : Number(eventCateringService.cateringService.basePrice);
        const totalPrice = unitPrice * data.quantity;

        (data as Record<string, unknown>).unitPrice = unitPrice;
        (data as Record<string, unknown>).totalPrice = totalPrice;
      }
    }

    return await prisma.eventCateringService.update({
      where: { id },
      data,
      include: {
        cateringService: true,
        event: true
      }
    });
  }

  // Remove catering service from event
  async removeCateringServiceFromEvent(id: string) {
    return await prisma.eventCateringService.delete({
      where: { id }
    });
  }
}

// Event Equipment Rental Service
export class EventEquipmentRentalService {
  // Add equipment rental to event
  async addEquipmentRentalToEvent(data: CreateEventEquipmentRentalRequest) {
    // Get equipment details
    const equipment = await prisma.equipment.findUnique({
      where: { id: data.equipmentId }
    });

    if (!equipment) {
      throw new Error('Equipment not found');
    }

    // Check availability
    if (equipment.status !== 'AVAILABLE') {
      throw new Error('Equipment is not available for rental');
    }

    // Calculate rental details
    const rentalStartDate = new Date(data.rentalStartDate);
    const rentalEndDate = new Date(data.rentalEndDate);
    const rentalDays = Math.ceil((rentalEndDate.getTime() - rentalStartDate.getTime()) / (1000 * 60 * 60 * 24));
    const dailyRate = Number(equipment.dailyRentalPrice);
    const totalPrice = dailyRate * rentalDays;
    const securityDeposit = Number(equipment.securityDeposit || 0);

    return await prisma.eventEquipmentRental.create({
      data: {
        ...data,
        rentalStartDate,
        rentalEndDate,
        rentalDays,
        dailyRate,
        totalPrice,
        securityDeposit
      },
      include: {
        equipment: true,
        event: true
      }
    });
  }

  // Update event equipment rental
  async updateEventEquipmentRental(id: string, data: UpdateEventEquipmentRentalRequest) {
    // Recalculate pricing if dates change
    if (data.rentalStartDate || data.rentalEndDate) {
      const rental = await prisma.eventEquipmentRental.findUnique({
        where: { id },
        include: { equipment: true }
      });

      if (rental) {
        const rentalStartDate = data.rentalStartDate ? new Date(data.rentalStartDate) : rental.rentalStartDate;
        const rentalEndDate = data.rentalEndDate ? new Date(data.rentalEndDate) : rental.rentalEndDate;
        const rentalDays = Math.ceil((rentalEndDate.getTime() - rentalStartDate.getTime()) / (1000 * 60 * 60 * 24));
        const dailyRate = Number(rental.equipment.dailyRentalPrice);
        const totalPrice = dailyRate * rentalDays;

        (data as Record<string, unknown>).rentalDays = rentalDays;
        (data as Record<string, unknown>).dailyRate = dailyRate;
        (data as Record<string, unknown>).totalPrice = totalPrice;
      }
    }

    return await prisma.eventEquipmentRental.update({
      where: { id },
      data: {
        ...data,
        rentalStartDate: data.rentalStartDate ? new Date(data.rentalStartDate) : undefined,
        rentalEndDate: data.rentalEndDate ? new Date(data.rentalEndDate) : undefined,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
        pickupDate: data.pickupDate ? new Date(data.pickupDate) : undefined,
        damageCost: data.damageCost ? Number(data.damageCost) : undefined
      },
      include: {
        equipment: true,
        event: true
      }
    });
  }

  // Remove equipment rental from event
  async removeEquipmentRentalFromEvent(id: string) {
    return await prisma.eventEquipmentRental.delete({
      where: { id }
    });
  }
}


