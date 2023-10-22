import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAllSucursalesController = [];

export const validateGetSucursalByIdController = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
];

export const validateCreateSucursalController = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la sucursal es requerido"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección de la sucursal es requerida"),
    check("ciudad")
        .notEmpty()
        .withMessage("La ciudad de la sucursal es requerida"),
    check("estado")
        .notEmpty()
        .withMessage("El estado de la sucursal es requerido"),
    check("codigoPostal")
        .notEmpty()
        .withMessage("El código postal de la sucursal es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono de la sucursal es requerido"),
    check("encargado")
        .notEmpty()
        .withMessage("El encargado de la sucursal es requerido"),
];

export const validateUpdateSucursalController = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la sucursal es requerido"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección de la sucursal es requerida"),
    check("ciudad")
        .notEmpty()
        .withMessage("La ciudad de la sucursal es requerida"),
    check("estado")
        .notEmpty()
        .withMessage("El estado de la sucursal es requerido"),
    check("codigoPostal")
        .notEmpty()
        .withMessage("El código postal de la sucursal es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono de la sucursal es requerido"),
    check("encargado")
        .notEmpty()
        .withMessage("El encargado de la sucursal es requerido"),
];

export const validateDeleteSucursalController = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
];
