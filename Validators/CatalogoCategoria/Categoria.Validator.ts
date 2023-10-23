import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAllCategorias = [];

export const validateGetCategoriaById = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
];

export const validateCreateCategoria = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la categoría es requerida"),
];

export const validateUpdateCategoria = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura de la categoría es requerida"),
];

export const validateDeleteCategoria = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
];
