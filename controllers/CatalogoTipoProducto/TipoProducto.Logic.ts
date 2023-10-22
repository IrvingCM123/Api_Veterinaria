import { Request, Response } from "express";
import {
    getAllTipoCantidad,
    getTipoCantidadById,
    createTipoCantidad,
    updateTipoCantidad,
    deleteTipoCantidad,
} from "./TipoProducto.AccessData";

export const getAllTipoCantidadNegocio = async (req: Request, res: Response) => {
    try {
        const tiposCantidad = await getAllTipoCantidad();
        res.json(tiposCantidad);
    } catch (error) {
        console.error("Error al obtener tipos de cantidad:", error);
        res.status(500).json({ error: "Error al obtener tipos de cantidad" });
    }
};

export const getTipoCantidadByIdNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    try {
        const tipoCantidad = await getTipoCantidadById(Number(id));
        if (!tipoCantidad) {
            return res.status(404).json({ error: "Tipo de cantidad no encontrado" });
        }
        res.json(tipoCantidad);
    } catch (error) {
        console.error("Error al obtener tipo de cantidad por ID:", error);
        res.status(500).json({ error: "Error al obtener tipo de cantidad por ID" });
    }
};

export const createTipoCantidadNegocio = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const nuevoTipoCantidad = await createTipoCantidad(data);
        res.json(nuevoTipoCantidad);
    } catch (error) {
        console.error("Error al crear tipo de cantidad:", error);
        res.status(500).json({ error: "Error al crear tipo de cantidad" });
    }
};

export const updateTipoCantidadNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    const data = req.body;

    try {
        const tipoCantidadActualizado = await updateTipoCantidad(Number(id), data);
        res.json(tipoCantidadActualizado);
    } catch (error) {
        console.error("Error al actualizar tipo de cantidad:", error);
        res.status(500).json({ error: "Error al actualizar tipo de cantidad" });
    }
};

export const deleteTipoCantidadNegocio = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    try {
        await deleteTipoCantidad(Number(id));
        res.json({ mensaje: "Tipo de cantidad eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar tipo de cantidad:", error);
        res.status(500).json({ error: "Error al eliminar tipo de cantidad" });
    }
};
