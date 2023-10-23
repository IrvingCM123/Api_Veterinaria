"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarInventario = exports.validateActualizarInventario = exports.validateCrearNuevoInventario = exports.validateObtenerInventarioPorId = exports.validateObtenerInventarioPorProducto = exports.validateObtenerTodosLosInventarios = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerTodosLosInventarios = [];
exports.validateObtenerInventarioPorProducto = [
    (0, express_validator_1.check)("producto")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
];
exports.validateObtenerInventarioPorId = [
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
exports.validateCrearNuevoInventario = [
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("existencias")
        .isNumeric()
        .withMessage("Las existencias deben ser un número válido"),
    (0, express_validator_1.check)("StockMinimo")
        .isNumeric()
        .withMessage("El stock mínimo debe ser un número válido"),
    (0, express_validator_1.check)("StockMaximo")
        .isNumeric()
        .withMessage("El stock máximo debe ser un número válido"),
];
exports.validateActualizarInventario = [
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("existencias")
        .isNumeric()
        .withMessage("Las existencias deben ser un número válido"),
    (0, express_validator_1.check)("StockMinimo")
        .isNumeric()
        .withMessage("El stock mínimo debe ser un número válido"),
    (0, express_validator_1.check)("StockMaximo")
        .isNumeric()
        .withMessage("El stock máximo debe ser un número válido"),
];
exports.validateEliminarInventario = [
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
