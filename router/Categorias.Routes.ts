import { Request, Response, NextFunction, Router } from "express";

import * as CategoriasController from "../controllers/CatalogoCategoria/Categoria.Logic";

const router = Router();

// Rutas para el controlador de categorias

/**
 *  @route GET api/categorias
 *  @desc Get All Categorias
 *  @access Public
 *  @params null
 *  @return json con todas las categorias
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categorias = await CategoriasController.getAllCategoriasController();
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
 *  @return json con la categoria solicitada
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const categoria = await CategoriasController.getCategoriaByIdController(id);
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
 *  @return json con la categoria creada
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = await CategoriasController.createCategoriaController(nombre, nomenclatura);
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
 *  @return json con la categoria actualizada
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = await CategoriasController.updateCategoriaController(id, nombre, nomenclatura);
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
 *  @return json con la categoria eliminada
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const categoria = await CategoriasController.deleteCategoriaController(id);
        res.status(200).json(categoria);
    } catch (error) {
        next(error);
    }
}
);

export default router;