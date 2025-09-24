-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."CateringCategory" ADD VALUE 'FOOD';
ALTER TYPE "public"."CateringCategory" ADD VALUE 'BEVERAGE';
ALTER TYPE "public"."CateringCategory" ADD VALUE 'DESSERT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."EquipmentCategory" ADD VALUE 'SOUND_SYSTEM';
ALTER TYPE "public"."EquipmentCategory" ADD VALUE 'FURNITURE';
ALTER TYPE "public"."EquipmentCategory" ADD VALUE 'KITCHEN';

-- AlterEnum
ALTER TYPE "public"."EventStatus" ADD VALUE 'PUBLISHED';

-- AlterTable
ALTER TABLE "public"."catering_services" ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "pricePerPerson" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "dailyRentalPrice" DOUBLE PRECISION,
ADD COLUMN     "securityDeposit" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."event_catering_services" ADD COLUMN     "customInstructions" TEXT;

-- AlterTable
ALTER TABLE "public"."event_equipment_rentals" ADD COLUMN     "rentalEndDate" TIMESTAMP(3),
ADD COLUMN     "rentalStartDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "duration" INTEGER;

-- AlterTable
ALTER TABLE "public"."media" ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "originalName" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "uploadedBy" TEXT;
