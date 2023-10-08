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
function crearDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.create({
            data: {
                id_venta,
                id_producto,
                cantidad_vendida,
                precio_producto,
                subtotal,
            },
        });
    });
}
function crearDetalleVentaPorcion(id_detalleVenta, id_producto, cantidad_vendida) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVentaPorcion.create({
            data: {
                id_detalleVenta,
                id_producto,
                cantidad_vendida,
            },
        });
    });
}
// Función para descontar la cantidad vendida del inventario
function descontarInventario(id_producto, cantidadVendida) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener el inventario del producto
        const inventario = yield prisma.inventario.findUnique({
            where: { id_producto },
        });
        if (!inventario) {
            throw new Error(`Inventario no encontrado para el producto con ID ${id_producto}`);
        }
        // Realizar el descuento en el inventario
        const cantidadActual = parseFloat(inventario.existencias);
        const cantidadVenta = parseFloat(cantidadVendida);
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
// Función para crear una venta con detalles de venta
function crearVenta(id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta) {
    return __awaiter(this, void 0, void 0, function* () {
        const idVendedor = yield obtenerIdVendedorPorAcronimo(id_vendedor);
        // Crear la venta principal
        const venta = yield prisma.venta.create({
            data: {
                id_vendedor: idVendedor,
                id_sucursal,
                fecha_venta,
                total_venta,
                subtotal,
                iva,
            },
            include: {
                detallesVenta: true, // Incluimos detalles de venta para realizar un seguimiento adecuado
            },
        });
        // Crear los detalles de venta y descontar el inventario
        for (const detalle of detallesVenta) {
            // Verificar si se trata de una venta a granel
            if (detalle.esVentaGranel) {
                const cantidadGranel = parseFloat(detalle.cantidad_vendida);
                // Crear una entrada en DetalleVenta por la venta principal
                const detalleVenta = yield crearDetalleVenta(venta.id_venta, detalle.id_producto, cantidadGranel.toFixed(2), // Ajustamos la cantidad a dos decimales
                detalle.precio_producto, detalle.subtotal);
                // Crear una entrada en DetalleVentaPorcion para rastrear la venta a granel
                yield crearDetalleVentaPorcion(detalleVenta.id_detalleVenta, detalle.id_producto, cantidadGranel.toFixed(2) // Ajustamos la cantidad a dos decimales
                );
                // Descontar la cantidad vendida del inventario
                yield descontarInventario(detalle.id_producto, cantidadGranel.toFixed(2));
            }
            else {
                // Si no es una venta a granel, el proceso es el mismo que antes
                yield descontarInventario(detalle.id_producto, detalle.cantidad_vendida);
                yield crearDetalleVenta(venta.id_venta, detalle.id_producto, detalle.cantidad_vendida, detalle.precio_producto, detalle.subtotal);
            }
        }
        return venta;
    });
}
exports.crearVenta = crearVenta;
// Actualizar una venta por su ID
function updateVenta(id, id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva) {
    return __awaiter(this, void 0, void 0, function* () {
        const idVendedor = yield obtenerIdVendedorPorAcronimo(id_vendedor);
        return yield prisma.venta.update({
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
    });
}
exports.updateVenta = updateVenta;
// Eliminar una venta por su ID
function deleteVenta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.venta.delete({
            where: { id_venta: id },
        });
    });
}
exports.deleteVenta = deleteVenta;
