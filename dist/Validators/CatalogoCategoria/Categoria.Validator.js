"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteCategoria = exports.validateUpdateCategoria = exports.validateCreateCategoria = exports.validateGetCategoriaById = exports.validateGetAllCategorias = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllCategorias = [];
exports.validateGetCategoriaById = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
];
exports.validateCreateCategoria = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la categoría es requerida"),
];
exports.validateUpdateCategoria = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la categoría es requerida"),
];
exports.validateDeleteCategoria = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
];
