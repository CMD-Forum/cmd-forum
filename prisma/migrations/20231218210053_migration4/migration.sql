/*
  Warnings:

  - You are about to drop the column `postId` on the `Community` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_postId_fkey";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "communityId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
