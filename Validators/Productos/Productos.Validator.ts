import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerProductosNegocio = [];

export const validateObtenerProductoPorIdNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];

export const validateCrearProductoNegocio = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
    check("descripcion")
        .notEmpty()
        .withMessage("La descripción del producto es requerida"),
    check("precio")
        .isString()
        .withMessage("El precio del producto debe ser un número válido"),
    check("id_marca")
        .notEmpty()
        .withMessage("El ID de la marca debe ser un número válido"),
    check("id_categoria")
        .isString()
        .withMessage("El ID de la categoría debe ser un número válido"),
    check("id_proveedor")
        .isString()
        .withMessage("El ID del proveedor debe ser un número válido"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    check("cantidad")
        .isString()
        .withMessage("La cantidad debe ser un número válido"),
    check("id_tipoCantidad")
        .isString()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    check("codigo_barras")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    check("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];

export const validateActualizarProductoNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
    check("descripcion")
        .notEmpty()
        .withMessage("La descripción del producto es requerida"),
    check("precio")
        .isString()
        .withMessage("El precio del producto debe ser un número válido"),
    check("id_marca")
        .notEmpty()
        .withMessage("El ID de la marca debe ser un número válido"),
    check("id_categoria")
        .isString()
        .withMessage("El ID de la categoría debe ser un número válido"),
    check("id_proveedor")
        .isString()
        .withMessage("El ID del proveedor debe ser un número válido"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    check("cantidad")
        .isString()
        .withMessage("La cantidad debe ser un número válido"),
    check("id_tipoCantidad")
        .isString()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    check("codigo_barras")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    check("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];

export const validateEliminarProductoNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
