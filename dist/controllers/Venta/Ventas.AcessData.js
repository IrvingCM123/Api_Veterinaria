"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenta = exports.updateVenta = exports.crearVenta = exports.getVentaByFecha = exports.getFechasVentas = exports.getVentaById = exports.getAllVentas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las ventas
function getAllVentas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.findMany({
            include: {
                sucursal: true,
                vendedor: true,
            },
        });
    });
}
exports.getAllVentas = getAllVentas;
// Obtener una venta por su ID
function getVentaById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.findUnique({
            where: { id_venta: id },
            include: {
                sucursal: true,
                vendedor: true,
            },
        });
    });
}
exports.getVentaById = getVentaById;
// Obtener todas las fechas de las ventas
function getFechasVentas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.findMany({
            select: {
                fecha_venta: true,
            },
        });
    });
}
exports.getFechasVentas = getFechasVentas;
// Obtener las ventas por fecha
function getVentaByFecha(fecha) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.findMany({
            where: { fecha_venta: fecha },
            include: {
                sucursal: true,
                vendedor: true,
            },
        });
    });
}
exports.getVentaByFecha = getVentaByFecha;
// Función para obtener el ID del vendedor a partir de su acrónimo
function obtenerIdVendedorPorAcronimo(acronimo) {
    return __awaiter(this, void 0, void 0, function* () {
        const vendedor = yield prisma.catalogoVendedor.findUnique({
            where: { acronimo },
        });
        if (!vendedor) {
            throw new Error(`Vendedor con acrónimo ${acronimo} no encontrado`);
        }
        return vendedor.id_vendedor;
    });
}
function crearVenta(id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            const transaction = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                // Obtener el ID del vendedor a partir de su acrónimo
                const idVendedor = yield obtenerIdVendedorPorAcronimo(id_vendedor);
                // Crear la venta principal
                const nuevaVenta = yield prisma.venta.create({
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
                    const producto = yield prisma.productos.findUnique({
                        where: {
                            id: detalle.id_producto,
                        },
                    });
                    if (!producto) {
                        throw new Error(`Producto no encontrado con ID ${detalle.id_producto}`);
                    }
                    const inventario = yield prisma.inventario.findUnique({
                        where: { id_producto: detalle.id_producto },
                    });
                    if (!inventario) {
                        throw new Error(`Inventario no encontrado para el producto con ID ${detalle.id_producto}`);
                    }
                    // Verificar si se trata de una venta a granel
                    if (detalle.venta_porcion) {
                        const cantidad_Producto = yield prisma.productos.findUnique({
                            where: {
                                id: detalle.id_producto
                            },
                            select: {
                                cantidad: true
                            }
                        });
                        const existenciasProducto = parseFloat(inventario.existencias);
                        const producto_abierto = yield prisma.inventario_granel.findFirst({
                            where: {
                                id_producto: detalle.id_producto
                            }
                        });
                        // Verificar si el producto tiene existencias
                        if (existenciasProducto < 1) {
                            throw new Error(`No hay suficiente inventario para el producto con ID ${detalle.id_producto}`);
                        }
                        if (producto_abierto) {
                            if (producto_abierto.cantidad_restante == 0) {
                                yield prisma.inventario_granel.delete({
                                    where: { id_producto: detalle.id_producto }
                                });
                                yield prisma.inventario.update({
                                    where: { id_producto: detalle.id_producto },
                                    data: {
                                        existencias: (parseFloat(inventario.existencias) - 1).toString()
                                    }
                                });
                                return "El producto ya no tiene existencias.";
                            }
                            const cantidadProducto = parseFloat(producto_abierto.cantidad_restante);
                            if (detalle.cantidad_vendida > cantidadProducto) {
                                throw new Error(`La cantidad vendida es mayor que la cantidad del producto.`);
                            }
                            else {
                                // Realizar el descuento en el inventario y la cantidad del producto
                                const nuevaExistencia = (cantidadProducto - detalle.cantidad_vendida).toString();
                                // Actualizar el inventario con la nueva existencia
                                yield prisma.inventario_granel.update({
                                    where: { id_producto: detalle.id_producto },
                                    data: {
                                        cantidad_restante: nuevaExistencia,
                                    },
                                });
                                // Verificar si la cantidad restante es igual a 0 después de la venta y eliminar el producto si es así
                                if (nuevaExistencia == "0") {
                                    yield prisma.inventario_granel.delete({
                                        where: { id_producto: detalle.id_producto }
                                    });
                                    yield prisma.inventario.update({
                                        where: { id_producto: detalle.id_producto },
                                        data: {
                                            existencias: (parseFloat(inventario.existencias) - 1).toString()
                                        }
                                    });
                                }
                            }
                            yield prisma.detalleVenta.create({
                                data: {
                                    id_venta: idVentaGenerado,
                                    id_producto: { connect: { id: detalle.id_producto } },
                                    cantidad_vendida: (detalle.cantidad_vendida).toString(),
                                    precio_producto: (detalle.precio_producto).toString(),
                                    subtotal: (detalle.subtotal).toString(),
                                    venta_granel: detalle.venta_porcion,
                                },
                            });
                        }
                        else {
                            yield prisma.inventario_granel.create({
                                data: {
                                    id_producto: detalle.id_producto,
                                    cantidad_producto: (cantidad_Producto.cantidad).toString(),
                                    cantidad_restante: (parseFloat(cantidad_Producto.cantidad) - detalle.cantidad_vendida).toString()
                                }
                            });
                            yield prisma.detalleVenta.create({
                                data: {
                                    id_venta: idVentaGenerado,
                                    id_producto: { connect: { id: detalle.id_producto } },
                                    cantidad_vendida: (detalle.cantidad_vendida).toString(),
                                    precio_producto: (detalle.precio_producto).toString(),
                                    subtotal: (detalle.subtotal).toString(),
                                    venta_granel: detalle.venta_porcion,
                                },
                            });
                        }
                    }
                    else {
                        // Obtener el inventario del producto
                        // Realizar el descuento en el inventario y la cantidad del producto
                        const cantidadActual = parseFloat(inventario.existencias);
                        const cantidadVenta = +detalle.cantidad_vendida;
                        if (cantidadActual < cantidadVenta) {
                            throw new Error(`No hay suficiente inventario para el producto con ID ${detalle.id_producto}`);
                        }
                        else {
                            const nuevaExistencia = (cantidadActual - cantidadVenta).toString();
                            // Actualizar el inventario con la nueva existencia
                            yield prisma.inventario.update({
                                where: { id_producto: detalle.id_producto },
                                data: {
                                    existencias: nuevaExistencia,
                                },
                            });
                            let id_productos = detalle.id_producto;
                            let cantidad_vendida = (detalle.cantidad_vendida).toString();
                            let precio_producto = (detalle.precio_producto).toString();
                            let subtotal = (detalle.subtotal).toString();
                            let venta_granel = detalle.venta_porcion;
                            console.log(id_productos, 'id_productos');
                            yield prisma.detalleVenta.create({
                                data: {
                                    id_venta: idVentaGenerado,
                                    id_producto: { connect: { id: id_productos } },
                                    cantidad_vendida,
                                    precio_producto,
                                    subtotal,
                                    venta_granel,
                                }
                            });
                        }
                    }
                }
                result = nuevaVenta; // Guarda la nueva venta creada
            }));
            return result; // Devuelve la nueva venta creada (si la transacción tuvo éxito)
        }
        catch (error) {
            throw error; // Lanza el error para que la transacción realice el rollback
        }
    });
}
exports.crearVenta = crearVenta;
// Actualizar una venta por su ID en una transacción
function updateVenta(id, id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
            const idVendedor = yield obtenerIdVendedorPorAcronimo(id_vendedor);
            // Actualizar la venta en la transacción
            const updatedVenta = yield prisma.venta.update({
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
        }));
        return transaction;
    });
}
exports.updateVenta = updateVenta;
// Eliminar una venta por su ID en una transacción
function deleteVenta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.detalleVenta.deleteMany({
                where: { id_venta: id },
            });
            yield prisma.venta.delete({
                where: { id_venta: id },
            });
        }));
        return transaction;
    });
}
exports.deleteVenta = deleteVenta;
