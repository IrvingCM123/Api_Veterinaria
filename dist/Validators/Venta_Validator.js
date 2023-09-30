"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarVenta = void 0;
const { check, validationResult } = require('express-validator');
const productoValidator = [
    check('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
    check('precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número válido'),
    check('cantidad')
        .isNumeric()
        .withMessage('La cantidad del producto debe ser un número válido'),
    check('subtotal')
        .isNumeric()
        .withMessage('El subtotal del producto debe ser un número válido'),
];
exports.validarVenta = [
    check('fecha')
        .isDate()
        .withMessage('La fecha de la venta debe ser una fecha válida'),
    check('totalVenta')
        .isNumeric()
        .withMessage('El total de la venta debe ser un número válido'),
    check('productos')
        .isArray()
        .withMessage('Los productos deben ser un array válido'),
    check('productos.*').custom((value, { req }) => {
        const errores = validationResult(req).array();
        if (errores.length === 0) {
            return Promise.all(req.body.productos.map((producto, index) => {
                return productoValidator.map((validator) => {
                    return validator.run(producto, { req, location: `productos[${index}]` });
                });
            }));
        }
        return true;
    }),
    check('totalProductosVendidos')
        .isNumeric()
        .withMessage('El total de productos vendidos debe ser un número válido'),
];
module.exports = { validarVenta: exports.validarVenta };
