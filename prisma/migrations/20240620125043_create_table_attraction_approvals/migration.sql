-- CreateTable
CREATE TABLE "attraction_approvals" (
    "id" SERIAL NOT NULL,
    "attraction_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attraction_approvals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attraction_approvals" ADD CONSTRAINT "attraction_approvals_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "tourist_attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attraction_approvals" ADD CONSTRAINT "attraction_approvals_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
