-- AlterTable
ALTER TABLE "CatalogoProveedor" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "productosId" INTEGER,
ALTER COLUMN "id_venta" DROP DEFAULT,
ALTER COLUMN "id_producto" DROP DEFAULT;
DROP SEQUENCE "DetalleVenta_id_venta_seq";
DROP SEQUENCE "DetalleVenta_id_producto_seq";

-- CreateTable
CREATE TABLE "DetalleVentaPorcion" (
    "id_detalleVentaPorcion" SERIAL NOT NULL,
    "id_detalleVenta" INTEGER NOT NULL,
    "cantidad_vendida" TEXT NOT NULL,
    "ventaId_venta" INTEGER,

    CONSTRAINT "DetalleVentaPorcion_pkey" PRIMARY KEY ("id_detalleVentaPorcion")
);

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productosId_fkey" FOREIGN KEY ("productosId") REFERENCES "Productos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentaPorcion" ADD CONSTRAINT "DetalleVentaPorcion_id_detalleVenta_fkey" FOREIGN KEY ("id_detalleVenta") REFERENCES "DetalleVenta"("id_venta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentaPorcion" ADD CONSTRAINT "DetalleVentaPorcion_ventaId_venta_fkey" FOREIGN KEY ("ventaId_venta") REFERENCES "Venta"("id_venta") ON DELETE SET NULL ON UPDATE CASCADE;
