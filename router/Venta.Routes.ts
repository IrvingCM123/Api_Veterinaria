import { Request, Response, NextFunction, Router } from "express";

import * as VentaController from "../controllers/Venta/Ventas.Logic";

const router = Router();

// Rutas para el controlador de ventas

/**
 *  @route GET api/venta
 *  @desc Get All Venta
 *  @access Public
 *  @params null
 *  @return json con todos los venta
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const venta = await VentaController.obtenerTodasLasVentas();
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route GET api/venta/:id
 *  @desc Get An Venta
 *  @access Public
 *  @params id
 *  @return json con el venta solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const venta = await VentaController.obtenerVentaPorId(id);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route POST api/venta
 *  @desc Create An Venta
 *  @access Public
 *  @params -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string, -detallesVenta: DetalleVentaInput[]
 *  @return json con el venta creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta } = req.body;
    try {
        const venta = await VentaController.crearNuevaVenta({ id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta });
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/venta/:id
 *  @desc Update An Venta
 *  @access Public
 *  @params id, -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string
 *  @return json con el venta actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva } = req.body;
    try {
        const venta = await VentaController.actualizarVenta(id, {
            id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva,
            detallesVenta: []
        });
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/venta/:id
 *  @desc Delete An Venta
 *  @access Public
 *  @params id
 *  @return json con el venta eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const venta = await VentaController.eliminarVenta(id);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}
);

export default router;