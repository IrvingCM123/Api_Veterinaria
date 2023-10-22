import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las sucursales
export async function getAllSucursales() {
    return await prisma.sucursal.findMany({
        include: {
            ventas: true,
        }
    });
}

// Obtener una sucursal por su ID
export async function getSucursalById(id: number) {
    return await prisma.sucursal.findUnique({
        where: { id_sucursal: id },
        include: {
            ventas: true,
        }
    });
}

// Crear una nueva sucursal
export async function createSucursal(
    nombre: string,
    direccion: string,
    ciudad: string,
    estado: string,
    codigoPostal: string,
    telefono: string,
    encargado: string
) {
    return await prisma.sucursal.create({
        data: {
            nombre,
            direccion,
            ciudad,
            estado,
            codigoPostal,
            telefono,
            encargado,
        }
    });
}

// Actualizar una sucursal por su ID
export async function updateSucursal(
    id: number,
    nombre: string,
    direccion: string,
    ciudad: string,
    estado: string,
    codigoPostal: string,
    telefono: string,
    encargado: string
) {
    return await prisma.sucursal.update({
        where: { id_sucursal: id },
        data: {
            nombre,
            direccion,
            ciudad,
            estado,
            codigoPostal,
            telefono,
            encargado,
        }
    });
}

// Eliminar una sucursal por su ID
export async function deleteSucursal(id: number) {
    return await prisma.sucursal.delete({
        where: { id_sucursal: id },
    });
}
