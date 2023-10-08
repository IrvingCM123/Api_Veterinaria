import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los detalles de venta
export async function getAllDetallesVenta() {
    return await prisma.detalleVenta.findMany({
        include: {
            venta: true,
            productoInventario: true,
            detallesVentaPorcion: true,
            Productos: true,
        },
    });
}

// Obtener un detalle de venta por su ID de detalle
export async function getDetalleVentaById(id: number) {
    return await prisma.detalleVenta.findUnique({
        where: { id_detalleVenta: id },
        include: {
            venta: true,
            productoInventario: true,
            detallesVentaPorcion: true,
            Productos: true,
        },
    });
}

// Crear un nuevo detalle de venta
export async function createDetalleVenta(
    id_venta: number,
    id_producto: number,
    cantidad_vendida: string,
    precio_producto: string,
    subtotal: string
) {
    return await prisma.detalleVenta.create({
        data: {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
        },
        include: {
            venta: true,
            productoInventario: true,
            detallesVentaPorcion: true,
            Productos: true,
        },
    });
}

// Actualizar un detalle de venta por su ID de detalle
export async function updateDetalleVenta(
    id: number,
    id_venta: number,
    id_producto: number,
    cantidad_vendida: string,
    precio_producto: string,
    subtotal: string
) {
    return await prisma.detalleVenta.update({
        where: { id_detalleVenta: id },
        data: {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
        },
        include: {
            venta: true,
            productoInventario: true,
            detallesVentaPorcion: true,
            Productos: true,
        },
    });
}

// Eliminar un detalle de venta por su ID de detalle
export async function deleteDetalleVenta(id: number) {
    return await prisma.detalleVenta.delete({
        where: { id_detalleVenta: id },
    });
}
