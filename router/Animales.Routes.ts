import { Request, Response, NextFunction, Router } from "express";

import * as AnimalesController from "../controllers/CatalogoAnimales/Animal.Logic";
import { parse } from "path";

const router = Router();

// Rutas para el controlador de animales

/**
 *  @route GET api/animales
 *  @desc Get All Animales
 *  @access Public
 *  @params null
 *  @return json con todos los animales
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const animales = await AnimalesController.getAllAnimalesController();
        res.status(200).json(animales);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route GET api/animales/:id
 *  @desc Get An Animal
 *  @access Public
 *  @params id
 *  @return json con el animal solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const animal = await AnimalesController.getAnimalByIdController(id);
        res.status(200).json(animal);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route POST api/animales
 *  @desc Create An Animal
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @return json con el animal creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { nombre, nomenclatura } = req.body;
    try {
        const animal = await AnimalesController.createAnimalController(nombre, nomenclatura);
        res.status(200).json(animal);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/animales/:id
 *  @desc Update An Animal
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @return json con el animal actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const animal = await AnimalesController.updateAnimalController(id, nombre, nomenclatura);
        res.status(200).json(animal);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/animales/:id
 *  @desc Delete An Animal
 *  @access Public
 *  @params id
 *  @return json con el animal eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const animal = await AnimalesController.deleteAnimalController(id);
        res.status(200).json(animal);
    } catch (error) {
        next(error);
    }
}
);

export default router;