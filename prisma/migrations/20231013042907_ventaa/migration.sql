/*
  Warnings:

  - Added the required column `venta_granel` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "venta_granel" BOOLEAN NOT NULL;
