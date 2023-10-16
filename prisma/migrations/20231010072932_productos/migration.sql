/*
  Warnings:

  - Added the required column `id_tipoCantidad` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Productos" ADD COLUMN     "id_tipoCantidad" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CatalogoTipoCantidad" (
    "id_tipoCantidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nomenclatura" TEXT NOT NULL,

    CONSTRAINT "CatalogoTipoCantidad_pkey" PRIMARY KEY ("id_tipoCantidad")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoTipoCantidad_nombre_key" ON "CatalogoTipoCantidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoTipoCantidad_nomenclatura_key" ON "CatalogoTipoCantidad"("nomenclatura");

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_tipoCantidad_fkey" FOREIGN KEY ("id_tipoCantidad") REFERENCES "CatalogoTipoCantidad"("id_tipoCantidad") ON DELETE RESTRICT ON UPDATE CASCADE;
