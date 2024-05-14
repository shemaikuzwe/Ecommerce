/*
  Warnings:

  - Added the required column `description` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
