-- DropForeignKey
ALTER TABLE "DetalleVentaPorcion" DROP CONSTRAINT "DetalleVentaPorcion_id_detalleVenta_fkey";

-- DropIndex
DROP INDEX "DetalleVenta_id_venta_key";
