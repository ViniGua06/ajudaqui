-- CreateEnum
CREATE TYPE "PrivateInviteType" AS ENUM ('SENT_BY_AUTHOR', 'SENT_BY_PARTICIPANT');

-- DropForeignKey
ALTER TABLE "PrivateMissingPermission" DROP CONSTRAINT "PrivateMissingPermission_missingId_fkey";

-- DropForeignKey
ALTER TABLE "PrivateMissingPermission" DROP CONSTRAINT "PrivateMissingPermission_personId_fkey";

-- CreateTable
CREATE TABLE "PrivateInvite" (
    "id" SERIAL NOT NULL,
    "type" "PrivateInviteType" NOT NULL,
    "missingId" INTEGER NOT NULL,

    CONSTRAINT "PrivateInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrivateMissingPermission" ADD CONSTRAINT "PrivateMissingPermission_personId_fkey" FOREIGN KEY ("personId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMissingPermission" ADD CONSTRAINT "PrivateMissingPermission_missingId_fkey" FOREIGN KEY ("missingId") REFERENCES "Missing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateInvite" ADD CONSTRAINT "PrivateInvite_missingId_fkey" FOREIGN KEY ("missingId") REFERENCES "Missing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
