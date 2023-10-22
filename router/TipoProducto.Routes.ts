import { Request, Response, NextFunction, Router } from "express";

import * as TipoProductoController from "../controllers/CatalogoTipoProducto/TipoProducto.Logic";

const router = Router();

// Rutas para el controlador de tipo producto

/**
 *  @route GET api/tipoProducto
 *  @desc Get All TipoProducto
 *  @access Public
 *  @params null
 *  @return json con todos los tipo producto
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tipoProducto = await TipoProductoController.getAllTipoCantidadNegocio();
        res.status(200).json(tipoProducto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route GET api/tipoProducto/:id
 *  @desc Get An TipoProducto
 *  @access Public
 *  @params id
 *  @return json con el tipo producto solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const tipoProducto = await TipoProductoController.getTipoCantidadByIdNegocio(id);
        res.status(200).json(tipoProducto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route POST api/tipoProducto
 *  @desc Create An TipoProducto
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @return json con el tipo producto creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { nombre, nomenclatura } = req.body;
    const data = { nombre, nomenclatura };
    try {
        const tipoProducto = await TipoProductoController.createTipoCantidadNegocio(data);
        res.status(200).json(tipoProducto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/tipoProducto/:id
 *  @desc Update An TipoProducto
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @return json con el tipo producto actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    const data = { nombre, nomenclatura };
    try {
        const tipoProducto = await TipoProductoController.updateTipoCantidadNegocio(id, data);
        res.status(200).json(tipoProducto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/tipoProducto/:id
 *  @desc Delete An TipoProducto
 *  @access Public
 *  @params id
 *  @return json con el tipo producto eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const tipoProducto = await TipoProductoController.deleteTipoCantidadNegocio(id);
        res.status(200).json(tipoProducto);
    } catch (error) {
        next(error);
    }
}
);

export default router;