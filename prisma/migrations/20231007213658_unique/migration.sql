/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `CatalogoCategoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomenclatura]` on the table `CatalogoCategoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `CatalogoMarca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomenclatura]` on the table `CatalogoMarca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `CatalogoProveedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomenclatura]` on the table `CatalogoProveedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[acronimo]` on the table `CatalogoVendedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CatalogoCategoria_nombre_key" ON "CatalogoCategoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoCategoria_nomenclatura_key" ON "CatalogoCategoria"("nomenclatura");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoMarca_nombre_key" ON "CatalogoMarca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoMarca_nomenclatura_key" ON "CatalogoMarca"("nomenclatura");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoProveedor_nombre_key" ON "CatalogoProveedor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoProveedor_nomenclatura_key" ON "CatalogoProveedor"("nomenclatura");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoVendedor_acronimo_key" ON "CatalogoVendedor"("acronimo");
