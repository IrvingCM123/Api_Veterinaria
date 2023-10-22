// inventarioGranelAccessData.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los registros de inventario granel
export async function getAllInventarioGranel() {
    return await prisma.inventario_granel.findMany({
        include: {
            producto: true,
        },
    });
}

// Obtener un registro de inventario granel por su ID
export async function getInventarioGranelById(id: any) {
    return await prisma.inventario_granel.findUnique({
        where: { id_inventario_granel: id },
        include: {
            producto: true,
        },
    });
}

// Crear un registro de inventario granel
export async function createInventarioGranel(inventarioGranelData: { id_producto: number; cantidad_producto: string; cantidad_restante: string; }) {
    return await prisma.inventario_granel.create({
        data: inventarioGranelData,
    });
}

// Actualizar un registro de inventario granel por su ID
export async function updateInventarioGranel(id: any, inventarioGranelData: { id_producto: number; cantidad_producto: string; cantidad_restante: string; }) {
    return await prisma.inventario_granel.update({
        where: { id_inventario_granel: id },
        data: inventarioGranelData,
        include: {
            producto: true,
        },
    });
}

// Eliminar un registro de inventario granel por su ID
export async function deleteInventarioGranel(id: any) {
    return await prisma.inventario_granel.delete({
        where: { id_inventario_granel: id },
    });
}
