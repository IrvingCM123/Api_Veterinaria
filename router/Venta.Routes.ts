import { Request, Response, NextFunction, Router } from "express";

import * as VentaController from "../controllers/Venta/Ventas.Logic";

import { handleValidationErrors } from "../middleware/Venta/Venta.Middleware";

import {
    validateObtenerTodasLasVentas,
    validateObtenerVentaPorId,
    validateCrearNuevaVenta,
    validateActualizarVenta,
    validateEliminarVenta,
} from "../Validators/Venta/Venta.Validator";

const router = Router();

// Rutas para el controlador de ventas

/**
 *  @route GET api/venta
 *  @desc Get All Venta
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodasLasVentas, handleValidationErrors
 *  @return json con todos los venta
 */

router.get(
    "/",
    validateObtenerTodasLasVentas,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const venta = await VentaController.obtenerTodasLasVentas();
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @route GET api/venta/
 * @desc Get fechas venta
 * @access Public
 * @params null
 * @return json con el venta solicitado
 */

router.get(
    "/fechas/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const venta = await VentaController.obtenerFechasVentas();
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/venta/:id
 *  @desc Get An Venta
 *  @access Public
 *  @params id
 *  @validation validateObtenerVentaPorId, handleValidationErrors
 *  @return json con el venta solicitado
 */

router.get(
    "/:id",
    validateObtenerVentaPorId,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const venta = await VentaController.obtenerVentaPorId(id);
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @route GET api/venta/:fecha
 * @desc Get fecha venta
 * @access Public
 * @params fecha
 * @return json con el venta solicitado
 */

router.get(
    "/fechas/:fecha",
    async (req: Request, res: Response, next: NextFunction) => {
        const fecha = req.params.fecha;
        try {
            const venta = await VentaController.obtenerVentaPorFecha(fecha);
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/venta
 *  @desc Create An Venta
 *  @access Public
 *  @params -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string, -detallesVenta: DetalleVentaInput[]
 *  @validation validateCrearNuevaVenta, handleValidationErrors
 *  @return json con el venta creado
 */

router.post(
    "/",
    validateCrearNuevaVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            id_vendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
            detallesVenta,
        } = req.body;
        try {
            const venta = await VentaController.crearNuevaVenta({
                id_vendedor,
                id_sucursal,
                fecha_venta,
                total_venta,
                subtotal,
                iva,
                detallesVenta,
            });
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);


/**
 * @route GET api/venta/reporte
 * @desc Get reporte venta
 * @access Public
 * @params mes: number, año: number
 * @return json con el venta solicitado
 * 
 */

router.post(
    "/reporte/mensual/",
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const año = req.body.año;
        const mes = req.body.mes;
        try {
            const venta = await VentaController.obtenerInformacionReporte(año, mes);
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/venta/:id
 *  @desc Update An Venta
 *  @access Public
 *  @params id, -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string
 *  @validation validateActualizarVenta, handleValidationErrors
 *  @return json con el venta actualizado
 */

router.put(
    "/:id",
    validateActualizarVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const {
            id_vendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
        } = req.body;
        try {
            const venta = await VentaController.actualizarVenta(id, {
                id_vendedor,
                id_sucursal,
                fecha_venta,
                total_venta,
                subtotal,
                iva,
                detallesVenta: [],
            });
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/venta/:id
 *  @desc Delete An Venta
 *  @access Public
 *  @params id
 *  @validation validateEliminarVenta, handleValidationErrors
 *  @return json con el venta eliminado
 */

router.delete(
    "/:id",
    validateEliminarVenta,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const venta = await VentaController.eliminarVenta(id);
            res.status(200).json(venta);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
