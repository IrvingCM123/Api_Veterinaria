import { Request, Response } from "express";
import {
    getAllTipoCantidad,
    getTipoCantidadById,
    createTipoCantidad,
    updateTipoCantidad,
    deleteTipoCantidad,
} from "./TipoProducto.AccessData";

interface ITipoCantidad {
    nombre: string;
    nomenclatura: string;
}

// Obtener todos los tipos de cantidad

export async function getAllTipoCantidadNegocio() {
    return await getAllTipoCantidad();
}

export async function getTipoCantidadByIdNegocio(id: number) {
    return await getTipoCantidadById(id);
} 

export async function createTipoCantidadNegocio(data: ITipoCantidad) {
    return await createTipoCantidad(data);
}

export async function updateTipoCantidadNegocio(id: number, data: ITipoCantidad) {
    return await updateTipoCantidad(id, data);
}

export async function deleteTipoCantidadNegocio(id: number) {
    return await deleteTipoCantidad(id);
}

