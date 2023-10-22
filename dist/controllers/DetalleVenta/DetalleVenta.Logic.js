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
exports.eliminarDetalleVenta = exports.actualizarDetalleVenta = exports.crearNuevoDetalleVenta = exports.obtenerDetalleVentaPorId = exports.obtenerTodosLosDetallesVenta = void 0;
// Importa las funciones de acceso a datos de la capa de acceso a datos
const DetalleVenta_AccessData_1 = require("./DetalleVenta.AccessData");
// Obtener todos los detalles de venta
function obtenerTodosLosDetallesVenta() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, DetalleVenta_AccessData_1.getAllDetallesVenta)();
    });
}
exports.obtenerTodosLosDetallesVenta = obtenerTodosLosDetallesVenta;
// Obtener un detalle de venta por su ID
function obtenerDetalleVentaPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, DetalleVenta_AccessData_1.getDetalleVentaById)(id);
    });
}
exports.obtenerDetalleVentaPorId = obtenerDetalleVentaPorId;
// Crear un nuevo detalle de venta
function crearNuevoDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, DetalleVenta_AccessData_1.createDetalleVenta)(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel);
    });
}
exports.crearNuevoDetalleVenta = crearNuevoDetalleVenta;
// Actualizar un detalle de venta por su ID
function actualizarDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, DetalleVenta_AccessData_1.updateDetalleVenta)(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal);
    });
}
exports.actualizarDetalleVenta = actualizarDetalleVenta;
// Eliminar un detalle de venta por su ID
function eliminarDetalleVenta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, DetalleVenta_AccessData_1.deleteDetalleVenta)(id);
    });
}
exports.eliminarDetalleVenta = eliminarDetalleVenta;
