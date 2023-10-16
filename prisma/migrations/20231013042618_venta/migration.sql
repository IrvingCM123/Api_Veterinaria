/*
  Warnings:

  - You are about to drop the column `venta_porcion` on the `Venta` table. All the data in the column will be lost.
  - Changed the type of `cantidad_granel_vendida` on the `DetalleVentaPorcion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DetalleVentaPorcion" DROP COLUMN "cantidad_granel_vendida",
ADD COLUMN     "cantidad_granel_vendida" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "venta_porcion";
