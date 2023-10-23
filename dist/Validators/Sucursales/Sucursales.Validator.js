"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteSucursalController = exports.validateUpdateSucursalController = exports.validateCreateSucursalController = exports.validateGetSucursalByIdController = exports.validateGetAllSucursalesController = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllSucursalesController = [];
exports.validateGetSucursalByIdController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
];
exports.validateCreateSucursalController = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la sucursal es requerido"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección de la sucursal es requerida"),
    (0, express_validator_1.check)("ciudad")
        .notEmpty()
        .withMessage("La ciudad de la sucursal es requerida"),
    (0, express_validator_1.check)("estado")
        .notEmpty()
        .withMessage("El estado de la sucursal es requerido"),
    (0, express_validator_1.check)("codigoPostal")
        .notEmpty()
        .withMessage("El código postal de la sucursal es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono de la sucursal es requerido"),
    (0, express_validator_1.check)("encargado")
        .notEmpty()
        .withMessage("El encargado de la sucursal es requerido"),
];
exports.validateUpdateSucursalController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre de la sucursal es requerido"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección de la sucursal es requerida"),
    (0, express_validator_1.check)("ciudad")
        .notEmpty()
        .withMessage("La ciudad de la sucursal es requerida"),
    (0, express_validator_1.check)("estado")
        .notEmpty()
        .withMessage("El estado de la sucursal es requerido"),
    (0, express_validator_1.check)("codigoPostal")
        .notEmpty()
        .withMessage("El código postal de la sucursal es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono de la sucursal es requerido"),
    (0, express_validator_1.check)("encargado")
        .notEmpty()
        .withMessage("El encargado de la sucursal es requerido"),
];
exports.validateDeleteSucursalController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
];
