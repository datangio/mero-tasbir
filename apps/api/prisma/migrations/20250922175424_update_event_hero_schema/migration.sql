/*
  Warnings:

  - You are about to drop the column `ctaLink` on the `event_hero` table. All the data in the column will be lost.
  - You are about to drop the column `ctaText` on the `event_hero` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `event_hero` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `event_hero` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `event_hero` table. All the data in the column will be lost.
  - Added the required column `mediaUrl` to the `event_hero` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `event_hero` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."event_hero" DROP COLUMN "ctaLink",
DROP COLUMN "ctaText",
DROP COLUMN "image",
DROP COLUMN "subtitle",
DROP COLUMN "video",
ADD COLUMN     "mediaUrl" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
