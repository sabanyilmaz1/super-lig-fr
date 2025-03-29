-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'WRITER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
