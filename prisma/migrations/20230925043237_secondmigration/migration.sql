/*
  Warnings:

  - You are about to drop the `Producto1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Producto1";

-- DropTable
DROP TABLE "Venta";

-- CreateTable
CREATE TABLE "Productos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "imagen" TEXT,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial_Venta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" TEXT NOT NULL,
    "cantidad" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,

    CONSTRAINT "Historial_Venta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_id_key" ON "Productos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Historial_Venta_id_key" ON "Historial_Venta"("id");
