/*
  Warnings:

  - You are about to drop the column `TableId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_TableId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "TableId",
ADD COLUMN     "tableId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
