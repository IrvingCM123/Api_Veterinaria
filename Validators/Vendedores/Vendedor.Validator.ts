import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerTodosLosVendedores = [];

export const validateObtenerVendedorPorId = [
    check("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
];

export const validateCrearNuevoVendedor = [
    check("acronimo")
        .notEmpty()
        .withMessage("El acrónimo del vendedor es requerido"),
    check("permisoVenta")
        .isBoolean()
        .withMessage("El permiso de venta debe ser un valor booleano"),
    check("userId")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];

export const validateActualizarVendedor = [
    check("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
    check("acronimo")
        .notEmpty()
        .withMessage("El acrónimo del vendedor es requerido"),
    check("permisoVenta")
        .isBoolean()
        .withMessage("El permiso de venta debe ser un valor booleano"),
    check("userId")
        .isNumeric()
        .withMessage("El ID de usuario debe ser un número válido"),
];

export const validateEliminarVendedor = [
    check("id")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
];
