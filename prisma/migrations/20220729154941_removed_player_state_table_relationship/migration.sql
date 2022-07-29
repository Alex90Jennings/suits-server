/*
  Warnings:

  - You are about to drop the column `tableId` on the `PlayerState` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerState" DROP CONSTRAINT "PlayerState_tableId_fkey";

-- AlterTable
ALTER TABLE "PlayerState" DROP COLUMN "tableId",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Round" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
