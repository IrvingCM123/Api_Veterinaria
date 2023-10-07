import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las marcas
export async function getAllMarcas() {
    return await prisma.catalogoMarca.findMany();
}

// Obtener una marca por su ID
export async function getMarcaById(id: number) {
    return await prisma.catalogoMarca.findUnique({
        where: { id_marca: id },
    });
}

// Crear una nueva marca
export async function createMarca(nombre: string, nomenclatura: string) {
    return await prisma.catalogoMarca.create({
        data: {
            nombre,
            nomenclatura,
        },
    });
}

// Actualizar una marca por su ID
export async function updateMarca(id: number, nombre: string, nomenclatura: string) {
    return await prisma.catalogoMarca.update({
        where: { id_marca: id },
        data: {
            nombre,
            nomenclatura,
        },
    });
}

// Eliminar una marca por su ID
export async function deleteMarca(id: number) {
    return await prisma.catalogoMarca.delete({
        where: { id_marca: id },
    });
}
