/*
  Warnings:

  - You are about to drop the column `productosId` on the `DetalleVenta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_productosId_fkey";

-- AlterTable
ALTER TABLE "DetalleVenta" DROP COLUMN "productosId";
