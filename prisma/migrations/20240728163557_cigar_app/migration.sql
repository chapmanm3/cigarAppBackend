/*
  Warnings:

  - Added the required column `description` to the `Cigar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cigar` ADD COLUMN `description` LONGTEXT NOT NULL;
