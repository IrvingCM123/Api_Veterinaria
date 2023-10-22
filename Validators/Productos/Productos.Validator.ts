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
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    check("idMarca")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
    check("idAnimal")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
    check("idCategoria")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
    check("idProveedor")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    check("cantidad")
        .isNumeric()
        .withMessage("La cantidad debe ser un número válido"),
    check("id_tipoCantidad")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    check("codigoBarra")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    check("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
    check("precio_granel")
        .isNumeric()
        .withMessage("El precio granel debe ser un número válido"),
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
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    check("idMarca")
        .isNumeric()
        .withMessage("El ID de la marca debe ser un número válido"),
    check("idAnimal")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
    check("idCategoria")
        .isNumeric()
        .withMessage("El ID de la categoría debe ser un número válido"),
    check("idProveedor")
        .isNumeric()
        .withMessage("El ID del proveedor debe ser un número válido"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    check("cantidad")
        .isNumeric()
        .withMessage("La cantidad debe ser un número válido"),
    check("id_tipoCantidad")
        .isNumeric()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    check("codigoBarra")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    check("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
    check("precio_granel")
        .isNumeric()
        .withMessage("El precio granel debe ser un número válido"),
];

export const validateEliminarProductoNegocio = [
    check("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
