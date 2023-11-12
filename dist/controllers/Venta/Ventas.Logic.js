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
exports.obtenerInformacionReporte = exports.obtenerVentaPorFecha = exports.obtenerFechasVentas = exports.eliminarVenta = exports.actualizarVenta = exports.crearNuevaVenta = exports.obtenerVentaPorId = exports.obtenerTodasLasVentas = void 0;
const Ventas_AcessData_1 = require("./Ventas.AcessData");
const DetalleVenta_Logic_1 = require("../DetalleVenta/DetalleVenta.Logic");
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
// Obtener las ventas por mes, pasando como parámetro todos los días del mes
function obtenerInformacionReporte(año, mes) {
    return __awaiter(this, void 0, void 0, function* () {
        let fechaInicio = new Date(año, mes - 1, 1);
        fechaInicio = fechaInicio.toString();
        fechaInicio = fechaInicio.slice(4, 15);
        let fechaFin = new Date(año, mes, 0);
        fechaFin = fechaFin.toString();
        fechaFin = fechaFin.slice(4, 15);
        fechaInicio =
            fechaInicio.slice(7, 11) +
                "-" +
                fechaInicio.slice(0, 3) +
                "-" +
                fechaInicio.slice(4, 6);
        fechaFin =
            fechaFin.slice(7, 11) +
                "-" +
                fechaFin.slice(0, 3) +
                "-" +
                fechaFin.slice(4, 6);
        let mesString = fechaInicio.slice(5, 8);
        let mesNumber = 1;
        switch (mesString) {
            case "Jan":
                mesNumber = 1;
                break;
            case "Feb":
                mesNumber = 2;
                break;
            case "Mar":
                mesNumber = 3;
                break;
            case "Apr":
                mesNumber = 4;
                break;
            case "May":
                mesNumber = 5;
                break;
            case "Jun":
                mesNumber = 6;
                break;
            case "Jul":
                mesNumber = 7;
                break;
            case "Aug":
                mesNumber = 8;
                break;
            case "Sep":
                mesNumber = 9;
                break;
            case "Oct":
                mesNumber = 10;
                break;
            case "Nov":
                mesNumber = 11;
                break;
            case "Dec":
                mesNumber = 12;
                break;
        }
        mes = mesNumber;
        fechaInicio =
            fechaInicio.slice(0, 4) + "-" + mes + "-" + fechaInicio.slice(9, 11);
        fechaFin =
            fechaFin.slice(0, 4) + "-" + mes + "-" + fechaFin.slice(9, 11);
        const ventasPorMes = yield (0, Ventas_AcessData_1.getVentaReporte)(fechaInicio, fechaFin);
        for (let i = 0; i < ventasPorMes.length; i++) {
            const detallesVenta = yield (0, DetalleVenta_Logic_1.obtenerDetalleVentaPorIdVenta)(ventasPorMes[i].id_venta);
            ventasPorMes[i].detallesVenta = detallesVenta;
        }
        return ventasPorMes;
    });
}
exports.obtenerInformacionReporte = obtenerInformacionReporte;
