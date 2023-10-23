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
exports.deleteVenta = exports.updateVenta = exports.crearVenta = exports.getVentaById = exports.getAllVentas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las ventas
function getAllVentas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.findMany({
            include: {
                sucursal: true,
                vendedor: true,
                detallesVenta: true,
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
                detallesVenta: true,
            },
        });
    });
}
exports.getVentaById = getVentaById;
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
// Función para crear un registro en la tabla DetalleVenta
function crearDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.create({
            data: {
                id_venta,
                id_producto,
                cantidad_vendida,
                precio_producto,
                subtotal,
                venta_granel,
            },
        });
    });
}
function crearDetalleVentaPorcion(id_detalleVenta, id_producto, cantidad_vendida) {
    return __awaiter(this, void 0, void 0, function* () {
        const producto = yield prisma.productos.findFirst({
            where: {
                id: id_producto
            }
        });
        if (!producto) {
            throw Error(`Producto no encontrado con ID ${id_producto}`);
        }
        const detallePorcionExistente = yield prisma.detalleVentaPorcion.findFirst({
            where: {
                id_detalleVenta,
                id_producto
            }
        });
        if (detallePorcionExistente) {
            // Si ya existe un detalle de venta porción para este producto, actualiza la cantidad vendida
            const nuevaCantidadVendida = detallePorcionExistente.cantidad_granel_vendida + cantidad_vendida;
            const nuevoSubtotal = +(producto.precio * nuevaCantidadVendida).toString();
            yield prisma.detalleVentaPorcion.update({
                where: {
                    id_detalleVentaPorcion: detallePorcionExistente.id_detalleVentaPorcion
                },
                data: {
                    cantidad_granel_vendida: nuevaCantidadVendida,
                    subtotal: nuevoSubtotal
                }
            });
        }
        else {
            // Si no existe un detalle de venta porción para este producto, crea uno nuevo
            const nuevoSubtotal = +(producto.precio * cantidad_vendida).toString();
            yield prisma.detalleVentaPorcion.create({
                data: {
                    id_detalleVenta,
                    id_producto,
                    cantidad_producto: producto.cantidad,
                    cantidad_granel_vendida: cantidad_vendida,
                    subtotal: nuevoSubtotal
                }
            });
        }
    });
}
function realizarventaPorcion(id_producto, cantidadVendida) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener el inventario del producto
        const inventario = yield prisma.inventario.findUnique({
            where: { id_producto },
        });
        if (!inventario) {
            throw new Error(`Inventario no encontrado para el producto con ID ${id_producto}`);
        }
        // Obtener la cantidad disponible en el producto
        const producto = yield prisma.productos.findUnique({
            where: { id: id_producto },
            select: { cantidad: true }, // Seleccionar solo el campo "cantidad"
        });
        if (!producto) {
            throw new Error(`Producto no encontrado con ID ${id_producto}`);
        }
        // Realizar el descuento en el inventario y la cantidad del producto
        const cantidadActual = parseFloat(inventario.existencias);
        if (cantidadActual < 1) {
            throw new Error(`No hay suficiente inventario para el producto con ID ${id_producto}`);
        }
        const producto_abierto = yield prisma.inventario_granel.findFirst({
            where: {
                id_producto: id_producto
            }
        });
        if (parseFloat(producto_abierto.cantidad_restante) == 0) {
            yield prisma.inventario_granel.delete({
                where: { id_producto }
            });
            descontarInventario(id_producto, 1);
        }
        else {
            if (producto_abierto) {
                const cantidadProducto = parseFloat(producto_abierto.cantidad_restante);
                if (cantidadVendida > cantidadProducto) {
                    return "La cantidad vendida es mayor que la cantidad del producto.";
                }
                else {
                    const nuevaExistencia = (cantidadProducto - cantidadVendida).toString();
                    // Actualizar el inventario con la nueva existencia
                    yield prisma.inventario_granel.update({
                        where: { id_producto },
                        data: {
                            cantidad_restante: nuevaExistencia,
                        },
                    });
                }
            }
            else {
                yield prisma.inventario_granel.create({
                    data: {
                        id_producto,
                        cantidad_producto: producto.cantidad,
                        cantidad_restante: (parseFloat(producto.cantidad) - cantidadVendida).toString()
                    }
                });
            }
            if (parseFloat(producto_abierto.cantidad_restante) == 0) {
                yield prisma.inventario_granel.delete({
                    where: { id_producto }
                });
                descontarInventario(id_producto, 1);
            }
        }
    });
}
function descontarInventario(id_producto, cantidadVendida) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener el inventario del producto
        const inventario = yield prisma.inventario.findUnique({
            where: { id_producto },
        });
        if (!inventario) {
            throw new Error(`Inventario no encontrado para el producto con ID ${id_producto}`);
        }
        // Obtener la cantidad disponible en el producto
        const producto = yield prisma.productos.findUnique({
            where: { id: id_producto },
            select: { cantidad: true }, // Seleccionar solo el campo "cantidad"
        });
        if (!producto) {
            throw new Error(`Producto no encontrado con ID ${id_producto}`);
        }
        // Realizar el descuento en el inventario y la cantidad del producto
        const cantidadActual = parseFloat(inventario.existencias);
        const cantidadVenta = cantidadVendida;
        if (cantidadActual < cantidadVenta) {
            throw new Error(`No hay suficiente inventario para el producto con ID ${id_producto}`);
        }
        const nuevaExistencia = (cantidadActual - cantidadVenta).toString();
        // Actualizar el inventario con la nueva existencia
        yield prisma.inventario.update({
            where: { id_producto },
            data: {
                existencias: nuevaExistencia,
            },
        });
    });
}
// Función para realizar una venta en una transacción
function crearVenta(id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const idVentaGenerado = nuevaVenta.id_venta; // Obtener el id_venta generado
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
                // Verificar si se trata de una venta a granel
                if (detalle.venta_porcion) {
                    realizarventaPorcion(detalle.id_producto, +detalle.cantidad_vendida);
                }
                else {
                    // Si no es una venta a granel, simplemente crear el detalle de venta
                    yield crearDetalleVenta(idVentaGenerado, detalle.id_producto, detalle.cantidad_vendida, detalle.precio_producto, detalle.subtotal, detalle.venta_porcion);
                    // Descontar el inventario
                    yield descontarInventario(detalle.id_producto, +detalle.cantidad_vendida);
                }
            }
            return nuevaVenta; // Devolver la nueva venta creada
        }));
        return transaction;
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
                    detallesVenta: true,
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
