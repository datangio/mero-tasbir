-- AlterTable
ALTER TABLE "public"."catering_services" ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "maxOrderQuantity" INTEGER,
ADD COLUMN     "minOrderQuantity" INTEGER,
ADD COLUMN     "preparationTime" INTEGER;

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "model" TEXT,
ADD COLUMN     "weeklyRentalPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."event_catering_services" ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specialDietaryRequirements" TEXT;

-- AlterTable
ALTER TABLE "public"."event_equipment_rentals" ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "rentalDays" INTEGER;

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "state" TEXT;
