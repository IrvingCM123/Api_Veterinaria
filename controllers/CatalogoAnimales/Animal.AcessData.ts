import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los animales
export async function getAllAnimales() {
    return await prisma.catalagoAnimal.findMany();
}

// Obtener un animal por su ID
export async function getAnimalById(id: number) {
    return await prisma.catalagoAnimal.findUnique({
        where: { id_categoria: id },
    });
}

// Crear un nuevo animal
export async function createAnimal(nombre: string, nomenclatura: string) {
    return await prisma.catalagoAnimal.create({
        data: {
            nombre,
            nomenclatura
        },
    });
}

// Actualizar un animal por su ID
export async function updateAnimal(id: number, nombre: string, nomenclatura: string) {
    return await prisma.catalagoAnimal.update({
        where: { id_categoria: id },
        data: {
            nombre,
            nomenclatura
        },
    });
}

// Eliminar un animal por su ID
export async function deleteAnimal(id: number) {
    return await prisma.catalagoAnimal.delete({
        where: { id_categoria: id },
    });
}
