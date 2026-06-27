/*
  Warnings:

  - You are about to drop the column `cpf` on the `UserAuth` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "UserAuth" DROP COLUMN "cpf",
DROP COLUMN "phone";
