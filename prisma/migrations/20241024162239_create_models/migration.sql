-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvotes" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upvotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_profile" (
    "id" TEXT NOT NULL,
    "display_name" TEXT,
    "bio" TEXT,
    "avatar_url" TEXT,

    CONSTRAINT "users_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "upvotes_user_id_product_id_key" ON "upvotes"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
