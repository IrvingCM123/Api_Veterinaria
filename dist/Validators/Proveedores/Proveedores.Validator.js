"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteProveedorController = exports.validateUpdateProveedorController = exports.validateCreateProveedorController = exports.validateGetProveedorByIdController = exports.validateGetAllProveedoresController = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllProveedoresController = [];
exports.validateGetProveedorByIdController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
];
exports.validateCreateProveedorController = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del proveedor es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del proveedor es requerida"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección del proveedor es requerida"),
    (0, express_validator_1.check)("ciudad")
        .notEmpty()
        .withMessage("La ciudad del proveedor es requerida"),
    (0, express_validator_1.check)("estado")
        .notEmpty()
        .withMessage("El estado del proveedor es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono del proveedor es requerido"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email del proveedor debe ser una dirección de correo válida"),
];
exports.validateUpdateProveedorController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del proveedor es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del proveedor es requerida"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección del proveedor es requerida"),
    (0, express_validator_1.check)("ciudad")
        .notEmpty()
        .withMessage("La ciudad del proveedor es requerida"),
    (0, express_validator_1.check)("estado")
        .notEmpty()
        .withMessage("El estado del proveedor es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono del proveedor es requerido"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email del proveedor debe ser una dirección de correo válida"),
];
exports.validateDeleteProveedorController = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
];
