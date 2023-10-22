import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerTodasLasVentas = [];

export const validateObtenerVentaPorId = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
];

export const validateCrearNuevaVenta = [
    check("id_vendedor")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
    check("id_sucursal")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    check("fecha_venta")
        .isISO8601()
        .withMessage("La fecha de la venta debe tener un formato ISO8601 válido"),
    check("total_venta")
        .isNumeric()
        .withMessage("El total de la venta debe ser un número válido"),
    check("subtotal")
        .isNumeric()
        .withMessage("El subtotal de la venta debe ser un número válido"),
    check("iva")
        .isNumeric()
        .withMessage("El valor del IVA debe ser un número válido"),
    check("detallesVenta")
        .isArray()
        .withMessage("Los detalles de la venta deben estar en formato de arreglo"),
];

export const validateActualizarVenta = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    check("id_sucursal")
        .isNumeric()
        .withMessage("El ID de la sucursal debe ser un número válido"),
    check("id_vendedor")
        .isNumeric()
        .withMessage("El ID del vendedor debe ser un número válido"),
    check("fecha_venta")
        .isISO8601()
        .withMessage("La fecha de la venta debe tener un formato ISO8601 válido"),
    check("total_venta")
        .isNumeric()
        .withMessage("El total de la venta debe ser un número válido"),
    check("subtotal")
        .isNumeric()
        .withMessage("El subtotal de la venta debe ser un número válido"),
    check("iva")
        .isNumeric()
        .withMessage("El valor del IVA debe ser un número válido"),
];

export const validateEliminarVenta = [
    check("id")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
];
