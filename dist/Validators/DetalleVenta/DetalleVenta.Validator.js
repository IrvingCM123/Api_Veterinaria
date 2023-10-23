"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarDetalleVenta = exports.validateActualizarDetalleVenta = exports.validateCrearNuevoDetalleVenta = exports.validateObtenerDetalleVentaPorId = exports.validateObtenerTodosLosDetallesVenta = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerTodosLosDetallesVenta = [];
exports.validateObtenerDetalleVentaPorId = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
];
exports.validateCrearNuevoDetalleVenta = [
    (0, express_validator_1.check)("id_venta")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_vendida")
        .isNumeric()
        .withMessage("La cantidad vendida debe ser un número válido"),
    (0, express_validator_1.check)("precio_producto")
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    (0, express_validator_1.check)("subtotal")
        .isNumeric()
        .withMessage("El subtotal debe ser un número válido"),
    (0, express_validator_1.check)("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];
exports.validateActualizarDetalleVenta = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
    (0, express_validator_1.check)("id_venta")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_vendida")
        .isNumeric()
        .withMessage("La cantidad vendida debe ser un número válido"),
    (0, express_validator_1.check)("precio_producto")
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    (0, express_validator_1.check)("subtotal")
        .isNumeric()
        .withMessage("El subtotal debe ser un número válido"),
];
exports.validateEliminarDetalleVenta = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
];
