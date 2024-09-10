/*
  Warnings:

  - You are about to drop the column `productmage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productmage`,
    ADD COLUMN `productImage` VARCHAR(191) NULL;
