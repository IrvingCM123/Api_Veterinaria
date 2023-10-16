import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DetalleVentaInput = {
    id_producto: number;
    cantidad_vendida: string;
    precio_producto: string;
    subtotal: string;
    venta_porcion: boolean;
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
    subtotal: string,
    venta_granel: boolean
) {
    return await prisma.detalleVenta.create({
        data: {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
            venta_granel,
        },
    });
}

async function crearDetalleVentaPorcion(
    id_detalleVenta: number,
    id_producto: number,
    cantidad_vendida: number
) {
    const producto: any = await prisma.productos.findFirst({
        where: {
            id: id_producto
        }
    });

    if (!producto) {
        throw new Error(`Producto no encontrado con ID ${id_producto}`);
    }

    const detallePorcionExistente = await prisma.detalleVentaPorcion.findFirst({
        where: {
            id_detalleVenta,
            id_producto
        }
    });

    if (detallePorcionExistente) {
        // Si ya existe un detalle de venta porción para este producto, actualiza la cantidad vendida
        const nuevaCantidadVendida = detallePorcionExistente.cantidad_granel_vendida + cantidad_vendida;
        const nuevoSubtotal = +(producto.precio * nuevaCantidadVendida).toString();

        await prisma.detalleVentaPorcion.update({
            where: {
                id_detalleVentaPorcion: detallePorcionExistente.id_detalleVentaPorcion
            },
            data: {
                cantidad_granel_vendida: nuevaCantidadVendida,
                subtotal: nuevoSubtotal
            }
        });
    } else {
        // Si no existe un detalle de venta porción para este producto, crea uno nuevo
        const nuevoSubtotal = +(producto.precio * cantidad_vendida).toString();

        await prisma.detalleVentaPorcion.create({
            data: {
                id_detalleVenta,
                id_producto,
                cantidad_producto: producto.cantidad,
                cantidad_granel_vendida: cantidad_vendida,
                subtotal: nuevoSubtotal
            }
        });
    }
}

async function realizarventaPorcion(
    id_producto: number,
    cantidadVendida: number
) {
    // Obtener el inventario del producto
    const inventario = await prisma.inventario.findUnique({
        where: { id_producto },
    });

    if (!inventario) {
        throw new Error(
            `Inventario no encontrado para el producto con ID ${id_producto}`
        );
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

    if (cantidadActual < 1) {
        throw new Error(
            `No hay suficiente inventario para el producto con ID ${id_producto}`
        );
    }

    const producto_abierto: any = await prisma.inventario_granel.findFirst({
        where: {
            id_producto: id_producto
        }
    });

    if (parseFloat(producto_abierto.cantidad_restante)== 0) {

        await prisma.inventario_granel.delete({
            where: { id_producto }
        });

        descontarInventario(id_producto, 1);
    }  {

        if (producto_abierto) { 

            const cantidadProducto = parseFloat(producto_abierto.cantidad_restante);
    
            if (cantidadVendida > cantidadProducto) {
                return("La cantidad vendida es mayor que la cantidad del producto.");
            } else {
                const nuevaExistencia = (cantidadProducto - cantidadVendida).toString();
    
                // Actualizar el inventario con la nueva existencia
                await prisma.inventario_granel.update({
                    where: { id_producto },
                    data: {
                        cantidad_restante: nuevaExistencia,
                    },
                });
            }
        } else {
    
            await prisma.inventario_granel.create({
                data: {
                    id_producto,
                    cantidad_producto: producto.cantidad,
                    cantidad_restante: (parseFloat(producto.cantidad) - cantidadVendida).toString()
                }
            });
    
        }

        if (parseFloat(producto_abierto.cantidad_restante)== 0) {

            await prisma.inventario_granel.delete({
                where: { id_producto }
            });
    
            descontarInventario(id_producto, 1);
        }
    }

}


async function descontarInventario(
    id_producto: number,
    cantidadVendida: number
) {
    // Obtener el inventario del producto
    const inventario = await prisma.inventario.findUnique({
        where: { id_producto },
    });

    if (!inventario) {
        throw new Error(
            `Inventario no encontrado para el producto con ID ${id_producto}`
        );
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
    const cantidadVenta: number = (cantidadVendida);

    if (cantidadActual < cantidadVenta) {
        throw new Error(
            `No hay suficiente inventario para el producto con ID ${id_producto}`
        );
    }

    const nuevaExistencia = (cantidadActual - cantidadVenta).toString();

    // Actualizar el inventario con la nueva existencia
    await prisma.inventario.update({
        where: { id_producto },
        data: {
            existencias: nuevaExistencia,
        },
    });
}


// Función para realizar una venta
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
        const producto = await prisma.productos.findUnique({
            where: {
                id: detalle.id_producto,
            },
        });

        if (!producto) {
            throw new Error(`Producto no encontrado con ID ${detalle.id_producto}`);
        }

        // Verificar si se trata de una venta a granel
        if (detalle.venta_porcion) {

            realizarventaPorcion(detalle.id_producto, +detalle.cantidad_vendida);
        } else {
            // Si no es una venta a granel, simplemente crear el detalle de venta
            await crearDetalleVenta(
                idVentaGenerado,
                detalle.id_producto,
                detalle.cantidad_vendida,
                detalle.precio_producto,
                detalle.subtotal,
                detalle.venta_porcion
            );

            // Descontar el inventario
            await descontarInventario(detalle.id_producto, +detalle.cantidad_vendida);
        }
    }

    return nuevaVenta; // Devolver la nueva venta creada
}

// Actualizar una venta por su ID
export async function updateVenta(
    id: number,
    id_sucursal: number,
    id_vendedor: string,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string
) {
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

