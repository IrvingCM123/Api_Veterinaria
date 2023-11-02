"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEliminarProductoNegocio = exports.validateActualizarProductoNegocio = exports.validateCrearProductoNegocio = exports.validateObtenerProductoPorIdNegocio = exports.validateObtenerProductosNegocio = void 0;
const express_validator_1 = require("express-validator");
exports.validateObtenerProductosNegocio = [];
exports.validateObtenerProductoPorIdNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
exports.validateCrearProductoNegocio = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
    (0, express_validator_1.check)("descripcion")
        .notEmpty()
        .withMessage("La descripción del producto es requerida"),
    (0, express_validator_1.check)("precio")
        .isString()
        .withMessage("El precio del producto debe ser un número válido"),
    (0, express_validator_1.check)("id_marca")
        .notEmpty()
        .withMessage("El ID de la marca debe ser un número válido"),
    (0, express_validator_1.check)("id_categoria")
        .isString()
        .withMessage("El ID de la categoría debe ser un número válido"),
    (0, express_validator_1.check)("id_proveedor")
        .isString()
        .withMessage("El ID del proveedor debe ser un número válido"),
    (0, express_validator_1.check)("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    (0, express_validator_1.check)("cantidad")
        .isString()
        .withMessage("La cantidad debe ser un número válido"),
    (0, express_validator_1.check)("id_tipoCantidad")
        .isString()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    (0, express_validator_1.check)("codigo_barras")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    (0, express_validator_1.check)("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];
exports.validateActualizarProductoNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es requerido"),
    (0, express_validator_1.check)("descripcion")
        .notEmpty()
        .withMessage("La descripción del producto es requerida"),
    (0, express_validator_1.check)("precio")
        .isString()
        .withMessage("El precio del producto debe ser un número válido"),
    (0, express_validator_1.check)("id_marca")
        .notEmpty()
        .withMessage("El ID de la marca debe ser un número válido"),
    (0, express_validator_1.check)("id_categoria")
        .isString()
        .withMessage("El ID de la categoría debe ser un número válido"),
    (0, express_validator_1.check)("id_proveedor")
        .isString()
        .withMessage("El ID del proveedor debe ser un número válido"),
    (0, express_validator_1.check)("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es requerida"),
    (0, express_validator_1.check)("cantidad")
        .isString()
        .withMessage("La cantidad debe ser un número válido"),
    (0, express_validator_1.check)("id_tipoCantidad")
        .isString()
        .withMessage("El ID del tipo de cantidad debe ser un número válido"),
    (0, express_validator_1.check)("codigo_barras")
        .notEmpty()
        .withMessage("El código de barras es requerido"),
    (0, express_validator_1.check)("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];
exports.validateEliminarProductoNegocio = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
];
