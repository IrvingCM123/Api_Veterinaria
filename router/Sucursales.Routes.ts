import { Request, Response, NextFunction, Router } from "express";

import * as SucursalesController from "../controllers/CatalogoSucursales/Sucursales.Logic";

import { handleValidationErrors } from "../middleware/Sucursales/Sucursales.Middleware";

import {
    validateGetAllSucursalesController,
    validateGetSucursalByIdController,
    validateCreateSucursalController,
    validateUpdateSucursalController,
    validateDeleteSucursalController,
} from "../Validators/Sucursales/Sucursales.Validator";

const router = Router();

// Rutas para el controlador de sucursales

/**
 *  @route GET api/sucursales
 *  @desc Get All Sucursales
 *  @access Public
 *  @params null
 *  @validation validateGetAllSucursalesController, handleValidationErrors
 *  @return json con todos los sucursales
 */

router.get("/",
    validateGetAllSucursalesController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sucursales = await SucursalesController.getAllSucursalesController();
            res.status(200).json(sucursales);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/sucursales/:id
 *  @desc Get An Sucursal
 *  @access Public
 *  @params id
 *  @validation validateGetSucursalByIdController, handleValidationErrors
 *  @return json con el sucursal solicitado
 */

router.get("/:id",
    validateGetSucursalByIdController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const sucursal = await SucursalesController.getSucursalByIdController(id);
            res.status(200).json(sucursal);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/sucursales
 *  @desc Create An Sucursal
 *  @access Public
 *  @params -nombre: string, -direccion: string, -ciudad: string, -estado: string, -codigoPostal: string, -telefono: string, -encargado: string
 *  @validation validateCreateSucursalController, handleValidationErrors
 *  @return json con el sucursal creado
 */

router.post("/",
    validateCreateSucursalController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
        try {
            const sucursal = await SucursalesController.createSucursalController(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
            res.status(200).json(sucursal);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/sucursales/:id
 *  @desc Update An Sucursal
 *  @access Public
 *  @params id, -nombre: string, -direccion: string, -ciudad: string, -estado: string, -codigoPostal: string, -telefono: string, -encargado: string
 *  @validation validateUpdateSucursalController, handleValidationErrors
 *  @return json con el sucursal actualizado
 */

router.put("/:id",
    validateUpdateSucursalController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
        try {
            const sucursal = await SucursalesController.updateSucursalController(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
            res.status(200).json(sucursal);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/sucursales/:id
 *  @desc Delete An Sucursal
 *  @access Public
 *  @params id
 *  @validation validateDeleteSucursalController, handleValidationErrors
 *  @return json con el sucursal eliminado
 */

router.delete("/:id",
    validateDeleteSucursalController,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const sucursal = await SucursalesController.deleteSucursalController(id);
            res.status(200).json(sucursal);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
