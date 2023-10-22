import { Request, Response, NextFunction, Router } from "express";

import * as InventarioGranelController from "../controllers/InventarioGranel/InventarioGranel.Logic";

const router = Router();

// Rutas para el controlador de inventario granel

/**
 *  @route GET api/inventariogranel
 *  @desc Get All InventarioGranel
 *  @access Public
 *  @params null
 *  @return json con todos los inventarios granel
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventariogranel = await InventarioGranelController.obtenerTodosLosInventariosGranel();
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
 *  @return json con el inventario granel solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const inventariogranel = await InventarioGranelController.obtenerInventarioGranelPorId(id);
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
 *  @return json con el inventario granel creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { id_producto, cantidad_producto, cantidad_restante } = req.body;
    const ObjetoInventarioGranel = { id_producto, cantidad_producto, cantidad_restante };
    try {
        const inventariogranel = await InventarioGranelController.crearNuevoInventarioGranel(ObjetoInventarioGranel);
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
 *  @return json con el inventario granel actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { id_producto, cantidad_producto, cantidad_restante } = req.body;
    const ObjetoInventarioGranel = { id_producto, cantidad_producto, cantidad_restante };
    try {
        const inventariogranel = await InventarioGranelController.actualizarInventarioGranel(id, ObjetoInventarioGranel);
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
 *  @return json con el inventario granel eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const inventariogranel = await InventarioGranelController.eliminarInventarioGranel(id);
        res.status(200).json(inventariogranel);
    } catch (error) {
        next(error);
    }
}
);

export default router;

