import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los vendedores
export async function getAllVendedores() {
    return await prisma.catalogoVendedor.findMany({
        include: {
            usuario: true,
        },
    });
}

// Obtener un vendedor por su ID
export async function getVendedorById(id: any) {
    return await prisma.catalogoVendedor.findUnique({
        where: { id_vendedor: id },
        include: {
            usuario: true,
        },
    });
}

// Crear un nuevo vendedor
export async function createVendedor(acronimo: any, permisoVenta: any, userId: any) {
    return await prisma.catalogoVendedor.create({
        data: {
            acronimo,
            permisoVenta,
            usuario: {
                connect: {
                    id_usuario: userId,
                },
            },
        },
        include: {
            usuario: true,
        },
    });
}

// Actualizar un vendedor por su ID
export async function updateVendedor(id: any, acronimo: any, permisoVenta: any, userId: any) {
    return await prisma.catalogoVendedor.update({
        where: { id_vendedor: id },
        data: {
            acronimo,
            permisoVenta,
            usuario: {
                connect: {
                    id_usuario: userId,
                },
            },
        },
        include: {
            usuario: true,
        },
    });
}

// Eliminar un vendedor por su ID
export async function deleteVendedor(id: any) {
    return await prisma.catalogoVendedor.delete({
        where: { id_vendedor: id },
    });
}

