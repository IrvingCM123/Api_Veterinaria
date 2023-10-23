"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarInventarioGranel = exports.validateActualizarInventarioGranel = exports.validateCrearNuevoInventarioGranel = exports.validateObtenerInventarioGranelPorId = exports.validateObtenerTodosLosInventariosGranel = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerTodosLosInventariosGranel = [];
exports.validateObtenerInventarioGranelPorId = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
];
exports.validateCrearNuevoInventarioGranel = [
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_producto")
        .isNumeric()
        .withMessage("La cantidad del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_restante")
        .isNumeric()
        .withMessage("La cantidad restante debe ser un número válido"),
];
exports.validateActualizarInventarioGranel = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
    (0, express_validator_1.check)("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_producto")
        .isNumeric()
        .withMessage("La cantidad del producto debe ser un número válido"),
    (0, express_validator_1.check)("cantidad_restante")
        .isNumeric()
        .withMessage("La cantidad restante debe ser un número válido"),
];
exports.validateEliminarInventarioGranel = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
];
