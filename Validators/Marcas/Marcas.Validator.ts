import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAllMarcas = [];

export const validateGetMarcaById = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
];

export const validateCreateMarca = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la marca es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la marca es requerida"),
];

export const validateUpdateMarca = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la marca es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la marca es requerida"),
];

export const validateDeleteMarca = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
];
