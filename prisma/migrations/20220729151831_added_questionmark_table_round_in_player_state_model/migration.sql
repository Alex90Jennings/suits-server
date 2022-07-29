-- DropForeignKey
ALTER TABLE "PlayerState" DROP CONSTRAINT "PlayerState_roundId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerState" DROP CONSTRAINT "PlayerState_tableId_fkey";

-- AlterTable
ALTER TABLE "PlayerState" ALTER COLUMN "tableId" DROP NOT NULL,
ALTER COLUMN "roundId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PlayerState" ADD CONSTRAINT "PlayerState_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerState" ADD CONSTRAINT "PlayerState_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE SET NULL ON UPDATE CASCADE;
