/*
  Warnings:

  - You are about to drop the column `id_producto` on the `DetalleVenta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "detalleVentaProducto";

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "detalleVentaProductoProductos";

-- AlterTable
ALTER TABLE "DetalleVenta" DROP COLUMN "id_producto";

-- CreateTable
CREATE TABLE "_DetalleVentaToProductos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DetalleVentaToProductos_AB_unique" ON "_DetalleVentaToProductos"("A", "B");

-- CreateIndex
CREATE INDEX "_DetalleVentaToProductos_B_index" ON "_DetalleVentaToProductos"("B");

-- AddForeignKey
ALTER TABLE "_DetalleVentaToProductos" ADD CONSTRAINT "_DetalleVentaToProductos_A_fkey" FOREIGN KEY ("A") REFERENCES "DetalleVenta"("id_detalleVenta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetalleVentaToProductos" ADD CONSTRAINT "_DetalleVentaToProductos_B_fkey" FOREIGN KEY ("B") REFERENCES "Productos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
