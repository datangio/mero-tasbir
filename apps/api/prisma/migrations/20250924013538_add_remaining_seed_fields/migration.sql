-- AlterTable
ALTER TABLE "public"."catering_services" ADD COLUMN     "servingStyle" TEXT;

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "monthlyRentalPrice" DOUBLE PRECISION,
ADD COLUMN     "serialNumber" TEXT,
ADD COLUMN     "specifications" JSONB;

-- AlterTable
ALTER TABLE "public"."event_catering_services" ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."event_equipment_rentals" ADD COLUMN     "dailyRate" DOUBLE PRECISION,
ADD COLUMN     "pickupDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "country" TEXT;
