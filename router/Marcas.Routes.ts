import { Request, Response, NextFunction, Router } from "express";

import * as MarcasController from "../controllers/CatalogoMarcas/Marcas.Logic";

import { handleValidationErrors } from "../middleware/Marcas/Marcas.Middleware";

import {
    validateCreateMarca,
    validateDeleteMarca,
    validateGetAllMarcas,
    validateGetMarcaById,
    validateUpdateMarca,
} from "../Validators/Marcas/Marcas.Validator";

const router = Router();

// Rutas para el controlador de marcas

/**
 *  @route GET api/marcas
 *  @desc Get All Marcas
 *  @access Public
 *  @params null
 *  @validation validateGetAllMarcas, handleValidationErrors
 *  @return json con todos las marcas
 */

router.get(
    "/",
    validateGetAllMarcas,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const marcas = await MarcasController.getAllMarcasController();
            res.status(200).json(marcas);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/marcas/:id
 *  @desc Get An Marca
 *  @access Public
 *  @params id
 *  @validation validateGetMarcaById, handleValidationErrors
 *  @return json con la marca solicitada
 */

router.get(
    "/:id",
    validateGetMarcaById,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const marca = await MarcasController.getMarcaByIdController(id);
            res.status(200).json(marca);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/marcas
 *  @desc Create An Marca
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @validation validateCreateMarca, handleValidationErrors
 *  @return json con la marca creada
 */

router.post(
    "/",
    validateCreateMarca,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nombre, nomenclatura } = req.body;
        try {
            const marca = await MarcasController.createMarcaController(
                nombre,
                nomenclatura
            );
            res.status(200).json(marca);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/marcas/:id
 *  @desc Update An Marca
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @validation validateUpdateMarca, handleValidationErrors
 *  @return json con la marca actualizada
 */

router.put(
    "/:id",
    validateUpdateMarca,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { nombre, nomenclatura } = req.body;
        try {
            const marca = await MarcasController.updateMarcaController(
                id,
                nombre,
                nomenclatura
            );
            res.status(200).json(marca);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/marcas/:id
 *  @desc Delete An Marca
 *  @access Public
 *  @params id
 *  @validation validateDeleteMarca, handleValidationErrors
 *  @return json con la marca eliminada
 */

router.delete(
    "/:id",
    validateDeleteMarca,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const marca = await MarcasController.deleteMarcaController(id);
            res.status(200).json(marca);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
