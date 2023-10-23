import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "./Productos.AccessData";

interface Producto {
    nombre: string;
    descripcion: string;
    precio: string;
    idMarca: number;
    idAnimal: number;
    idCategoria: number;
    idProveedor: number;
    imagen: string;
    cantidad: string;
    id_tipoCantidad: number;
    codigoBarra: string;
    venta_granel: boolean;
    precio_granel: string;
}

export async function obtenerProductosNegocio() {
    return await obtenerProductos();
}

export async function obtenerProductoPorIdNegocio(id: number) {
    return await obtenerProductoPorId(id);
}

export async function crearProductoNegocio(data: Producto) {
    return await crearProducto(data);
}

export async function actualizarProductoNegocio(id: number, data: Producto) {
    return await actualizarProducto(id, data);
}

export async function eliminarProductoNegocio(id: number) {
    return await eliminarProducto(id);
}
