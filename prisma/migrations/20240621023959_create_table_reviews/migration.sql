-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "attraction_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
