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
export async function getDetalleVentaById(id: any) {
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
export async function createDetalleVenta(id_venta: any, id_producto: any, cantidad_vendida: any, precio_producto: any, subtotal: any, venta_granel: any) {
    return await prisma.detalleVenta.create({
        data: {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
            venta_granel,
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
export async function updateDetalleVenta(id: any, id_venta: any, id_producto: any, cantidad_vendida: any, precio_producto: any, subtotal: any) {
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
export async function deleteDetalleVenta(id: any) {
    return await prisma.detalleVenta.delete({
        where: { id_detalleVenta: id },
    });
}
