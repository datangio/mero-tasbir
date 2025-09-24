-- CreateTable
CREATE TABLE "public"."event_packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_packages_pkey" PRIMARY KEY ("id")
);
