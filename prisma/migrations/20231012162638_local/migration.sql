/*
  Warnings:

  - You are about to drop the column `productosId` on the `DetalleVentaPorcion` table. All the data in the column will be lost.
  - Added the required column `cantidad_granel_vendida` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_producto` to the `DetalleVentaPorcion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cantidad_vendida` on the `DetalleVentaPorcion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `precio_granel` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venta_granel` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venta_porcion` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetalleVentaPorcion" DROP CONSTRAINT "DetalleVentaPorcion_id_producto_fkey";

-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "cantidad_granel_vendida" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetalleVentaPorcion" DROP COLUMN "productosId",
ADD COLUMN     "cantidad_producto" INTEGER NOT NULL,
DROP COLUMN "cantidad_vendida",
ADD COLUMN     "cantidad_vendida" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Inventario" ALTER COLUMN "id_producto" DROP DEFAULT;
DROP SEQUENCE "Inventario_id_producto_seq";

-- AlterTable
ALTER TABLE "Productos" ADD COLUMN     "precio_granel" TEXT NOT NULL,
ADD COLUMN     "venta_granel" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "venta_porcion" BOOLEAN NOT NULL,
ALTER COLUMN "id_vendedor" DROP DEFAULT,
ALTER COLUMN "id_sucursal" DROP DEFAULT;
DROP SEQUENCE "Venta_id_vendedor_seq";
DROP SEQUENCE "Venta_id_sucursal_seq";

-- AddForeignKey
ALTER TABLE "DetalleVentaPorcion" ADD CONSTRAINT "DetalleVentaPorcion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Inventario"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
