import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las ventas
export async function getAllVentas() {
    return await prisma.venta.findMany({
        include: {
            sucursal: true,
            vendedor: true,
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
        },
    });
}

// Obtener todas las fechas de las ventas
export async function getFechasVentas() {
    return await prisma.venta.findMany({
        select: {
            fecha_venta: true,
        },
    });
}

// Obtener las ventas por fecha
export async function getVentaByFecha(fecha: string) {
    return await prisma.venta.findMany({
        where: { fecha_venta: fecha },
        include: {
            sucursal: true,
            vendedor: true,
        },
    });
}

// Obtener las ventas por año y mes
export async function getVentaReporte(fechaInicio: string, fechaFin: string) {
    return await prisma.venta.findMany({
        where: {
            fecha_venta: {
                gte: fechaInicio,
                lte: fechaFin,
            },
        },
        include: {
            sucursal: true,
            vendedor: true,
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

export async function crearVenta(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
) {
    let result;

    try {
        const transaction = await prisma.$transaction(async (prisma) => {
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

            const idVentaGenerado = nuevaVenta.id_venta;

            // Crear los detalles de venta y descontar el inventario
            for (const detalle of detallesVenta) {
                const producto = await prisma.productos.findUnique({
                    where: {
                        id: detalle.id_producto,
                    },
                });

                if (!producto) {
                    throw new Error(
                        `Producto no encontrado con ID ${detalle.id_producto}`
                    );
                }

                const inventario = await prisma.inventario.findUnique({
                    where: { id_producto: detalle.id_producto },
                });

                if (!inventario) {
                    throw new Error(
                        `Inventario no encontrado para el producto con ID ${detalle.id_producto}`
                    );
                }

                // Verificar si se trata de una venta a granel
                if (detalle.venta_porcion) {
                    const cantidad_Producto: any = await prisma.productos.findUnique({
                        where: {
                            id: detalle.id_producto,
                        },
                        select: {
                            cantidad: true,
                        },
                    });

                    const existenciasProducto = parseFloat(inventario.existencias);

                    const producto_abierto: any =
                        await prisma.inventario_granel.findFirst({
                            where: {
                                id_producto: detalle.id_producto,
                            },
                        });

                    // Verificar si el producto tiene existencias
                    if (existenciasProducto < 1) {
                        throw new Error(
                            `No hay suficiente inventario para el producto con ID ${detalle.id_producto}`
                        );
                    }

                    if (producto_abierto) {
                        if (producto_abierto.cantidad_restante == 0) {
                            await prisma.inventario_granel.delete({
                                where: { id_producto: detalle.id_producto },
                            });

                            await prisma.inventario.update({
                                where: { id_producto: detalle.id_producto },
                                data: {
                                    existencias: (
                                        parseFloat(inventario.existencias) - 1
                                    ).toString(),
                                },
                            });

                            return "El producto ya no tiene existencias.";
                        }

                        const cantidadProducto = parseFloat(
                            producto_abierto.cantidad_restante
                        );

                        if (detalle.cantidad_vendida > cantidadProducto) {
                            throw new Error(
                                `La cantidad vendida es mayor que la cantidad del producto.`
                            );
                        } else {
                            // Realizar el descuento en el inventario y la cantidad del producto
                            const nuevaExistencia = (
                                cantidadProducto - detalle.cantidad_vendida
                            ).toString();
                            // Actualizar el inventario con la nueva existencia
                            await prisma.inventario_granel.update({
                                where: { id_producto: detalle.id_producto },
                                data: {
                                    cantidad_restante: nuevaExistencia,
                                },
                            });

                            // Verificar si la cantidad restante es igual a 0 después de la venta y eliminar el producto si es así
                            if (nuevaExistencia == "0") {
                                await prisma.inventario_granel.delete({
                                    where: { id_producto: detalle.id_producto },
                                });

                                await prisma.inventario.update({
                                    where: { id_producto: detalle.id_producto },
                                    data: {
                                        existencias: (
                                            parseFloat(inventario.existencias) - 1
                                        ).toString(),
                                    },
                                });
                            }
                        }

                        await prisma.detalleVenta.create({
                            data: {
                                id_venta: idVentaGenerado,
                                id_producto: { connect: { id: detalle.id_producto } },
                                cantidad_vendida: detalle.cantidad_vendida.toString(),
                                precio_producto: detalle.precio_producto.toString(),
                                subtotal: detalle.subtotal.toString(),
                                venta_granel: detalle.venta_porcion,
                            },
                        });
                    } else {
                        await prisma.inventario_granel.create({
                            data: {
                                id_producto: detalle.id_producto,
                                cantidad_producto: cantidad_Producto.cantidad.toString(),
                                cantidad_restante: (
                                    parseFloat(cantidad_Producto.cantidad) -
                                    detalle.cantidad_vendida
                                ).toString(),
                            },
                        });

                        await prisma.detalleVenta.create({
                            data: {
                                id_venta: idVentaGenerado,
                                id_producto: { connect: { id: detalle.id_producto } },
                                cantidad_vendida: detalle.cantidad_vendida.toString(),
                                precio_producto: detalle.precio_producto.toString(),
                                subtotal: detalle.subtotal.toString(),
                                venta_granel: detalle.venta_porcion,
                            },
                        });
                    }
                } else {
                    // Obtener el inventario del producto

                    // Realizar el descuento en el inventario y la cantidad del producto
                    const cantidadActual = parseFloat(inventario.existencias);
                    const cantidadVenta: number = +detalle.cantidad_vendida;

                    if (cantidadActual < cantidadVenta) {
                        throw new Error(
                            `No hay suficiente inventario para el producto con ID ${detalle.id_producto}`
                        );
                    } else {
                        const nuevaExistencia = (cantidadActual - cantidadVenta).toString();

                        // Actualizar el inventario con la nueva existencia
                        await prisma.inventario.update({
                            where: { id_producto: detalle.id_producto },
                            data: {
                                existencias: nuevaExistencia,
                            },
                        });

                        let id_productos: any = detalle.id_producto;
                        let cantidad_vendida = detalle.cantidad_vendida.toString();
                        let precio_producto = detalle.precio_producto.toString();
                        let subtotal = detalle.subtotal.toString();
                        let venta_granel = detalle.venta_porcion;

                        console.log(id_productos, "id_productos");
                        await prisma.detalleVenta.create({
                            data: {
                                id_venta: idVentaGenerado,
                                id_producto: { connect: { id: id_productos } },
                                cantidad_vendida,
                                precio_producto,
                                subtotal,
                                venta_granel,
                            },
                        });
                    }
                }
            }
            result = nuevaVenta; // Guarda la nueva venta creada
        });

        return result; // Devuelve la nueva venta creada (si la transacción tuvo éxito)
    } catch (error) {
        throw error; // Lanza el error para que la transacción realice el rollback
    }
}

// Actualizar una venta por su ID en una transacción
export async function updateVenta(
    id: number,
    id_sucursal: number,
    id_vendedor: string,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string
) {
    const transaction = await prisma.$transaction(async (prisma) => {
        const idVendedor = await obtenerIdVendedorPorAcronimo(id_vendedor);

        // Actualizar la venta en la transacción
        const updatedVenta = await prisma.venta.update({
            where: { id_venta: id },
            data: {
                id_sucursal,
                id_vendedor: idVendedor,
                fecha_venta,
                total_venta,
                subtotal,
                iva,
            },
            include: {
                sucursal: true,
                vendedor: true,
            },
        });

        return updatedVenta;
    });

    return transaction;
}

// Eliminar una venta por su ID en una transacción
export async function deleteVenta(id: number) {
    const transaction = await prisma.$transaction(async (prisma) => {
        await prisma.detalleVenta.deleteMany({
            where: { id_venta: id },
        });

        await prisma.venta.delete({
            where: { id_venta: id },
        });
    });

    return transaction;
}
