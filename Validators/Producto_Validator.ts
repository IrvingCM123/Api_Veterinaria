const { check, validationResult } = require('express-validator');

export const productoValidator = [
    check('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
    check('precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número válido'),
    check('imagen')
        .isString()
        .withMessage('La url imagen del producto debe ser una cadena de texto'),
    check('descripcion')
        .isString()
        .withMessage('La descripcion del producto debe ser una cadena de texto'),
    check('marca')
        .isString()
        .withMessage('La marca del producto debe ser una cadena de texto'),
    check('tipo')
        .isString()
        .withMessage('El tipo del producto debe ser una cadena de texto'),
];

export const EliminarProducto = [
    check('id').notEmpty().withMessage('El id del producto es requerido'),
];

export const ModificarProducto = [
    check('id').notEmpty().withMessage('El id del producto es requerido'),
    check('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
    check('precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número válido'),
    check('imagen')
        .isString()
        .withMessage('La url imagen del producto debe ser una cadena de texto'),
    check('descripcion')
        .isString()
        .withMessage('La descripcion del producto debe ser una cadena de texto'),
    check('marca')
        .isString()
        .withMessage('La marca del producto debe ser una cadena de texto'),
    check('tipo')
        .isString()
        .withMessage('El tipo del producto debe ser una cadena de texto'),
];

module.exports = { productoValidator, EliminarProducto, ModificarProducto };