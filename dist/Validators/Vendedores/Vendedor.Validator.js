"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarVendedor = exports.validateActualizarVendedor = exports.validateCrearNuevoVendedor = exports.validateObtenerVendedorPorId = exports.validateObtenerTodosLosVendedores = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerTodosLosVendedores = [];
exports.validateObtenerVendedorPorId = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
];
exports.validateCrearNuevoVendedor = [
    (0, express_validator_1.check)("acronimo")
        .notEmpty()
        .withMessage("El acrónimo del vendedor es requerido"),
    (0, express_validator_1.check)("permisoVenta")
        .isBoolean()
        .withMessage("El permiso de venta debe ser un valor booleano"),
    (0, express_validator_1.check)("userId")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];
exports.validateActualizarVendedor = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
    (0, express_validator_1.check)("acronimo")
        .notEmpty()
        .withMessage("El acrónimo del vendedor es requerido"),
    (0, express_validator_1.check)("permisoVenta")
        .isBoolean()
        .withMessage("El permiso de venta debe ser un valor booleano"),
    (0, express_validator_1.check)("userId")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];
exports.validateEliminarVendedor = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
];
