/*
  Warnings:

  - Added the required column `targetId` to the `PrivateInvite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrivateInvite" ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PrivateInvite" ADD CONSTRAINT "PrivateInvite_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
