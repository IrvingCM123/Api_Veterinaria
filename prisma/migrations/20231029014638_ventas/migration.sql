-- RenameForeignKey
ALTER TABLE "DetalleVenta" RENAME CONSTRAINT "DetalleVenta_id_producto_fkey" TO "detalleVentaProducto";

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "detalleVentaProductoProductos" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
