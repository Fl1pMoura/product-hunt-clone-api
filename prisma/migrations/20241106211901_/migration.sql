/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "productId" UUID,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_url_key" ON "products"("url");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
