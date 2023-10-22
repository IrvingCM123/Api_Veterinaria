import { Request, Response, NextFunction, Router } from "express";

import * as AnimalesController from "../controllers/CatalogoAnimales/Animal.Logic";

import { handleValidationErrors } from "../middleware/Animales/Animal.Middleware";

import {
    validateCreateAnimal,
    validateDeleteAnimal,
    validateGetAnimalById,
    validateUpdateAnimal,
} from "../Validators/CatalogoAnimal/Animal.Validator";

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
        return res
            .status(500)
            .json({ message: "No se pudieron obtener los animales" });
    }
});

/**
 *  @route GET api/animales/:id
 *  @desc Get An Animal
 *  @access Public
 *  @params id
 *  @validation validateGetAnimalById, handleValidationErrors
 *  @return json con el animal solicitado
 */

router.get(
    "/:id",
    validateGetAnimalById,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const animal = await AnimalesController.getAnimalByIdController(id);
            res.status(200).json(animal);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener el animal" });
        }
    }
);

/**
 *  @route POST api/animales
 *  @desc Create An Animal
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @validation validateCreateAnimal, handleValidationErrors
 *  @return json con el animal creado
 */

router.post(
    "/",
    validateCreateAnimal,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nombre, nomenclatura } = req.body;
        try {
            const animal = await AnimalesController.createAnimalController(
                nombre,
                nomenclatura
            );
            res.status(200).json(animal);
        } catch (error) {
            return res.status(500).json({ message: "No se pudo crear el animal" });
        }
    }
);

/**
 *  @route PUT api/animales/:id
 *  @desc Update An Animal
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @validation
 *  @return json con el animal actualizado
 */

router.put(
    "/:id",
    validateUpdateAnimal,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const { nombre, nomenclatura } = req.body;
        try {
            const animal = await AnimalesController.updateAnimalController(
                id,
                nombre,
                nomenclatura
            );
            res.status(200).json(animal);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "No se pudo actualizar el animal" });
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

router.delete(
    "/:id",
    validateDeleteAnimal,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        try {
            const animal = await AnimalesController.deleteAnimalController(id);
            res.status(200).json(animal);
        } catch (error) {
            return res.status(500).json({ message: "No se pudo eliminar el animal" });
        }
    }
);

export default router;
