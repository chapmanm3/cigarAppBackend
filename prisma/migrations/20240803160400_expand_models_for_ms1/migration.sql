/*
  Warnings:

  - You are about to alter the column `name` on the `Cigar` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `image` on the `Cigar` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `Humidor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `Lounge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Cigar` ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `humidorId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Humidor` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Lounge` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Humidor` ADD CONSTRAINT `Humidor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cigar` ADD CONSTRAINT `Cigar_humidorId_fkey` FOREIGN KEY (`humidorId`) REFERENCES `Humidor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cigar` ADD CONSTRAINT `Cigar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
