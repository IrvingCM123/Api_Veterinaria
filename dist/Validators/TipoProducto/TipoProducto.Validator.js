"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTipoCantidadNegocio = exports.validateUpdateTipoCantidadNegocio = exports.validateCreateTipoCantidadNegocio = exports.validateGetTipoCantidadByIdNegocio = exports.validateGetAllTipoCantidadNegocio = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllTipoCantidadNegocio = [];
exports.validateGetTipoCantidadByIdNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
];
exports.validateCreateTipoCantidadNegocio = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del tipo de cantidad es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del tipo de cantidad es requerida"),
];
exports.validateUpdateTipoCantidadNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del tipo de cantidad es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del tipo de cantidad es requerida"),
];
exports.validateDeleteTipoCantidadNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
];
