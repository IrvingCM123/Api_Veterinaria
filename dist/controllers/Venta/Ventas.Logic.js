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
exports.obtenerVentaPorFecha = exports.obtenerFechasVentas = exports.eliminarVenta = exports.actualizarVenta = exports.crearNuevaVenta = exports.obtenerVentaPorId = exports.obtenerTodasLasVentas = void 0;
const Ventas_AcessData_1 = require("./Ventas.AcessData");
// Función para validar los datos de una venta
function validarVenta(venta) {
    if (parseFloat(venta.total_venta) <= 0) {
        throw new Error("El total de la venta debe ser mayor que cero.");
    }
}
// Obtener todas las ventas
function obtenerTodasLasVentas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Ventas_AcessData_1.getAllVentas)();
    });
}
exports.obtenerTodasLasVentas = obtenerTodasLasVentas;
// Obtener una venta por su ID
function obtenerVentaPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Ventas_AcessData_1.getVentaById)(id);
    });
}
exports.obtenerVentaPorId = obtenerVentaPorId;
function crearNuevaVenta(venta) {
    return __awaiter(this, void 0, void 0, function* () {
        validarVenta(venta);
        return yield (0, Ventas_AcessData_1.crearVenta)(venta.id_vendedor, venta.id_sucursal, venta.fecha_venta, venta.total_venta, venta.subtotal, venta.iva, venta.detallesVenta);
    });
}
exports.crearNuevaVenta = crearNuevaVenta;
// Actualizar una venta por su ID
function actualizarVenta(id, venta) {
    return __awaiter(this, void 0, void 0, function* () {
        validarVenta(venta);
        return yield (0, Ventas_AcessData_1.updateVenta)(id, venta.id_sucursal, venta.id_vendedor, venta.fecha_venta, venta.total_venta, venta.subtotal, venta.iva);
    });
}
exports.actualizarVenta = actualizarVenta;
// Eliminar una venta por su ID
function eliminarVenta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Ventas_AcessData_1.deleteVenta)(id);
    });
}
exports.eliminarVenta = eliminarVenta;
// Obtener las fechas de las ventas y filtrar por fecha para no repetir las fechas
function obtenerFechasVentas() {
    return __awaiter(this, void 0, void 0, function* () {
        const ventas = yield (0, Ventas_AcessData_1.getFechasVentas)();
        console.log(ventas);
        const fechas = ventas.map((venta) => venta.fecha_venta);
        const fechasFiltradas = fechas.filter((fecha, index) => {
            return fechas.indexOf(fecha) === index;
        });
        return fechasFiltradas;
    });
}
exports.obtenerFechasVentas = obtenerFechasVentas;
// Obtener las ventas por fecha
function obtenerVentaPorFecha(fecha) {
    return __awaiter(this, void 0, void 0, function* () {
        const ventas = (0, Ventas_AcessData_1.getVentaByFecha)(fecha);
        return ventas;
    });
}
exports.obtenerVentaPorFecha = obtenerVentaPorFecha;
