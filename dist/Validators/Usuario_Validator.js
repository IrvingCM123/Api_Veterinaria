"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarUsuario = exports.InicioSesion = exports.usuarioValidator = void 0;
const { check, validationResult } = require("express-validator");
exports.usuarioValidator = [
    check("nombre").notEmpty().withMessage("El nombre del usuario es requerido"),
    check("apellido")
        .notEmpty()
        .withMessage("El apellido del usuario es requerido"),
    check("email").notEmpty().withMessage("El email del usuario es requerido"),
    check("password")
        .notEmpty()
        .withMessage("El password del usuario es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El telefono del usuario es requerido"),
    check("direccion")
        .notEmpty()
        .withMessage("La direccion del usuario es requerido"),
    check("rol").notEmpty().withMessage("El rol del usuario es requerido"),
];
exports.InicioSesion = [
    check("email").notEmpty().withMessage("El email del usuario es requerido"),
    check("password")
        .notEmpty()
        .withMessage("El password del usuario es requerido"),
];
const validarUsuario = (req, res, next) => {
    const errores = validationResult(req);
    if (errores.isEmpty()) {
        return next();
    }
    const err = new Error("Error de validación");
    err.status = 422;
    err.errors = errores.array();
    next(err);
};
exports.validarUsuario = validarUsuario;
