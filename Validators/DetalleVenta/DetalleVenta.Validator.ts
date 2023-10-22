import { validationResult } from "express-validator";
import { check } from "express-validator";

export const validateObtenerTodosLosDetallesVenta = [];

export const validateObtenerDetalleVentaPorId = [
    check("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
];

export const validateCrearNuevoDetalleVenta = [
    check("id_venta")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("cantidad_vendida")
        .isNumeric()
        .withMessage("La cantidad vendida debe ser un número válido"),
    check("precio_producto")
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    check("subtotal")
        .isNumeric()
        .withMessage("El subtotal debe ser un número válido"),
    check("venta_granel")
        .isBoolean()
        .withMessage("El campo venta_granel debe ser un valor booleano"),
];

export const validateActualizarDetalleVenta = [
    check("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
    check("id_venta")
        .isNumeric()
        .withMessage("El ID de la venta debe ser un número válido"),
    check("id_producto")
        .isNumeric()
        .withMessage("El ID del producto debe ser un número válido"),
    check("cantidad_vendida")
        .isNumeric()
        .withMessage("La cantidad vendida debe ser un número válido"),
    check("precio_producto")
        .isNumeric()
        .withMessage("El precio del producto debe ser un número válido"),
    check("subtotal")
        .isNumeric()
        .withMessage("El subtotal debe ser un número válido"),
];

export const validateEliminarDetalleVenta = [
    check("id")
        .isNumeric()
        .withMessage("El ID del detalle de venta debe ser un número válido"),
];

