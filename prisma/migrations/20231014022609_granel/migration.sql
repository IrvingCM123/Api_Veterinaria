-- CreateTable
CREATE TABLE "inventario_granel" (
    "id_inventario_granel" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad_producto" TEXT NOT NULL,
    "cantidad_restante" TEXT NOT NULL,

    CONSTRAINT "inventario_granel_pkey" PRIMARY KEY ("id_inventario_granel")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventario_granel_id_producto_key" ON "inventario_granel"("id_producto");

-- AddForeignKey
ALTER TABLE "inventario_granel" ADD CONSTRAINT "inventario_granel_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
