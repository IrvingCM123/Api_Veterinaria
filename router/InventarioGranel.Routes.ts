import { Request, Response, NextFunction, Router } from "express";

import * as InventarioGranelController from "../controllers/InventarioGranel/InventarioGranel.Logic";

import { handleValidationErrors } from "../middleware/InventarioGranel/InventarioGranel.Middleware";

import {
    validateObtenerTodosLosInventariosGranel,
    validateObtenerInventarioGranelPorId,
    validateCrearNuevoInventarioGranel,
    validateActualizarInventarioGranel,
    validateEliminarInventarioGranel,
} from "../Validators/InventarioGranel/InventarioGranel.Validator";

const router = Router();

// Rutas para el controlador de inventario granel

/**
 *  @route GET api/inventariogranel
 *  @desc Get All InventarioGranel
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosInventariosGranel, handleValidationErrors
 *  @return json con todos los inventarios granel
 */

router.get(
    "/",
    validateObtenerTodosLosInventariosGranel,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const inventariogranel =
                await InventarioGranelController.obtenerTodosLosInventariosGranel();
            res.status(200).json(inventariogranel);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/inventariogranel/:id
 *  @desc Get An InventarioGranel
 *  @access Public
 *  @params id
 *  @validation validateObtenerInventarioGranelPorId, handleValidationErrors
 *  @return json con el inventario granel solicitado
 */

router.get(
    "/:id",
    validateObtenerInventarioGranelPorId,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const inventariogranel =
                await InventarioGranelController.obtenerInventarioGranelPorId(id);
            res.status(200).json(inventariogranel);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/inventariogranel
 *  @desc Create An InventarioGranel
 *  @access Public
 *  @params -id_producto: number, -cantidad_producto: string, -cantidad_restante: string
 *  @validation validateCrearNuevoInventarioGranel, handleValidationErrors
 *  @return json con el inventario granel creado
 */

router.post(
    "/",
    validateCrearNuevoInventarioGranel,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { id_producto, cantidad_producto, cantidad_restante } = req.body;
        const ObjetoInventarioGranel = {
            id_producto,
            cantidad_producto,
            cantidad_restante,
        };
        try {
            const inventariogranel =
                await InventarioGranelController.crearNuevoInventarioGranel(
                    ObjetoInventarioGranel
                );
            res.status(200).json(inventariogranel);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/inventariogranel/:id
 *  @desc Update An InventarioGranel
 *  @access Public
 *  @params id, -id_producto: number, -cantidad_producto: string, -cantidad_restante: string
 *  @validation validateActualizarInventarioGranel, handleValidationErrors
 *  @return json con el inventario granel actualizado
 */

router.put(
    "/:id",
    validateActualizarInventarioGranel,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { id_producto, cantidad_producto, cantidad_restante } = req.body;
        const ObjetoInventarioGranel = {
            id_producto,
            cantidad_producto,
            cantidad_restante,
        };
        try {
            const inventariogranel =
                await InventarioGranelController.actualizarInventarioGranel(
                    id,
                    ObjetoInventarioGranel
                );
            res.status(200).json(inventariogranel);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/inventariogranel/:id
 *  @desc Delete An InventarioGranel
 *  @access Public
 *  @params id
 *  @validation validateEliminarInventarioGranel, handleValidationErrors
 *  @return json con el inventario granel eliminado
 */

router.delete(
    "/:id",
    validateEliminarInventarioGranel,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const inventariogranel =
                await InventarioGranelController.eliminarInventarioGranel(id);
            res.status(200).json(inventariogranel);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
