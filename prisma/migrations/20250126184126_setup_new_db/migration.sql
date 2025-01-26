/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Cigar` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Humidor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Cigar` DROP FOREIGN KEY `Cigar_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Humidor` DROP FOREIGN KEY `Humidor_userId_fkey`;

-- AlterTable
ALTER TABLE `Cigar` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Humidor` MODIFY `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `User`;
