import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerTodosLosInventarios = [];

export const validateObtenerInventarioPorProducto = [
    check("producto")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
];

export const validateObtenerInventarioPorId = [
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];

export const validateCrearNuevoInventario = [
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("existencias")
        .isNumeric()
        .withMessage("Las existencias deben ser un número válido"),
    check("StockMinimo")
        .isNumeric()
        .withMessage("El stock mínimo debe ser un número válido"),
    check("StockMaximo")
        .isNumeric()
        .withMessage("El stock máximo debe ser un número válido"),
];

export const validateActualizarInventario = [
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("existencias")
        .isNumeric()
        .withMessage("Las existencias deben ser un número válido"),
    check("StockMinimo")
        .isNumeric()
        .withMessage("El stock mínimo debe ser un número válido"),
    check("StockMaximo")
        .isNumeric()
        .withMessage("El stock máximo debe ser un número válido"),
];

export const validateEliminarInventario = [
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
