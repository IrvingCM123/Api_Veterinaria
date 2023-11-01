"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarVenta = exports.validateActualizarVenta = exports.validateCrearNuevaVenta = exports.validateObtenerVentaPorId = exports.validateObtenerTodasLasVentas = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerTodasLasVentas = [];
exports.validateObtenerVentaPorId = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
];
exports.validateCrearNuevaVenta = [
    (0, express_validator_1.check)("id_vendedor")
        .isString()
        .withMessage("El ID del vendedor debe ser un número válido"),
    (0, express_validator_1.check)("id_sucursal")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    (0, express_validator_1.check)("fecha_venta")
        .isString()
        .withMessage("La fecha de la venta debe tener un formato ISO8601 válido"),
    (0, express_validator_1.check)("total_venta")
        .isString()
        .withMessage("El total de la venta debe ser un número válido"),
    (0, express_validator_1.check)("subtotal")
        .isString()
        .withMessage("El subtotal de la venta debe ser un número válido"),
    (0, express_validator_1.check)("iva")
        .isString()
        .withMessage("El valor del IVA debe ser un número válido"),
    (0, express_validator_1.check)("detallesVenta")
        .isArray()
        .withMessage("Los detalles de la venta deben estar en formato de arreglo"),
];
exports.validateActualizarVenta = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    (0, express_validator_1.check)("id_sucursal")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    (0, express_validator_1.check)("id_vendedor")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
    (0, express_validator_1.check)("fecha_venta")
        .isISO8601()
        .withMessage("La fecha de la venta debe tener un formato ISO8601 válido"),
    (0, express_validator_1.check)("total_venta")
        .isNumeric()
        .withMessage("El total de la venta debe ser un número válido"),
    (0, express_validator_1.check)("subtotal")
        .isNumeric()
        .withMessage("El subtotal de la venta debe ser un número válido"),
    (0, express_validator_1.check)("iva")
        .isNumeric()
        .withMessage("El valor del IVA debe ser un número válido"),
];
exports.validateEliminarVenta = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
];
