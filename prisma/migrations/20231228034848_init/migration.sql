/*
  Warnings:

  - A unique constraint covering the columns `[display_name]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "display_name" VARCHAR(50) NOT NULL DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Community_display_name_key" ON "Community"("display_name");
