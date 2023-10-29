import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerIDCantidadPorNomenclatura,
    obtenerIdAnimalPorNomenclatura,
    obtenerIdCategoriaPorNomenclatura,
    obtenerIdMarcaPorNomenclatura,
    obtenerIdProveedorPorNomenclatura,
} from "./Productos.AccessData";

interface Producto {
    nombre: string;
    precio: string;
    cantidad: string;
    descripcion: string;
    imagen: string;
    id_marca: number;
    id_categoria: number;
    id_proveedor: number;
    id_animal: number;
    id_tipoCantidad: number;
    codigo_barras: string;
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

export async function actualizarProductoNegocio(id: any, data: Producto) {

    let id_tipoCantidad = data.id_tipoCantidad;

    return await actualizarProducto(id, data);
}

export async function eliminarProductoNegocio(id: number) {
    return await eliminarProducto(id);
}
