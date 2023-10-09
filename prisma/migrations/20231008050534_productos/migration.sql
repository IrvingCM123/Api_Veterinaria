/*
  Warnings:

  - Added the required column `cantidad` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Productos" ADD COLUMN     "cantidad" TEXT NOT NULL;
