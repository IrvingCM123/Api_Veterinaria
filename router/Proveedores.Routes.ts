import { Request, Response, NextFunction, Router } from "express";

import * as ProveedoresController from "../controllers/CatalogoProveedores/Proveedores.Logic";

import { handleValidationErrors } from "../middleware/Proveedores/Proveedores.Middleware";

import {
    validateGetAllProveedoresController,
    validateGetProveedorByIdController,
    validateCreateProveedorController,
    validateUpdateProveedorController,
    validateDeleteProveedorController,
} from "../Validators/Proveedores/Proveedores.Validator";

const router = Router();

// Rutas para el controlador de proveedores

/**
 *  @route GET api/proveedores
 *  @desc Get All Proveedores
 *  @access Public
 *  @params null
 *  @validation validateGetAllProveedoresController, handleValidationErrors
 *  @return json con todos los proveedores
 */

router.get(
    "/",
    validateGetAllProveedoresController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proveedores =
                await ProveedoresController.getAllProveedoresController();
            res.status(200).json(proveedores);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/proveedores/:id
 *  @desc Get An Proveedor
 *  @access Public
 *  @params id
 *  @validation validateGetProveedorByIdController, handleValidationErrors
 *  @return json con el proveedor solicitado
 */

router.get(
    "/:id",
    validateGetProveedorByIdController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const proveedor = await ProveedoresController.getProveedorByIdController(
                id
            );
            res.status(200).json(proveedor);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/proveedores
 *  @desc Create An Proveedor
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string, -direccion: string, -ciudad: string, -estado: string, -telefono: string, -email: string
 *  @validation validateCreateProveedorController, handleValidationErrors
 *  @return json con el proveedor creado
 */

router.post(
    "/",
    validateCreateProveedorController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } =
            req.body;
        try {
            const proveedor = await ProveedoresController.createProveedorController(
                nombre,
                nomenclatura,
                direccion,
                ciudad,
                estado,
                telefono,
                email
            );
            res.status(200).json(proveedor);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/proveedores/:id
 *  @desc Update An Proveedor
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string -direccion: string, -ciudad: string, -estado: string, -telefono: string, -email: string
 *  @validation validateUpdateProveedorController, handleValidationErrors  
 *  @return json con el proveedor actualizado
 */

router.put("/:id",
    validateUpdateProveedorController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } =
            req.body;
        try {
            const proveedor = await ProveedoresController.updateProveedorController(
                id,
                nombre,
                nomenclatura,
                direccion,
                ciudad,
                estado,
                telefono,
                email
            );
            res.status(200).json(proveedor);
        } catch (error) {
            next(error);
        }
    });

/**
 *  @route DELETE api/proveedores/:id
 *  @desc Delete An Proveedor
 *  @access Public
 *  @params id
 *  @validation validateDeleteProveedorController, handleValidationErrors
 *  @return json con el proveedor eliminado
 */

router.delete(
    "/:id",
    validateDeleteProveedorController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const proveedor = await ProveedoresController.deleteProveedorController(
                id
            );
            res.status(200).json(proveedor);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
