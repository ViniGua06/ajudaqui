/*
  Warnings:

  - You are about to drop the column `authorid` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_authorid_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "authorid",
DROP COLUMN "sentAt";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
