-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_playerStateId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "playerStateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerStateId_fkey" FOREIGN KEY ("playerStateId") REFERENCES "PlayerState"("id") ON DELETE SET NULL ON UPDATE CASCADE;
