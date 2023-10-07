/*
  Warnings:

  - You are about to drop the column `marca` on the `Productos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Productos` table. All the data in the column will be lost.
  - The primary key for the `Sucursal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Sucursal` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ciudad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPostal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_sucursal]` on the table `Sucursal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_usuario]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_categoria` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_marca` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_proveedor` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sucursal` to the `Sucursal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Sucursal_id_key";

-- AlterTable
ALTER TABLE "Productos" DROP COLUMN "marca",
DROP COLUMN "tipo",
ADD COLUMN     "id_categoria" TEXT NOT NULL,
ADD COLUMN     "id_marca" TEXT NOT NULL,
ADD COLUMN     "id_proveedor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sucursal" DROP CONSTRAINT "Sucursal_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_sucursal" TEXT NOT NULL,
ADD CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id_sucursal");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "ciudad",
DROP COLUMN "codigoPostal",
DROP COLUMN "estado",
DROP COLUMN "role",
ADD COLUMN     "id_usuario" TEXT NOT NULL,
ADD COLUMN     "imagen" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_usuario");

-- CreateTable
CREATE TABLE "CatalogoProveedor" (
    "id_proveedor" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nomenclatura" TEXT NOT NULL,

    CONSTRAINT "CatalogoProveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "CatalogoMarca" (
    "id_marca" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nomenclatura" TEXT NOT NULL,

    CONSTRAINT "CatalogoMarca_pkey" PRIMARY KEY ("id_marca")
);

-- CreateTable
CREATE TABLE "CatalogoCategoria" (
    "id_categoria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nomenclatura" TEXT NOT NULL,

    CONSTRAINT "CatalogoCategoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id_inventario" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "existencias" TEXT NOT NULL,
    "StockMinimo" TEXT NOT NULL,
    "StockMaximo" TEXT NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "id_detalleVenta" TEXT NOT NULL,
    "id_venta" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "cantidad_vendida" TEXT NOT NULL,
    "precio_producto" TEXT NOT NULL,
    "subtotal" TEXT NOT NULL,

    CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("id_detalleVenta")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id_venta" TEXT NOT NULL,
    "id_vendedor" TEXT NOT NULL,
    "id_sucursal" TEXT NOT NULL,
    "fecha_venta" TEXT NOT NULL,
    "total_venta" TEXT NOT NULL,
    "subtotal" TEXT NOT NULL,
    "iva" TEXT NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id_venta")
);

-- CreateTable
CREATE TABLE "CatalogoVendedor" (
    "id_vendedor" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "acronimo" TEXT NOT NULL,
    "permisoVenta" BOOLEAN NOT NULL,

    CONSTRAINT "CatalogoVendedor_pkey" PRIMARY KEY ("id_vendedor")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoProveedor_id_proveedor_key" ON "CatalogoProveedor"("id_proveedor");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoMarca_id_marca_key" ON "CatalogoMarca"("id_marca");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoCategoria_id_categoria_key" ON "CatalogoCategoria"("id_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_id_inventario_key" ON "Inventario"("id_inventario");

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_id_producto_key" ON "Inventario"("id_producto");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleVenta_id_detalleVenta_key" ON "DetalleVenta"("id_detalleVenta");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_id_venta_key" ON "Venta"("id_venta");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogoVendedor_id_vendedor_key" ON "CatalogoVendedor"("id_vendedor");

-- CreateIndex
CREATE UNIQUE INDEX "Sucursal_id_sucursal_key" ON "Sucursal"("id_sucursal");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_usuario_key" ON "User"("id_usuario");

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "CatalogoMarca"("id_marca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "CatalogoProveedor"("id_proveedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "CatalogoCategoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "Venta"("id_venta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Inventario"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_id_sucursal_fkey" FOREIGN KEY ("id_sucursal") REFERENCES "Sucursal"("id_sucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_id_vendedor_fkey" FOREIGN KEY ("id_vendedor") REFERENCES "CatalogoVendedor"("id_vendedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogoVendedor" ADD CONSTRAINT "CatalogoVendedor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "User"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
