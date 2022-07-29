/*
  Warnings:

  - You are about to drop the column `cardDeckId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `hostTableId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardDeck` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[playerStateId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerStateId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_cardDeckId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_cardDeckId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_hostTableId_fkey";

-- DropIndex
DROP INDEX "Round_cardDeckId_key";

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "cardDeckId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentTrick" TEXT,
ADD COLUMN     "numberCards" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "trumps" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "isInGame" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hostTableId",
ADD COLUMN     "isHost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playerStateId" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "CardDeck";

-- CreateTable
CREATE TABLE "PlayerState" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "bet" INTEGER NOT NULL DEFAULT 0,
    "roundId" INTEGER NOT NULL,
    "hand" TEXT,
    "handsWon" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_playerStateId_key" ON "User"("playerStateId");

-- AddForeignKey
ALTER TABLE "PlayerState" ADD CONSTRAINT "PlayerState_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerState" ADD CONSTRAINT "PlayerState_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerStateId_fkey" FOREIGN KEY ("playerStateId") REFERENCES "PlayerState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
