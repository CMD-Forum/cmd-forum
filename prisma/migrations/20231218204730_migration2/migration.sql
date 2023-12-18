-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "public" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "administrators" JSONB NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");
