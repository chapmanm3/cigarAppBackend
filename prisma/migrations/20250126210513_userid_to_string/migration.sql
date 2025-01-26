-- DropIndex
DROP INDEX `Cigar_userId_fkey` ON `Cigar`;

-- DropIndex
DROP INDEX `Humidor_userId_fkey` ON `Humidor`;

-- AlterTable
ALTER TABLE `Cigar` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Humidor` MODIFY `userId` VARCHAR(191) NOT NULL;
