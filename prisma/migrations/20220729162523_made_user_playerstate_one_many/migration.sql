/*
  Warnings:

  - You are about to drop the column `playerStateId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PlayerState` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_playerStateId_fkey";

-- DropIndex
DROP INDEX "User_playerStateId_key";

-- AlterTable
ALTER TABLE "PlayerState" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "playerStateId";

-- AddForeignKey
ALTER TABLE "PlayerState" ADD CONSTRAINT "PlayerState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
