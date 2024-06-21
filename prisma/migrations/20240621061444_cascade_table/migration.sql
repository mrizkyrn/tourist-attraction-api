-- DropForeignKey
ALTER TABLE "attraction_approvals" DROP CONSTRAINT "attraction_approvals_attraction_id_fkey";

-- DropForeignKey
ALTER TABLE "attraction_approvals" DROP CONSTRAINT "attraction_approvals_username_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_attraction_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_username_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_attraction_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_username_fkey";

-- DropForeignKey
ALTER TABLE "tourist_attractions" DROP CONSTRAINT "tourist_attractions_username_fkey";

-- AddForeignKey
ALTER TABLE "tourist_attractions" ADD CONSTRAINT "tourist_attractions_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attraction_approvals" ADD CONSTRAINT "attraction_approvals_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attraction_approvals" ADD CONSTRAINT "attraction_approvals_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
