-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hostTableId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hostTableId_fkey" FOREIGN KEY ("hostTableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
