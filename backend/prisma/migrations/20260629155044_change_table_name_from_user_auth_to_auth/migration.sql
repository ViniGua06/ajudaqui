/*
  Warnings:

  - You are about to drop the column `userAuthId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the `UserAuth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `AuthId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userAuthId_fkey";

-- DropForeignKey
ALTER TABLE "UserAuth" DROP CONSTRAINT "UserAuth_userId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "userAuthId",
ADD COLUMN     "AuthId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserAuth";

-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_AuthId_fkey" FOREIGN KEY ("AuthId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
