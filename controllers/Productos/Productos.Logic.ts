import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "./Productos.AccessData";

export async function obtenerProductosNegocio() {
    return await obtenerProductos();
}

export async function obtenerProductoPorIdNegocio(id: number) {
    return await obtenerProductoPorId(id);
}

export async function crearProductoNegocio(data: any) {
    return await crearProducto(data);
}

export async function actualizarProductoNegocio(id: number, data: any) {
    return await actualizarProducto(id, data);
}

export async function eliminarProductoNegocio(id: number) {
    return await eliminarProducto(id);
}

