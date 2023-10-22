import { Request, Response, NextFunction, Router } from "express";

import * as CategoriasController from "../controllers/CatalogoCategoria/Categoria.Logic";

import { handleValidationErrors } from "../middleware/Categoria/Categoria.Middleware";

import {
    validateCreateCategoria,
    validateDeleteCategoria,
    validateGetCategoriaById,
    validateUpdateCategoria,
    validateGetAllCategorias,
} from "../Validators/CatalogoCategoria/Categoria.Validator";

const router = Router();

// Rutas para el controlador de categorias

/**
 *  @route GET api/categorias
 *  @desc Get All Categorias
 *  @access Public
 *  @params null
 *  @validation validateGetAllCategorias, handleValidationErrors
 *  @return json con todas las categorias
 */

router.get(
    "/",
    validateGetAllCategorias,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categorias =
                await CategoriasController.getAllCategoriasController();
            res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route GET api/categorias/:id
 *  @desc Get An Categoria
 *  @access Public
 *  @params id
 *  @validation validateGetCategoriaById, handleValidationErrors
 *  @return json con la categoria solicitada
 */

router.get(
    "/:id",
    validateGetCategoriaById,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const categoria = await CategoriasController.getCategoriaByIdController(
                id
            );
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route POST api/categorias
 *  @desc Create An Categoria
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @validation validateCreateCategoria, handleValidationErrors
 *  @return json con la categoria creada
 */

router.post(
    "/",
    validateCreateCategoria,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nombre, nomenclatura } = req.body;
        try {
            const categoria = await CategoriasController.createCategoriaController(
                nombre,
                nomenclatura
            );
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route PUT api/categorias/:id
 *  @desc Update An Categoria
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @validation validateUpdateCategoria, handleValidationErrors
 *  @return json con la categoria actualizada
 */

router.put(
    "/:id",
    validateUpdateCategoria,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { nombre, nomenclatura } = req.body;
        try {
            const categoria = await CategoriasController.updateCategoriaController(
                id,
                nombre,
                nomenclatura
            );
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }
);

/**
 *  @route DELETE api/categorias/:id
 *  @desc Delete An Categoria
 *  @access Public
 *  @params id
 *  @validation validateDeleteCategoria, handleValidationErrors
 *  @return json con la categoria eliminada
 */

router.delete(
    "/:id",
    validateDeleteCategoria,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const categoria = await CategoriasController.deleteCategoriaController(
                id
            );
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
