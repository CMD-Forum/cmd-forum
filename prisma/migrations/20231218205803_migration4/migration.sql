/*
  Warnings:

  - You are about to drop the column `community` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "community";

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
