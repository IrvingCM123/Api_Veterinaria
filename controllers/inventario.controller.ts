import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los registros de inventario
export async function getAllInventario() {
    return await prisma.inventario.findMany({
        include: {
            producto: true,
        },
    });
}

export async function getInventarioByProducto(producto: string) {
    return await prisma.productos.findFirst({
        where: { nombre: producto }
    });
}

// Obtener un registro de inventario por su ID de producto
export async function getInventarioByProductId(id_producto: number) {
    return await prisma.inventario.findUnique({
        where: { id_producto },
        include: {
            producto: true,
        },
    });
}

// Crear un nuevo registro de inventario
export async function createInventario(id_producto: number, existencias: string, StockMinimo: string, StockMaximo: string) {
    return await prisma.inventario.create({
        data: {
            id_producto,
            existencias,
            StockMinimo,
            StockMaximo,
        },
        include: {
            producto: true,
        },
    });
}

// Actualizar un registro de inventario por su ID de producto
export async function updateInventario(id_producto: number, existencias: string, StockMinimo: string, StockMaximo: string) {
    return await prisma.inventario.update({
        where: { id_producto },
        data: {
            existencias,
            StockMinimo,
            StockMaximo,
        },
        include: {
            producto: true,
        },
    });
}

// Eliminar un registro de inventario por su ID de producto
export async function deleteInventario(id_producto: number) {
    return await prisma.inventario.delete({
        where: { id_producto },
    });
}
