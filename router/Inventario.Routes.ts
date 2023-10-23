import { Request, Response, NextFunction, Router } from "express";

import * as InventarioController from "../controllers/Inventario/Inventario.Logic";

import { handleValidationErrors } from "../middleware/Inventario/Inventario.Middleware";

import {
    validateObtenerTodosLosInventarios,
    validateObtenerInventarioPorProducto,
    validateObtenerInventarioPorId,
    validateCrearNuevoInventario,
    validateActualizarInventario,
    validateEliminarInventario,
} from "../Validators/Inventario/Inventario.Validator";

const router = Router();

// Rutas para el controlador de inventario

/**
 *  @route GET api/inventario
 *  @desc Get All Inventario
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosInventarios, handleValidationErrors
 *  @return json con todos los inventarios
 */

router.get(
    "/",
    validateObtenerTodosLosInventarios,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const inventario =
                await InventarioController.obtenerTodosLosInventarios();
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/inventario/:id
 *  @desc Get An Inventario
 *  @access Public
 *  @params id
 *  @validation validateObtenerInventarioPorId, handleValidationErrors
 *  @return json con el inventario solicitado
 */

router.get(
    "/:id",
    validateObtenerInventarioPorId,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const inventario = await InventarioController.obtenerInventarioPorId(id);
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @route Get api/inventario/:producto
 * @desc Get An Inventario
 * @access Public
 * @params producto
 * @validation validateObtenerInventarioPorProducto, handleValidationErrors
 * @return json con el inventario solicitado
 */

router.get(
    "/:producto",
    validateObtenerInventarioPorProducto,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const producto = req.params.producto;
        try {
            const inventario =
                await InventarioController.obtenerInventarioPorProducto(producto);
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/inventario
 *  @desc Create An Inventario
 *  @access Public
 *  @params -id_producto: number, -existencias: number, -StockMinimo: number, -StockMaximo: number
 *  @validation validateCrearNuevoInventario, handleValidationErrors
 *  @return json con el inventario creado
 */

router.post(
    "/",
    validateCrearNuevoInventario,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
        try {
            const inventario = await InventarioController.crearNuevoInventario(
                id_producto,
                existencias,
                StockMinimo,
                StockMaximo
            );
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/inventario/:id
 *  @desc Update An Inventario
 *  @access Public
 *  @params id, -existencias: number, -StockMinimo: number, -StockMaximo: number
 *  @validation validateActualizarInventario, handleValidationErrors
 *  @return json con el inventario actualizado
 */

router.put(
    "/:id",
    validateActualizarInventario,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { existencias, StockMinimo, StockMaximo } = req.body;
        try {
            const inventario = await InventarioController.actualizarInventario(
                id,
                existencias,
                StockMinimo,
                StockMaximo
            );
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/inventario/:id
 *  @desc Delete An Inventario
 *  @access Public
 *  @params id
 *  @validation validateEliminarInventario, handleValidationErrors
 *  @return json con el inventario eliminado
 */

router.delete(
    "/:id",
    validateEliminarInventario,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const inventario = await InventarioController.eliminarInventario(id);
            res.status(200).json(inventario);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
