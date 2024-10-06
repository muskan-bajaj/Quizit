/*
  Warnings:

  - The primary key for the `config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allowed_email_domains` on the `config` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `config` table. All the data in the column will be lost.
  - Added the required column `configName` to the `config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "config" DROP CONSTRAINT "config_pkey",
DROP COLUMN "allowed_email_domains",
DROP COLUMN "id",
ADD COLUMN     "configName" TEXT NOT NULL,
ADD COLUMN     "configValue" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "description" TEXT,
ADD CONSTRAINT "config_pkey" PRIMARY KEY ("configName");
