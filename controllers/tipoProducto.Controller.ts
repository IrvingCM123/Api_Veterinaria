import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los tipos de productos
export async function getAllTipoCantidad() {
    return await prisma.catalogoTipoCantidad.findMany();
}

// Obtener un tipo de producto por su ID
export async function getTipoCantidadById(id: number) {
    return await prisma.catalogoTipoCantidad.findUnique({
        where: { id_tipoCantidad: id },
    });
}

// Crear un nuevo tipo de producto
export async function createTipoCantidad(nombre: string, nomenclatura: string) {
    return await prisma.catalogoTipoCantidad.create({
        data: {
            nombre,
            nomenclatura
        },
    });
}

// Actualizar un tipo de producto por su ID
export async function updateTipoCantidad(id: number, nombre: string, nomenclatura: string) {
    return await prisma.catalogoTipoCantidad.update({
        where: { id_tipoCantidad: id },
        data: {
            nombre,
            nomenclatura
        },
    });
}

// Eliminar un tipo de producto por su ID
export async function deleteTipoCantidad(id: number) {
    return await prisma.catalogoTipoCantidad.delete({
        where: { id_tipoCantidad: id },
    });
}










