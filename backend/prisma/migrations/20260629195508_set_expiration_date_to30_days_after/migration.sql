-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT (CURRENT_TIMESTAMP + interval '30 days');
