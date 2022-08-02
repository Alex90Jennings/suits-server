/*
  Warnings:

  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "PlayerState" ADD COLUMN     "playedCard" TEXT,
ADD COLUMN     "playsNext" BOOLEAN DEFAULT false,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "score" DROP DEFAULT,
ALTER COLUMN "bet" DROP NOT NULL,
ALTER COLUMN "bet" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "score" DROP DEFAULT;
