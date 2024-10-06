/*
  Warnings:

  - The primary key for the `config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `configName` on the `config` table. All the data in the column will be lost.
  - You are about to drop the column `configValue` on the `config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "config" DROP CONSTRAINT "config_pkey",
DROP COLUMN "configName",
DROP COLUMN "configValue",
ADD COLUMN     "allowed_email_domains" JSONB DEFAULT '[]',
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "config_pkey" PRIMARY KEY ("id");
