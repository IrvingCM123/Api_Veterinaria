import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAllTipoCantidadNegocio = [];

export const validateGetTipoCantidadByIdNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
];

export const validateCreateTipoCantidadNegocio = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del tipo de cantidad es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del tipo de cantidad es requerida"),
];

export const validateUpdateTipoCantidadNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del tipo de cantidad es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del tipo de cantidad es requerida"),
];

export const validateDeleteTipoCantidadNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
];
