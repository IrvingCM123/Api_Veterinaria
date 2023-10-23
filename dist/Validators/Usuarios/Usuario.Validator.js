"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarUsuarioNegocio = exports.validateActualizarUsuarioNegocio = exports.validateCrearUsuarioNegocio = exports.validateObtenerUsuarioNegocio = exports.validateObtenerUsuariosNegocio = exports.validateIniciarSesionNegocio = void 0;
const express_validator_1 = require("express-validator");
exports.validateIniciarSesionNegocio = [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
];
exports.validateObtenerUsuariosNegocio = [];
exports.validateObtenerUsuarioNegocio = [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
];
exports.validateCrearUsuarioNegocio = [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido"),
    (0, express_validator_1.check)("apellido")
        .notEmpty()
        .withMessage("El apellido es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección es requerida"),
    (0, express_validator_1.check)("imagen")
        .notEmpty()
        .withMessage("La imagen es requerida"),
];
exports.validateActualizarUsuarioNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido"),
    (0, express_validator_1.check)("apellido")
        .notEmpty()
        .withMessage("El apellido es requerido"),
    (0, express_validator_1.check)("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido"),
    (0, express_validator_1.check)("direccion")
        .notEmpty()
        .withMessage("La dirección es requerida"),
    (0, express_validator_1.check)("imagen")
        .notEmpty()
        .withMessage("La imagen es requerida"),
];
exports.validateEliminarUsuarioNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];
