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
exports.deleteDetalleVenta = exports.updateDetalleVenta = exports.createDetalleVenta = exports.getDetalleVentaById = exports.getAllDetallesVenta = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los detalles de venta
function getAllDetallesVenta() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.findMany({
            include: {
                id_producto: true, // Incluye la relación con productos
            },
        });
    });
}
exports.getAllDetallesVenta = getAllDetallesVenta;
// Obtener un detalle de venta por su ID de detalle
function getDetalleVentaById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.findUnique({
            where: { id_detalleVenta: id },
            include: {
                id_producto: true, // Incluye la relación con productos
            },
        });
    });
}
exports.getDetalleVentaById = getDetalleVentaById;
// Crear un nuevo detalle de venta
function createDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.create({
            data: {
                id_venta,
                id_producto: { connect: id_producto },
                cantidad_vendida,
                precio_producto,
                subtotal,
                venta_granel,
            },
            include: {
                id_producto: true, // Incluye la relación con productos
            },
        });
    });
}
exports.createDetalleVenta = createDetalleVenta;
// Actualizar un detalle de venta por su ID de detalle
function updateDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.update({
            where: { id_detalleVenta: id },
            data: {
                id_venta,
                id_producto: { set: id_producto },
                cantidad_vendida,
                precio_producto,
                subtotal,
            },
            include: {
                id_producto: true, // Incluye la relación con productos
            },
        });
    });
}
exports.updateDetalleVenta = updateDetalleVenta;
// Eliminar un detalle de venta por su ID de detalle
function deleteDetalleVenta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.detalleVenta.delete({
            where: { id_detalleVenta: id },
        });
    });
}
exports.deleteDetalleVenta = deleteDetalleVenta;
