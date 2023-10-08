import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DetalleVentaInput = {
    id_producto: number;
    cantidad_vendida: string;
    precio_producto: string;
    subtotal: string;
    esVentaGranel: boolean;
};


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

async function crearDetalleVentaPorcion(id_detalleVenta: number, id_producto: number, cantidad_vendida: string) {
    return await prisma.detalleVentaPorcion.create({
        data: {
            id_detalleVenta,
            id_producto,
            cantidad_vendida,
        },
    });
}


async function descontarInventario(id_producto: number, cantidadVendida: string) {
    // Obtener el inventario del producto
    const inventario = await prisma.inventario.findUnique({
        where: { id_producto },
    });

    if (!inventario) {
        throw new Error(`Inventario no encontrado para el producto con ID ${id_producto}`);
    }

    // Obtener la cantidad disponible en el producto
    const producto = await prisma.productos.findUnique({
        where: { id: id_producto },
        select: { cantidad: true }, // Seleccionar solo el campo "cantidad"
    });

    if (!producto) {
        throw new Error(`Producto no encontrado con ID ${id_producto}`);
    }

    // Realizar el descuento en el inventario y la cantidad del producto
    const cantidadActual = parseFloat(inventario.existencias);
    const cantidadVenta = parseFloat(cantidadVendida);
    const cantidadProducto = parseFloat(producto.cantidad);

    if (cantidadActual < cantidadVenta) {
        throw new Error(`No hay suficiente inventario para el producto con ID ${id_producto}`);
    }

    if (cantidadProducto < cantidadVenta) {
        throw new Error(`No hay suficiente cantidad disponible para el producto con ID ${id_producto}`);
    }

    const nuevaExistencia = (cantidadActual - cantidadVenta).toString();
    const nuevaCantidadProducto = (cantidadProducto - cantidadVenta).toString();

    // Actualizar el inventario con la nueva existencia
    await prisma.inventario.update({
        where: { id_producto },
        data: {
            existencias: nuevaExistencia,
        },
    });

    // Actualizar la cantidad disponible del producto
    await prisma.productos.update({
        where: { id: id_producto },
        data: {
            cantidad: nuevaCantidadProducto,
        },
    });
}


// Función para crear una venta con detalles de venta
export async function crearVenta(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: DetalleVentaInput[]
) {
    // Obtener el ID del vendedor a partir de su acrónimo
    const idVendedor = await obtenerIdVendedorPorAcronimo(id_vendedor);

    // Crear la venta principal
    const nuevaVenta = await prisma.venta.create({
        data: {
            id_vendedor: idVendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
        },
    });

    const idVentaGenerado = nuevaVenta.id_venta; // Obtener el id_venta generado

    // Crear los detalles de venta y descontar el inventario
    for (const detalle of detallesVenta) {
        // Verificar si se trata de una venta a granel
        if (detalle.esVentaGranel) {
            const cantidadGranel = parseFloat(detalle.cantidad_vendida);
            // Crear una entrada en DetalleVenta por la venta principal
            await crearDetalleVenta(
                idVentaGenerado, // Usar el nuevo id_venta generado
                detalle.id_producto,
                cantidadGranel.toFixed(2),
                detalle.precio_producto,
                detalle.subtotal
            );

            // Crear una entrada en DetalleVentaPorcion para rastrear la venta a granel
            await crearDetalleVentaPorcion(
                idVentaGenerado, // Usar el nuevo id_venta generado
                detalle.id_producto,
                cantidadGranel.toFixed(2)
            );

            // Descontar la cantidad vendida del inventario y la cantidad del producto
            await descontarInventario(detalle.id_producto, cantidadGranel.toFixed(2));
        } else {
            // Si no es una venta a granel, el proceso es el mismo que antes
            await descontarInventario(detalle.id_producto, detalle.cantidad_vendida);

            await crearDetalleVenta(
                idVentaGenerado, // Usar el nuevo id_venta generado
                detalle.id_producto,
                detalle.cantidad_vendida,
                detalle.precio_producto,
                detalle.subtotal
            );
        }
    }

    return nuevaVenta; // Devolver la nueva venta creada
}



// Actualizar una venta por su ID
export async function updateVenta(id: number, id_sucursal: number, id_vendedor: string, fecha_venta: string, total_venta: string, subtotal: string, iva: string) {

    const idVendedor = await obtenerIdVendedorPorAcronimo(id_vendedor);


    return await prisma.venta.update({
        where: { id_venta: id },
        data: {
            id_sucursal,
            id_vendedor: idVendedor, // Usar el ID del vendedor obtenido
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
