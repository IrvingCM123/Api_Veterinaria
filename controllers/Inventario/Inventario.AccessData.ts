import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllInventario() {
    return await prisma.inventario.findMany({
        include: {
            producto: true,
        },
    });
}

export async function getInventarioByProducto(producto: any) {
    return await prisma.productos.findFirst({
        where: { nombre: producto }
    });
}

export async function getInventarioByProductId(id_producto: any) {
    return await prisma.inventario.findUnique({
        where: { id_producto },
        include: {
            producto: true,
        },
    });
}

export async function createInventario(id_producto: any, existencias: any, StockMinimo: any, StockMaximo: any) {
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

export async function updateInventario(id_producto: any, existencias: any, StockMinimo: any, StockMaximo: any) {
    return await prisma.inventario.update({
        where: { id_producto },
        data: {
            existencias: existencias,
            StockMinimo: StockMinimo,
            StockMaximo: StockMaximo,
        },
        include: {
            producto: true,
        },
    });
}

export async function deleteInventario(id_producto: any) {
    return await prisma.inventario.delete({
        where: { id_producto },
    });
}

