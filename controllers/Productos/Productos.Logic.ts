import { Request, Response } from "express";
import {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerIdProveedorPorNomenclatura,
    obtenerIdMarcaPorNomenclatura,
    obtenerIdCategoriaPorNomenclatura,
    obtenerIdAnimalPorNomenclatura,
    obtenerIDCantidadPorNomenclatura,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "./Productos.AccessData";

export const obtenerProductosNegocio = async (req: Request, res: Response) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const obtenerProductoPorIdNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    try {
        const producto = await obtenerProductoPorId(Number(id));
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ error: "Error al obtener producto por ID" });
    }
};

export const crearProductoNegocio = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const nuevoProducto = await crearProducto(data);
        res.json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
};

export const actualizarProductoNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    const data = req.body;

    try {
        const productoActualizado = await actualizarProducto(Number(id), data);
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
};

export const eliminarProductoNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    try {
        await eliminarProducto(Number(id));
        res.json({ mensaje: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};
