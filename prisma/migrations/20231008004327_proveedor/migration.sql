/*
  Warnings:

  - Added the required column `ciudad` to the `CatalogoProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `CatalogoProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `CatalogoProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `CatalogoProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `CatalogoProveedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CatalogoProveedor" ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;
