import { Request, Response, NextFunction, Router } from "express";

import * as ProductosController from "../controllers/Productos/Productos.Logic";

const router = Router();

// Rutas para el controlador de productos

/**
 *  @route GET api/productos
 *  @desc Get All Productos
 *  @access Public
 *  @params null
 *  @return json con todos los productos
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productos = await ProductosController.obtenerProductosNegocio();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
});

/**
 *  @route GET api/productos/:id
 *  @desc Get An Producto
 *  @access Public
 *  @params id
 *  @return json con el producto solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = await ProductosController.obtenerProductoPorIdNegocio(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
});

/**
 *  @route POST api/productos
 *  @desc Create An Producto
 *  @access Public
 *  @params -nombre: string -descripcion: string, -precio: string, -idMarca: number, -idAnimal: number, -idCategoria: number, -idProveedor: number, -imagen: string, -cantidad: string, -id_tipoCantidad: number, -codigoBarra: string, -venta_granel: boolean, -precio_granel: string
 *  @return json con el producto creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const {
        nombre,
        descripcion,
        precio,
        idMarca,
        idAnimal,
        idCategoria,
        idProveedor,
        imagen,
        cantidad,
        id_tipoCantidad,
        codigoBarra,
        venta_granel,
        precio_granel,
    } = req.body;

    const productoObjeto = { nombre, descripcion, precio, idMarca, idAnimal, idCategoria, idProveedor, imagen, cantidad, id_tipoCantidad, codigoBarra, venta_granel, precio_granel };

    try {
        const producto = await ProductosController.crearProductoNegocio(productoObjeto);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/productos/:id
 *  @desc Update An Producto
 *  @access Public
 *  @params id, -nombre: string -descripcion: string, -precio: string, -idMarca: number, -idAnimal: number, -idCategoria: number, -idProveedor: number, -imagen: string, -cantidad: string, -id_tipoCantidad: number, -codigoBarra: string, -venta_granel: boolean, -precio_granel: string
 *  @return json con el producto actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    const {
        nombre,
        descripcion,
        precio,
        idMarca,
        idAnimal,
        idCategoria,
        idProveedor,
        imagen,
        cantidad,
        id_tipoCantidad,
        codigoBarra,
        venta_granel,
        precio_granel,
    } = req.body;

    const productoObjeto = { nombre, descripcion, precio, idMarca, idAnimal, idCategoria, idProveedor, imagen, cantidad, id_tipoCantidad, codigoBarra, venta_granel, precio_granel };

    try {
        const producto = await ProductosController.actualizarProductoNegocio(id, productoObjeto);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/productos/:id
 *  @desc Delete An Producto
 *  @access Public
 *  @params id
 *  @return json con el producto eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = await ProductosController.eliminarProductoNegocio(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}
);

export default router;