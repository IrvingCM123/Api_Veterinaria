/*
  Warnings:

  - Added the required column `id_animal` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Productos" ADD COLUMN     "id_animal" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CatalagoAnimal" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nomenclatura" TEXT NOT NULL,

    CONSTRAINT "CatalagoAnimal_pkey" PRIMARY KEY ("id_categoria")
);

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "CatalagoAnimal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
