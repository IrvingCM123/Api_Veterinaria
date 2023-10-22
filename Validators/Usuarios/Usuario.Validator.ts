import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateIniciarSesionNegocio = [
    check("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    check("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
];

export const validateObtenerUsuariosNegocio = [];

export const validateObtenerUsuarioNegocio = [
    check("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
];

export const validateCrearUsuarioNegocio = [
    check("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    check("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido"),
    check("apellido")
        .notEmpty()
        .withMessage("El apellido es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección es requerida"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen es requerida"),
];

export const validateActualizarUsuarioNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
    check("email")
        .isEmail()
        .withMessage("El email debe ser una dirección de correo válida"),
    check("password")
        .notEmpty()
        .withMessage("La contraseña es requerida"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido"),
    check("apellido")
        .notEmpty()
        .withMessage("El apellido es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección es requerida"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen es requerida"),
];

export const validateEliminarUsuarioNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];
