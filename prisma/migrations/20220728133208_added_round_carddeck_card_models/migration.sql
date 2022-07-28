-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "cardDeckId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardDeck" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "CardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "cardDeckId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Round_cardDeckId_key" ON "Round"("cardDeckId");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_cardDeckId_fkey" FOREIGN KEY ("cardDeckId") REFERENCES "CardDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardDeckId_fkey" FOREIGN KEY ("cardDeckId") REFERENCES "CardDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
