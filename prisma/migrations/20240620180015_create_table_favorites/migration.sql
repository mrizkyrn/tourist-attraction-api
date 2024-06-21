-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "attraction_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
