/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "authProvider" AS ENUM ('Email', 'Google');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "provider" "authProvider" NOT NULL DEFAULT 'Email',
ADD COLUMN     "providerToken" TEXT,
ADD COLUMN     "salt" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "config" (
    "configName" TEXT NOT NULL,
    "configValue" JSONB NOT NULL,

    CONSTRAINT "config_pkey" PRIMARY KEY ("configName")
);
