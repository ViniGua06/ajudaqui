-- CreateEnum
CREATE TYPE "MissingType" AS ENUM ('ANIMAL', 'PERSON', 'SMALL_SIZE_OBJECT', 'MEDIUM_SIZE_OBJECT', 'LARGE_SIZE_OBJECT');

-- CreateEnum
CREATE TYPE "MissingVisibilityType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ChatMessageType" AS ENUM ('IMAGE', 'VIDEO', 'TEXT', 'AUDIO');

-- CreateEnum
CREATE TYPE "PrivateMissingPermissionType" AS ENUM ('ACCEPTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Missing" (
    "id" SERIAL NOT NULL,
    "photo" TEXT,
    "name" TEXT NOT NULL,
    "type" "MissingType" NOT NULL,
    "visbility" "MissingVisibilityType" NOT NULL,
    "reward" DECIMAL(65,30),
    "desc" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "missingDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Missing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "missingId" INTEGER NOT NULL,

    CONSTRAINT "KeyPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "missingId" INTEGER NOT NULL,
    "messageType" "ChatMessageType" NOT NULL,
    "message" TEXT NOT NULL,
    "authorid" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateMissingPermission" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "type" "PrivateMissingPermissionType" NOT NULL,
    "missingId" INTEGER NOT NULL,

    CONSTRAINT "PrivateMissingPermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeyPoint" ADD CONSTRAINT "KeyPoint_missingId_fkey" FOREIGN KEY ("missingId") REFERENCES "Missing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_missingId_fkey" FOREIGN KEY ("missingId") REFERENCES "Missing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMissingPermission" ADD CONSTRAINT "PrivateMissingPermission_personId_fkey" FOREIGN KEY ("personId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMissingPermission" ADD CONSTRAINT "PrivateMissingPermission_missingId_fkey" FOREIGN KEY ("missingId") REFERENCES "Missing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
