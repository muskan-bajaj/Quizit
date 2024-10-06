-- CreateEnum
CREATE TYPE "role" AS ENUM ('Admin', 'Student', 'Teacher');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'Student';
