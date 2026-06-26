/*
  Warnings:

  - You are about to drop the column `message` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `messageType` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "message",
DROP COLUMN "messageType";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageType" "ChatMessageType" NOT NULL,
    "message" TEXT NOT NULL,
    "authorid" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
