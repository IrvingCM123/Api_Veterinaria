import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las ventas
export async function getAllVentas() {
    return await prisma.venta.findMany({
        include: {
            sucursal: true,
            vendedor: true,
            detallesVenta: true,
        },
    });
}

// Obtener una venta por su ID
export async function getVentaById(id: number) {
    return await prisma.venta.findUnique({
        where: { id_venta: id },
        include: {
            sucursal: true,
            vendedor: true,
            detallesVenta: true,
        },
    });
}

// Función para obtener el ID del vendedor a partir de su acrónimo
async function obtenerIdVendedorPorAcronimo(acronimo: string) {
    const vendedor = await prisma.catalogoVendedor.findUnique({
        where: { acronimo },
    });

    if (!vendedor) {
        throw new Error(`Vendedor con acrónimo ${acronimo} no encontrado`);
    }

    return vendedor.id_vendedor;
}

// Función para crear un registro en la tabla DetalleVenta
async function crearDetalleVenta(
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
    });
  }

// Crear una nueva venta
export async function createVenta(id_sucursal: number, id_vendedor: string, fecha_venta: string, total_venta: string, subtotal: string, iva: string) {
    const idVendedor: any = await obtenerIdVendedorPorAcronimo(id_vendedor);

    return await prisma.venta.create({
        data: {
            id_sucursal,
            idVendedor,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
        },
        include: {
            sucursal: true,
            vendedor: true,
            detallesVenta: true,
        },
    });
}

// Actualizar una venta por su ID
export async function updateVenta(id: number, id_sucursal: number, id_vendedor: number, fecha_venta: string, total_venta: string, subtotal: string, iva: string) {
    return await prisma.venta.update({
        where: { id_venta: id },
        data: {
            id_sucursal,
            id_vendedor,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
        },
        include: {
            sucursal: true,
            vendedor: true,
            detallesVenta: true,
        },
    });
}

// Eliminar una venta por su ID
export async function deleteVenta(id: number) {
    return await prisma.venta.delete({
        where: { id_venta: id },
    });
}
