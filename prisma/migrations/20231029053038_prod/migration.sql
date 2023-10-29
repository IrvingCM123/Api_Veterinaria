/*
  Warnings:

  - A unique constraint covering the columns `[codigo_barras]` on the table `Productos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Productos_codigo_barras_key" ON "Productos"("codigo_barras");
