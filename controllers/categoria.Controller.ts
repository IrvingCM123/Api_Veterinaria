import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las categorías
export async function getAllCategorias() {
    return await prisma.catalogoCategoria.findMany();
}

// Obtener una categoría por su ID
export async function getCategoriaById(id: number) {
    return await prisma.catalogoCategoria.findUnique({
        where: { id_categoria: id },
    });
}

// Crear una nueva categoría
export async function createCategoria(nombre: string, nomenclatura: string) {
    return await prisma.catalogoCategoria.create({
        data: {
            nombre,
            nomenclatura,
        },
    });
}

// Actualizar una categoría por su ID
export async function updateCategoria(id: number, nombre: string, nomenclatura: string) {
    return await prisma.catalogoCategoria.update({
        where: { id_categoria: id },
        data: {
            nombre,
            nomenclatura,
        },
    });
}

// Eliminar una categoría por su ID
export async function deleteCategoria(id: number) {
    return await prisma.catalogoCategoria.delete({
        where: { id_categoria: id },
    });
}
