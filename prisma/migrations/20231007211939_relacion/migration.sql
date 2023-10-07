/*
  Warnings:

  - The primary key for the `CatalogoCategoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_categoria` column on the `CatalogoCategoria` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CatalogoMarca` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_marca` column on the `CatalogoMarca` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CatalogoProveedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_proveedor` column on the `CatalogoProveedor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CatalogoVendedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_vendedor` column on the `CatalogoVendedor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_usuario` column on the `CatalogoVendedor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DetalleVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_detalleVenta` column on the `DetalleVenta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_venta` column on the `DetalleVenta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_producto` column on the `DetalleVenta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Inventario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_inventario` column on the `Inventario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_producto` column on the `Inventario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Productos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Productos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sucursal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_sucursal` column on the `Sucursal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_usuario` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_venta` column on the `Venta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_vendedor` column on the `Venta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_sucursal` column on the `Venta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id_venta]` on the table `DetalleVenta` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id_categoria` on the `Productos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_marca` on the `Productos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_proveedor` on the `Productos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CatalogoVendedor" DROP CONSTRAINT "CatalogoVendedor_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_id_producto_fkey";

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_id_venta_fkey";

-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_id_producto_fkey";

-- DropForeignKey
ALTER TABLE "Productos" DROP CONSTRAINT "Productos_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Productos" DROP CONSTRAINT "Productos_id_marca_fkey";

-- DropForeignKey
ALTER TABLE "Productos" DROP CONSTRAINT "Productos_id_proveedor_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_id_sucursal_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_id_vendedor_fkey";

-- DropIndex
DROP INDEX "CatalogoCategoria_id_categoria_key";

-- DropIndex
DROP INDEX "CatalogoMarca_id_marca_key";

-- DropIndex
DROP INDEX "CatalogoProveedor_id_proveedor_key";

-- DropIndex
DROP INDEX "CatalogoVendedor_id_vendedor_key";

-- DropIndex
DROP INDEX "DetalleVenta_id_detalleVenta_key";

-- DropIndex
DROP INDEX "Inventario_id_inventario_key";

-- DropIndex
DROP INDEX "Productos_id_key";

-- DropIndex
DROP INDEX "Sucursal_id_sucursal_key";

-- DropIndex
DROP INDEX "User_id_usuario_key";

-- DropIndex
DROP INDEX "Venta_id_venta_key";

-- AlterTable
ALTER TABLE "CatalogoCategoria" DROP CONSTRAINT "CatalogoCategoria_pkey",
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" SERIAL NOT NULL,
ADD CONSTRAINT "CatalogoCategoria_pkey" PRIMARY KEY ("id_categoria");

-- AlterTable
ALTER TABLE "CatalogoMarca" DROP CONSTRAINT "CatalogoMarca_pkey",
DROP COLUMN "id_marca",
ADD COLUMN     "id_marca" SERIAL NOT NULL,
ADD CONSTRAINT "CatalogoMarca_pkey" PRIMARY KEY ("id_marca");

-- AlterTable
ALTER TABLE "CatalogoProveedor" DROP CONSTRAINT "CatalogoProveedor_pkey",
DROP COLUMN "id_proveedor",
ADD COLUMN     "id_proveedor" SERIAL NOT NULL,
ADD CONSTRAINT "CatalogoProveedor_pkey" PRIMARY KEY ("id_proveedor");

-- AlterTable
ALTER TABLE "CatalogoVendedor" DROP CONSTRAINT "CatalogoVendedor_pkey",
DROP COLUMN "id_vendedor",
ADD COLUMN     "id_vendedor" SERIAL NOT NULL,
DROP COLUMN "id_usuario",
ADD COLUMN     "id_usuario" SERIAL NOT NULL,
ADD CONSTRAINT "CatalogoVendedor_pkey" PRIMARY KEY ("id_vendedor");

-- AlterTable
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_pkey",
DROP COLUMN "id_detalleVenta",
ADD COLUMN     "id_detalleVenta" SERIAL NOT NULL,
DROP COLUMN "id_venta",
ADD COLUMN     "id_venta" SERIAL NOT NULL,
DROP COLUMN "id_producto",
ADD COLUMN     "id_producto" SERIAL NOT NULL,
ADD CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("id_detalleVenta");

-- AlterTable
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_pkey",
DROP COLUMN "id_inventario",
ADD COLUMN     "id_inventario" SERIAL NOT NULL,
DROP COLUMN "id_producto",
ADD COLUMN     "id_producto" SERIAL NOT NULL,
ADD CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario");

-- AlterTable
ALTER TABLE "Productos" DROP CONSTRAINT "Productos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
DROP COLUMN "id_marca",
ADD COLUMN     "id_marca" INTEGER NOT NULL,
DROP COLUMN "id_proveedor",
ADD COLUMN     "id_proveedor" INTEGER NOT NULL,
ADD CONSTRAINT "Productos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sucursal" DROP CONSTRAINT "Sucursal_pkey",
DROP COLUMN "id_sucursal",
ADD COLUMN     "id_sucursal" SERIAL NOT NULL,
ADD CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id_sucursal");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id_usuario",
ADD COLUMN     "id_usuario" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_usuario");

-- AlterTable
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_pkey",
DROP COLUMN "id_venta",
ADD COLUMN     "id_venta" SERIAL NOT NULL,
DROP COLUMN "id_vendedor",
ADD COLUMN     "id_vendedor" SERIAL NOT NULL,
DROP COLUMN "id_sucursal",
ADD COLUMN     "id_sucursal" SERIAL NOT NULL,
ADD CONSTRAINT "Venta_pkey" PRIMARY KEY ("id_venta");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleVenta_id_venta_key" ON "DetalleVenta"("id_venta");

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_id_producto_key" ON "Inventario"("id_producto");

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
