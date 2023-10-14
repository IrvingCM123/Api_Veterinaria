/*
  Warnings:

  - You are about to drop the column `cantidad_granel_vendida` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_vendida` on the `DetalleVentaPorcion` table. All the data in the column will be lost.
  - Added the required column `cantidad_granel_vendida` to the `DetalleVentaPorcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `DetalleVentaPorcion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleVenta" DROP COLUMN "cantidad_granel_vendida";

-- AlterTable
ALTER TABLE "DetalleVentaPorcion" DROP COLUMN "cantidad_vendida",
ADD COLUMN     "cantidad_granel_vendida" TEXT NOT NULL,
ADD COLUMN     "subtotal" INTEGER NOT NULL;
