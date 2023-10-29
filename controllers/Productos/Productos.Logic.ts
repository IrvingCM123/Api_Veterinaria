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
    id_marca: any;
    id_categoria: any;
    id_proveedor: any;
    id_animal: any;
    id_tipoCantidad: any;
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

    const id_marca = await obtenerIdMarcaPorNomenclatura(data.id_marca);
    const id_categoria = await obtenerIdCategoriaPorNomenclatura(data.id_categoria);
    const id_proveedor = await obtenerIdProveedorPorNomenclatura(data.id_proveedor);
    const id_animal = await obtenerIdAnimalPorNomenclatura(data.id_animal);
    const id_tipoCantidad = await obtenerIDCantidadPorNomenclatura(data.id_tipoCantidad);

    data.id_marca = id_marca;
    data.id_categoria = id_categoria;
    data.id_proveedor = id_proveedor;
    data.id_animal = id_animal;
    data.id_tipoCantidad = id_tipoCantidad;

    return await actualizarProducto(id, data);
}

export async function eliminarProductoNegocio(id: number) {
    return await eliminarProducto(id);
}
