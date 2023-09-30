"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarProductoValidador = exports.ModificarProducto = exports.EliminarProducto = exports.productoValidator = void 0;
const express_validator_1 = require("express-validator");
exports.productoValidator = [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
    (0, express_validator_1.check)('precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número válido'),
    (0, express_validator_1.check)('imagen')
        .isString()
        .withMessage('La url imagen del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('descripcion')
        .isString()
        .withMessage('La descripcion del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('marca')
        .isString()
        .withMessage('La marca del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('tipo')
        .isString()
        .withMessage('El tipo del producto debe ser una cadena de texto'),
];
exports.EliminarProducto = [
    (0, express_validator_1.check)('id').notEmpty().withMessage('El id del producto es requerido'),
];
exports.ModificarProducto = [
    (0, express_validator_1.check)('id').notEmpty().withMessage('El id del producto es requerido'),
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
    (0, express_validator_1.check)('precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número válido'),
    (0, express_validator_1.check)('imagen')
        .isString()
        .withMessage('La url imagen del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('descripcion')
        .isString()
        .withMessage('La descripcion del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('marca')
        .isString()
        .withMessage('La marca del producto debe ser una cadena de texto'),
    (0, express_validator_1.check)('tipo')
        .isString()
        .withMessage('El tipo del producto debe ser una cadena de texto'),
];
exports.BuscarProductoValidador = [
    (0, express_validator_1.check)('id')
        .notEmpty()
        .withMessage('El id del producto es requerido')
        .isNumeric()
        .withMessage('El id del producto debe ser un número válido'),
];
