import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerTodosLosInventariosGranel = [];

export const validateObtenerInventarioGranelPorId = [
    check("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
];

export const validateCrearNuevoInventarioGranel = [
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("cantidad_producto")
        .isNumeric()
        .withMessage("La cantidad del producto debe ser un número válido"),
    check("cantidad_restante")
        .isNumeric()
        .withMessage("La cantidad restante debe ser un número válido"),
];

export const validateActualizarInventarioGranel = [
    check("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("cantidad_producto")
        .isNumeric()
        .withMessage("La cantidad del producto debe ser un número válido"),
    check("cantidad_restante")
        .isNumeric()
        .withMessage("La cantidad restante debe ser un número válido"),
];

export const validateEliminarInventarioGranel = [
    check("id")
        .isNumeric()
        .withMessage("El ID del inventario granel debe ser un número válido"),
];
