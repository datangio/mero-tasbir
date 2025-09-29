-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."catering_services" ADD COLUMN     "advanceBookingDays" INTEGER,
ADD COLUMN     "allergens" TEXT[],
ADD COLUMN     "availableDays" TEXT[],
ADD COLUMN     "dietaryInfo" TEXT[],
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "advanceBookingDays" INTEGER,
ADD COLUMN     "availableFrom" TIMESTAMP(3),
ADD COLUMN     "color" TEXT,
ADD COLUMN     "condition" TEXT,
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."event_equipment_rentals" ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "damageCost" DOUBLE PRECISION,
ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "deliveryNotes" TEXT,
ADD COLUMN     "securityDeposit" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "accessibilityNeeds" TEXT,
ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "dietaryRestrictions" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "maxGuests" INTEGER,
ADD COLUMN     "minGuests" INTEGER;

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TEXT NOT NULL,
    "eventLocation" TEXT NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "packageType" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "packagePrice" TEXT NOT NULL,
    "specialRequirements" TEXT,
    "bookingType" TEXT,
    "businessType" TEXT,
    "personalType" TEXT,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);
