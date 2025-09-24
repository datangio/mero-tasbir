/*
  Warnings:

  - The `status` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `eventType` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('WEDDING', 'CORPORATE', 'BIRTHDAY', 'ANNIVERSARY', 'CONFERENCE', 'PARTY', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."EquipmentCategory" AS ENUM ('PHOTOGRAPHY', 'VIDEOGRAPHY', 'LIGHTING', 'SOUND', 'STAGING', 'DECORATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EquipmentStatus" AS ENUM ('AVAILABLE', 'RENTED', 'MAINTENANCE', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "public"."CateringCategory" AS ENUM ('VEGETARIAN', 'NON_VEGETARIAN', 'VEGAN', 'CONTINENTAL', 'NEPALI', 'INDIAN', 'CHINESE', 'OTHER');

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "discountAmount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "finalPrice" DOUBLE PRECISION,
ADD COLUMN     "internalNotes" TEXT,
ADD COLUMN     "totalPrice" DOUBLE PRECISION,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "public"."EventType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."EventStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "public"."media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "size" INTEGER,
    "mimeType" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."catering_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "public"."CateringCategory" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'per_person',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catering_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "public"."EquipmentCategory" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'per_day',
    "status" "public"."EquipmentStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_catering_services" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "cateringServiceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_catering_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_equipment_rentals" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_equipment_rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_catering_services_eventId_cateringServiceId_key" ON "public"."event_catering_services"("eventId", "cateringServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "event_equipment_rentals_eventId_equipmentId_key" ON "public"."event_equipment_rentals"("eventId", "equipmentId");

-- AddForeignKey
ALTER TABLE "public"."event_catering_services" ADD CONSTRAINT "event_catering_services_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_catering_services" ADD CONSTRAINT "event_catering_services_cateringServiceId_fkey" FOREIGN KEY ("cateringServiceId") REFERENCES "public"."catering_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_equipment_rentals" ADD CONSTRAINT "event_equipment_rentals_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_equipment_rentals" ADD CONSTRAINT "event_equipment_rentals_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "public"."equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
