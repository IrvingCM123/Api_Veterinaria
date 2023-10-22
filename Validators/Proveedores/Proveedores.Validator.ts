import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateGetAllProveedoresController = [];

export const validateGetProveedorByIdController = [
    check("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
];

export const validateCreateProveedorController = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del proveedor es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del proveedor es requerida"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección del proveedor es requerida"),
    check("ciudad")
        .notEmpty()
        .withMessage("La ciudad del proveedor es requerida"),
    check("estado")
        .notEmpty()
        .withMessage("El estado del proveedor es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono del proveedor es requerido"),
    check("email")
        .isEmail()
        .withMessage(
            "El email del proveedor debe ser una dirección de correo válida"
        ),
];

export const validateUpdateProveedorController = [
    check("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del proveedor es requerido"),
    check("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del proveedor es requerida"),
    check("direccion")
        .notEmpty()
        .withMessage("La dirección del proveedor es requerida"),
    check("ciudad")
        .notEmpty()
        .withMessage("La ciudad del proveedor es requerida"),
    check("estado")
        .notEmpty()
        .withMessage("El estado del proveedor es requerido"),
    check("telefono")
        .notEmpty()
        .withMessage("El teléfono del proveedor es requerido"),
    check("email")
        .isEmail()
        .withMessage(
            "El email del proveedor debe ser una dirección de correo válida"
        ),
];

export const validateDeleteProveedorController = [
    check("id")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
];
