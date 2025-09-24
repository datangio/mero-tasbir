-- CreateTable
CREATE TABLE "public"."event_hero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "video" TEXT,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "ctaText" TEXT NOT NULL DEFAULT 'Learn More',
    "ctaLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_hero_pkey" PRIMARY KEY ("id")
);
