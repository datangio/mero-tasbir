/**
 * Seed script for Event Management System
 * Populates the database with sample events, catering services, and equipment
 */

import { PrismaClient, EventType, EventStatus, EquipmentCategory, EquipmentStatus, CateringCategory } from '../generated/prisma';

const prisma = new PrismaClient();

async function seedEventData() {
  console.log('🌱 Starting event management data seeding...');

  try {
    // Create sample events
    console.log('📅 Creating sample events...');
    
    const events = await Promise.all([
      prisma.event.create({
        data: {
          title: 'Royal Wedding Ceremony',
          description: 'A grand wedding ceremony with traditional and modern elements',
          eventType: EventType.WEDDING,
          status: EventStatus.PUBLISHED,
          eventDate: new Date('2024-06-15'),
          startTime: '10:00',
          endTime: '22:00',
          duration: 12,
          location: 'Kathmandu, Nepal',
          address: 'Hotel Yak & Yeti, Durbar Marg',
          city: 'Kathmandu',
          state: 'Bagmati',
          country: 'Nepal',
          expectedGuests: 200,
          minGuests: 150,
          maxGuests: 250,
          basePrice: 50000,
          totalPrice: 50000,
          finalPrice: 45000,
          discountAmount: 5000,
          contactName: 'Rajesh Sharma',
          contactEmail: 'rajesh.sharma@email.com',
          contactPhone: '+977-9841234567',
          specialRequests: 'Focus on candid moments and traditional ceremonies',
          dietaryRestrictions: 'Vegetarian options required',
          accessibilityNeeds: 'Wheelchair accessible venue required',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
            'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800'
          ],
          adminNotes: 'High priority client, VIP treatment required'
        }
      }),
      prisma.event.create({
        data: {
          title: 'Corporate Annual Meeting',
          description: 'Annual corporate meeting with presentations and networking',
          eventType: EventType.CORPORATE,
          status: EventStatus.PUBLISHED,
          eventDate: new Date('2024-07-20'),
          startTime: '09:00',
          endTime: '17:00',
          duration: 8,
          location: 'Pokhara, Nepal',
          address: 'Fishtail Lodge, Fewa Lake',
          city: 'Pokhara',
          state: 'Gandaki',
          country: 'Nepal',
          expectedGuests: 50,
          minGuests: 30,
          maxGuests: 80,
          basePrice: 15000,
          totalPrice: 15000,
          finalPrice: 15000,
          contactName: 'Priya Gurung',
          contactEmail: 'priya.gurung@company.com',
          contactPhone: '+977-9851234567',
          specialRequests: 'Professional photography for presentations',
          adminNotes: 'Standard corporate package'
        }
      }),
      prisma.event.create({
        data: {
          title: 'Birthday Celebration',
          description: '50th birthday celebration with family and friends',
          eventType: EventType.BIRTHDAY,
          status: EventStatus.DRAFT,
          eventDate: new Date('2024-08-10'),
          startTime: '18:00',
          endTime: '23:00',
          duration: 5,
          location: 'Lalitpur, Nepal',
          address: 'Garden of Dreams, Thamel',
          city: 'Lalitpur',
          state: 'Bagmati',
          country: 'Nepal',
          expectedGuests: 30,
          minGuests: 20,
          maxGuests: 40,
          basePrice: 8000,
          totalPrice: 8000,
          finalPrice: 8000,
          contactName: 'Sita Maharjan',
          contactEmail: 'sita.maharjan@email.com',
          contactPhone: '+977-9861234567',
          specialRequests: 'Cake cutting ceremony and group photos',
          adminNotes: 'Family event, casual atmosphere'
        }
      })
    ]);

    console.log(`✅ Created ${events.length} events`);

    // Create sample catering services
    console.log('🍽️ Creating sample catering services...');
    
    const cateringServices = await Promise.all([
      prisma.cateringService.create({
        data: {
          name: 'Traditional Nepali Thali',
          description: 'Authentic Nepali thali with dal, bhat, tarkari, and achar',
          category: CateringCategory.FOOD,
          price: 500,
          basePrice: 500,
          pricePerPerson: 500,
          minOrderQuantity: 10,
          maxOrderQuantity: 100,
          preparationTime: 120,
          servingStyle: 'Thali',
          dietaryInfo: ['vegetarian', 'vegan-option'],
          allergens: ['gluten', 'dairy'],
          availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          advanceBookingDays: 3,
          images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'],
          adminNotes: 'Most popular traditional option'
        }
      }),
      prisma.cateringService.create({
        data: {
          name: 'Continental Buffet',
          description: 'International buffet with salads, main courses, and desserts',
          category: CateringCategory.FOOD,
          price: 800,
          basePrice: 800,
          pricePerPerson: 800,
          minOrderQuantity: 20,
          maxOrderQuantity: 200,
          preparationTime: 180,
          servingStyle: 'Buffet',
          dietaryInfo: ['vegetarian', 'non-vegetarian', 'vegan-option'],
          allergens: ['gluten', 'dairy', 'nuts'],
          availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          advanceBookingDays: 5,
          images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'],
          adminNotes: 'Premium option for special occasions'
        }
      }),
      prisma.cateringService.create({
        data: {
          name: 'Fresh Juice Bar',
          description: 'Fresh fruit juices and mocktails',
          category: CateringCategory.BEVERAGE,
          price: 200,
          basePrice: 200,
          pricePerPerson: 200,
          minOrderQuantity: 5,
          maxOrderQuantity: 50,
          preparationTime: 30,
          servingStyle: 'Bar Service',
          dietaryInfo: ['vegan', 'gluten-free'],
          allergens: [],
          availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          advanceBookingDays: 1,
          images: ['https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800'],
          adminNotes: 'Healthy beverage option'
        }
      }),
      prisma.cateringService.create({
        data: {
          name: 'Wedding Cake',
          description: 'Custom designed wedding cake with multiple tiers',
          category: CateringCategory.DESSERT,
          price: 3000,
          basePrice: 3000,
          pricePerPerson: 50,
          minOrderQuantity: 1,
          maxOrderQuantity: 10,
          preparationTime: 480,
          servingStyle: 'Plated',
          dietaryInfo: ['vegetarian'],
          allergens: ['gluten', 'dairy', 'eggs'],
          availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          advanceBookingDays: 7,
          images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800'],
          adminNotes: 'Requires detailed consultation for design'
        }
      })
    ]);

    console.log(`✅ Created ${cateringServices.length} catering services`);

    // Create sample equipment
    console.log('🎛️ Creating sample equipment...');
    
    const equipment = await Promise.all([
      prisma.equipment.create({
        data: {
          name: 'Professional Sound System',
          description: 'High-quality PA system with microphones and speakers',
          category: EquipmentCategory.SOUND_SYSTEM,
          status: EquipmentStatus.AVAILABLE,
          price: 2000,
          brand: 'JBL',
          model: 'EON615',
          serialNumber: 'JBL-EON615-001',
          specifications: {
            power: '1000W',
            frequency: '45Hz - 20kHz',
            connections: ['XLR', '1/4"', 'Bluetooth'],
            weight: 15.5
          },
          dailyRentalPrice: 2000,
          weeklyRentalPrice: 12000,
          monthlyRentalPrice: 40000,
          securityDeposit: 5000,
          advanceBookingDays: 3,
          dimensions: '30x20x15 inches',
          weight: 15.5,
          color: 'Black',
          condition: 'excellent',
        }
      }),
      prisma.equipment.create({
        data: {
          name: 'LED Stage Lighting Kit',
          description: 'Professional LED stage lighting with controller',
          category: EquipmentCategory.LIGHTING,
          status: EquipmentStatus.AVAILABLE,
          price: 1500,
          brand: 'Chauvet',
          model: 'DJ Intimidator Spot 355',
          serialNumber: 'CH-DJ-355-002',
          specifications: {
            power: '200W LED',
            colors: 'RGB',
            control: 'DMX',
            effects: ['Strobe', 'Color mixing', 'Patterns']
          },
          dailyRentalPrice: 1500,
          weeklyRentalPrice: 9000,
          monthlyRentalPrice: 30000,
          securityDeposit: 3000,
          advanceBookingDays: 2,
          dimensions: '12x8x6 inches',
          weight: 8.2,
          color: 'Black',
          condition: 'excellent',
        }
      }),
      prisma.equipment.create({
        data: {
          name: 'Round Dining Tables (8ft)',
          description: 'Elegant round dining tables for 8-10 people',
          category: EquipmentCategory.FURNITURE,
          status: EquipmentStatus.AVAILABLE,
          price: 500,
          brand: 'Custom',
          model: 'Round-8ft',
          specifications: {
            diameter: '8 feet',
            height: '30 inches',
            material: 'Wood',
            capacity: '8-10 people'
          },
          dailyRentalPrice: 500,
          weeklyRentalPrice: 3000,
          monthlyRentalPrice: 10000,
          securityDeposit: 1000,
          advanceBookingDays: 1,
          dimensions: '8ft diameter x 30in height',
          weight: 45,
          color: 'Brown',
          condition: 'good',
        }
      }),
      prisma.equipment.create({
        data: {
          name: 'Professional Photography Backdrop',
          description: 'High-quality photography backdrop with stand',
          category: EquipmentCategory.DECORATION,
          status: EquipmentStatus.AVAILABLE,
          price: 300,
          brand: 'Savage',
          model: 'Seamless Paper',
          specifications: {
            width: '9 feet',
            height: '12 feet',
            material: 'Seamless paper',
            colors: 'Multiple available'
          },
          dailyRentalPrice: 300,
          weeklyRentalPrice: 1800,
          monthlyRentalPrice: 6000,
          securityDeposit: 500,
          advanceBookingDays: 1,
          dimensions: '9ft x 12ft',
          weight: 5,
          color: 'White',
          condition: 'excellent',
        }
      }),
      prisma.equipment.create({
        data: {
          name: 'Commercial Coffee Machine',
          description: 'Professional espresso machine for events',
          category: EquipmentCategory.KITCHEN,
          status: EquipmentStatus.AVAILABLE,
          price: 1000,
          brand: 'La Marzocco',
          model: 'Linea Mini',
          serialNumber: 'LM-LINEA-003',
          specifications: {
            groupheads: 2,
            boiler: 'Dual boiler',
            pressure: '9 bar',
            capacity: '100 cups/hour'
          },
          dailyRentalPrice: 1000,
          weeklyRentalPrice: 6000,
          monthlyRentalPrice: 20000,
          securityDeposit: 2000,
          advanceBookingDays: 2,
          dimensions: '24x16x18 inches',
          weight: 25,
          color: 'Stainless Steel',
          condition: 'excellent',
        }
      })
    ]);

    console.log(`✅ Created ${equipment.length} equipment items`);

    // Create sample event catering services
    console.log('🍽️ Creating sample event catering services...');
    
    const eventCateringServices = await Promise.all([
      prisma.eventCateringService.create({
        data: {
          eventId: events[0].id,
          cateringServiceId: cateringServices[0].id,
          quantity: 200,
          unitPrice: 500,
          totalPrice: 100000,
          customInstructions: 'Extra spicy for main course',
          specialDietaryRequirements: 'Separate vegetarian and non-vegetarian sections',
          isConfirmed: true,
          isDelivered: false
        }
      }),
      prisma.eventCateringService.create({
        data: {
          eventId: events[0].id,
          cateringServiceId: cateringServices[1].id,
          quantity: 200,
          unitPrice: 800,
          totalPrice: 160000,
          customInstructions: 'International cuisine for reception',
          isConfirmed: true,
          isDelivered: false
        }
      }),
      prisma.eventCateringService.create({
        data: {
          eventId: events[0].id,
          cateringServiceId: cateringServices[2].id,
          quantity: 200,
          unitPrice: 200,
          totalPrice: 40000,
          customInstructions: 'Fresh seasonal fruits only',
          isConfirmed: true,
          isDelivered: false
        }
      }),
      prisma.eventCateringService.create({
        data: {
          eventId: events[1].id,
          cateringServiceId: cateringServices[1].id,
          quantity: 50,
          unitPrice: 800,
          totalPrice: 40000,
          customInstructions: 'Business lunch format',
          isConfirmed: true,
          isDelivered: false
        }
      })
    ]);

    console.log(`✅ Created ${eventCateringServices.length} event catering services`);

    // Create sample event equipment rentals
    console.log('🎛️ Creating sample event equipment rentals...');
    
    const eventEquipmentRentals = await Promise.all([
      prisma.eventEquipmentRental.create({
        data: {
          eventId: events[0].id,
          equipmentId: equipment[0].id,
          quantity: 1,
          unitPrice: 2000,
          startDate: new Date('2024-06-14'),
          endDate: new Date('2024-06-16'),
          rentalStartDate: new Date('2024-06-14'),
          rentalEndDate: new Date('2024-06-16'),
          rentalDays: 2,
          dailyRate: 2000,
          totalPrice: 4000,
          securityDeposit: 5000,
          status: 'CONFIRMED',
          deliveryAddress: 'Hotel Yak & Yeti, Durbar Marg, Kathmandu',
          deliveryDate: new Date('2024-06-14T08:00:00Z'),
          deliveryNotes: 'Deliver to main hall, setup required',
          adminNotes: 'VIP event, priority delivery'
        }
      }),
      prisma.eventEquipmentRental.create({
        data: {
          eventId: events[0].id,
          equipmentId: equipment[1].id,
          quantity: 1,
          unitPrice: 1500,
          startDate: new Date('2024-06-14'),
          endDate: new Date('2024-06-16'),
          rentalStartDate: new Date('2024-06-14'),
          rentalEndDate: new Date('2024-06-16'),
          rentalDays: 2,
          dailyRate: 1500,
          totalPrice: 3000,
          securityDeposit: 3000,
          status: 'CONFIRMED',
          deliveryAddress: 'Hotel Yak & Yeti, Durbar Marg, Kathmandu',
          deliveryDate: new Date('2024-06-14T08:00:00Z'),
          deliveryNotes: 'Setup in reception area',
          adminNotes: 'Coordinate with sound system setup'
        }
      }),
      prisma.eventEquipmentRental.create({
        data: {
          eventId: events[0].id,
          equipmentId: equipment[2].id,
          quantity: 20,
          unitPrice: 500,
          startDate: new Date('2024-06-15'),
          endDate: new Date('2024-06-15'),
          rentalStartDate: new Date('2024-06-15'),
          rentalEndDate: new Date('2024-06-15'),
          rentalDays: 1,
          dailyRate: 500,
          totalPrice: 10000,
          securityDeposit: 1000,
          status: 'CONFIRMED',
          deliveryAddress: 'Hotel Yak & Yeti, Durbar Marg, Kathmandu',
          deliveryDate: new Date('2024-06-15T09:00:00Z'),
          deliveryNotes: '20 tables required',
          adminNotes: 'Standard wedding setup'
        }
      }),
      prisma.eventEquipmentRental.create({
        data: {
          eventId: events[1].id,
          equipmentId: equipment[0].id,
          quantity: 1,
          unitPrice: 2000,
          startDate: new Date('2024-07-20'),
          endDate: new Date('2024-07-20'),
          rentalStartDate: new Date('2024-07-20'),
          rentalEndDate: new Date('2024-07-20'),
          rentalDays: 1,
          dailyRate: 2000,
          totalPrice: 2000,
          securityDeposit: 5000,
          status: 'PENDING',
          deliveryAddress: 'Fishtail Lodge, Fewa Lake, Pokhara',
          deliveryNotes: 'Corporate presentation setup',
          adminNotes: 'Standard corporate package'
        }
      })
    ]);

    console.log(`✅ Created ${eventEquipmentRentals.length} event equipment rentals`);

    console.log('🎉 Event management data seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Events: ${events.length}`);
    console.log(`   - Catering Services: ${cateringServices.length}`);
    console.log(`   - Equipment: ${equipment.length}`);
    console.log(`   - Event Catering Services: ${eventCateringServices.length}`);
    console.log(`   - Event Equipment Rentals: ${eventEquipmentRentals.length}`);

  } catch (error) {
    console.error('❌ Error seeding event management data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
if (require.main === module) {
  seedEventData()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export default seedEventData;




















