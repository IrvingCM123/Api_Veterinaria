import { Request, Response, NextFunction, Router } from "express";

import * as VendedorController from "../controllers/Vendedor/Vendedores.Logic";

const router = Router();

// Rutas para el controlador de vendedores

/**
 *  @route GET api/vendedor
 *  @desc Get All Vendedores
 *  @access Public
 *  @params null
 *  @return json con todos los vendedores
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendedores = await VendedorController.obtenerTodosLosVendedores();
        res.status(200).json(vendedores);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route GET api/vendedor/:id
 *  @desc Get An Vendedor
 *  @access Public
 *  @params id
 *  @return json con el vendedor solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const vendedor = await VendedorController.obtenerVendedorPorId(id);
        res.status(200).json(vendedor);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route POST api/vendedor
 *  @desc Create An Vendedor
 *  @access Public
 *  @params -acronimo: string, -permisoVenta: boolean, -userId: number
 *  @return json con el vendedor creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = await VendedorController.crearNuevoVendedor(acronimo, permisoVenta, userId);
        res.status(200).json(vendedor);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/vendedor/:id
 *  @desc Update An Vendedor
 *  @access Public
 *  @params id, -acronimo: string, -permisoVenta: boolean, -userId: number
 *  @return json con el vendedor actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = await VendedorController.actualizarVendedor(id, acronimo, permisoVenta, userId);
        res.status(200).json(vendedor);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/vendedor/:id
 *  @desc Delete An Vendedor
 *  @access Public
 *  @params id
 *  @return json con el vendedor eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const vendedor = await VendedorController.eliminarVendedor(id);
        res.status(200).json(vendedor);
    } catch (error) {
        next(error);
    }
}
);

export default router;
