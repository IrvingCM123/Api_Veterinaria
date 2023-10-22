import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAnimalById = [
    check("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
];

export const validateCreateAnimal = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del animal es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del animal es requerida"),
];

export const validateUpdateAnimal = [
    check("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del animal es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del animal es requerida"),
];

export const validateDeleteAnimal = [
    check("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
];