import { Request, Response, NextFunction, Router } from "express";

import * as DetalleVentaController from "../controllers/DetalleVenta/DetalleVenta.Logic";

import { handleValidationErrors } from "../middleware/DetalleVenta/DetalleVenta.Middleware";

import {
    validateObtenerTodosLosDetallesVenta,
    validateObtenerDetalleVentaPorId,
    validateCrearNuevoDetalleVenta,
    validateActualizarDetalleVenta,
    validateEliminarDetalleVenta,
} from "../Validators/DetalleVenta/DetalleVenta.Validator";

const router = Router();

// Rutas para el controlador de detalle de venta

/**
 *  @route GET api/detalleventa
 *  @desc Get All DetalleVenta
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosDetallesVenta, handleValidationErrors
 *  @return json con todos los detalles de venta
 */

router.get(
    "/",
    validateObtenerTodosLosDetallesVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const detalleventa =
                await DetalleVentaController.obtenerTodosLosDetallesVenta();
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/detalleventa/:id
 *  @desc Get An DetalleVenta
 *  @access Public
 *  @params id
 *  @validation validateObtenerDetalleVentaPorId, handleValidationErrors
 *  @return json con el detalle de venta solicitado
 */

router.get(
    "/:id",
    validateObtenerDetalleVentaPorId,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const detalleventa =
                await DetalleVentaController.obtenerDetalleVentaPorId(id);
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/detalleventa/venta/:id
 *  @desc Get An DetalleVenta
 *  @access Public
 *  @params id
 *  @validation validateObtenerDetalleVentaPorIdVenta, handleValidationErrors
 *  @return json con el detalle de venta solicitado
 */

router.get(
    "/venta/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const detalleventa =
                await DetalleVentaController.obtenerDetalleVentaPorIdVenta(id);
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/detalleventa
 *  @desc Create An DetalleVenta
 *  @access Public
 *  @params -id_venta: number, -id_producto: number, -cantidad_vendida: number, -precio_producto: number, -subtotal: number, -venta_granel: boolean
 *  @validation validateCrearNuevoDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta creado
 */

router.post(
    "/",
    validateCrearNuevoDetalleVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
            venta_granel,
        } = req.body;
        try {
            const detalleventa = await DetalleVentaController.crearNuevoDetalleVenta(
                id_venta,
                id_producto,
                cantidad_vendida,
                precio_producto,
                subtotal,
                venta_granel
            );
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/detalleventa/:id
 *  @desc Update An DetalleVenta
 *  @access Public
 *  @params id, -id_venta: number, -id_producto: number, -cantidad_vendida: number, -precio_producto: number, -subtotal: number
 *  @validation validateActualizarDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta actualizado
 */

router.put(
    "/:id",
    validateActualizarDetalleVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const {
            id_venta,
            id_producto,
            cantidad_vendida,
            precio_producto,
            subtotal,
        } = req.body;
        try {
            const detalleventa = await DetalleVentaController.actualizarDetalleVenta(
                id,
                id_venta,
                id_producto,
                cantidad_vendida,
                precio_producto,
                subtotal
            );
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/detalleventa/:id
 *  @desc Delete An DetalleVenta
 *  @access Public
 *  @params id
 *  @validation validateEliminarDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta eliminado
 */

router.delete(
    "/:id",
    validateEliminarDetalleVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const detalleventa = await DetalleVentaController.eliminarDetalleVenta(
                id
            );
            res.status(200).json(detalleventa);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
