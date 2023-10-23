"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteMarca = exports.validateUpdateMarca = exports.validateCreateMarca = exports.validateGetMarcaById = exports.validateGetAllMarcas = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllMarcas = [];
exports.validateGetMarcaById = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
];
exports.validateCreateMarca = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la marca es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la marca es requerida"),
];
exports.validateUpdateMarca = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la marca es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la marca es requerida"),
];
exports.validateDeleteMarca = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
];
