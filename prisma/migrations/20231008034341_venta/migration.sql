/*
  Warnings:

  - Added the required column `id_producto` to the `DetalleVentaPorcion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleVentaPorcion" ADD COLUMN     "id_producto" INTEGER NOT NULL,
ADD COLUMN     "productosId" INTEGER;

-- AddForeignKey
ALTER TABLE "DetalleVentaPorcion" ADD CONSTRAINT "DetalleVentaPorcion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
