-- AlterTable
ALTER TABLE "User" ADD COLUMN     "supportId" INTEGER;

-- CreateTable
CREATE TABLE "Support" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL DEFAULT '# Support Article 
 Edit this article!',

    CONSTRAINT "Support_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Support_authorId_key" ON "Support"("authorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_supportId_fkey" FOREIGN KEY ("supportId") REFERENCES "Support"("authorId") ON DELETE SET NULL ON UPDATE CASCADE;
