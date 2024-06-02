import { Request, Response, NextFunction, Router } from "express";

import * as ProductosController from "../controllers/Productos/Productos.Logic";

import { handleValidationErrors } from "../middleware/Productos/Productos.Middleware";

import {
    validateObtenerProductosNegocio,
    validateObtenerProductoPorIdNegocio,
    validateCrearProductoNegocio,
    validateActualizarProductoNegocio,
} from "../Validators/Productos/Productos.Validator";

const router = Router();

// Rutas para el controlador de productos

/**
 *  @route GET api/productos
 *  @desc Get All Productos
 *  @access Public
 *  @params null
 *  @validation validateObtenerProductosNegocio, handleValidationErrors
 *  @return json con todos los productos
 */

router.get("/",
    validateObtenerProductosNegocio,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
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
 *  @validation validateObtenerProductoPorIdNegocio, handleValidationErrors
 *  @return json con el producto solicitado
 */

router.get("/:id",
    validateObtenerProductoPorIdNegocio,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
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
 *  @validation validateCrearProductoNegocio, handleValidationErrors
 *  @return json con el producto creado
 */

router.post("/",
    validateCrearProductoNegocio,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            nombre,
            precio,
            cantidad,
            descripcion,
            imagen,
            id_marca,
            id_categoria,
            id_proveedor,
            id_animal,
            id_tipoCantidad,
            codigo_barras,
            precio_granel,
            venta_granel,
        } = req.body;

        console.log(req.body);


        const productoObjeto = {
            nombre,
            precio,
            cantidad,
            descripcion,
            imagen,
            id_marca,
            id_categoria,
            id_proveedor,
            id_animal,
            id_tipoCantidad,
            codigo_barras,
            precio_granel,
            venta_granel,
        };


        try {
            const producto = await ProductosController.crearProductoNegocio(
                productoObjeto
            );
            res.status(200).json(producto);
        } catch (error) {
            next(error);
        }
    });

/**
 *  @route PUT api/productos/:id
 *  @desc Update An Producto
 *  @access Public
 *  @params id, -nombre: string -descripcion: string, -precio: string, -idMarca: number, -idAnimal: number, -idCategoria: number, -idProveedor: number, -imagen: string, -cantidad: string, -id_tipoCantidad: number, -codigoBarra: string, -venta_granel: boolean, -precio_granel: string
 *  @validation validateActualizarProductoNegocio, handleValidationErrors
 *  @return json con el producto actualizado
 */

router.put("/:id",
    validateActualizarProductoNegocio,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        const {
            nombre,
            precio,
            cantidad,
            descripcion,
            imagen,
            id_marca,
            id_categoria,
            id_proveedor,
            id_animal,
            id_tipoCantidad,
            codigo_barras,
            precio_granel,
            venta_granel,
        } = req.body;

        const productoObjeto = {
            nombre,
            precio,
            cantidad,
            descripcion,
            imagen,
            id_marca,
            id_categoria,
            id_proveedor,
            id_animal,
            id_tipoCantidad,
            codigo_barras,
            precio_granel,
            venta_granel,
        };
        console.log(productoObjeto);
        try {
            const producto = await ProductosController.actualizarProductoNegocio(
                id,
                productoObjeto
            );
            res.status(200).json(producto);
        } catch (error) {
            next(error);
        }
    });

/**
 *  @route DELETE api/productos/:id
 *  @desc Delete An Producto
 *  @access Public
 *  @params id
 *  @validation validateDeleteProductoNegocio, handleValidationErrors
 *  @return json con el producto eliminado
 */

router.delete(
    "/:id",
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction) => {
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
