// inventarioService.js

// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllInventario,
    getInventarioByProducto,
    getInventarioByProductId,
    createInventario,
    updateInventario,
    deleteInventario,
} from './Inventario.AccessData';

// Obtener todos los registros de inventario
export async function obtenerTodosLosInventarios() {
    return await getAllInventario();
}

// Obtener un registro de inventario por nombre de producto
export async function obtenerInventarioPorProducto(producto: any) {
    return await getInventarioByProducto(producto);
}

// Obtener un registro de inventario por su ID de producto
export async function obtenerInventarioPorId(id_producto: any) {
    return await getInventarioByProductId(id_producto);
}

// Crear un nuevo registro de inventario
export async function crearNuevoInventario(id_producto: any, existencias: any, StockMinimo: any, StockMaximo: any) {
    return await createInventario(id_producto, existencias, StockMinimo, StockMaximo);
}

// Actualizar un registro de inventario por su ID de producto
export async function actualizarInventario(id_producto: any, existencias: any, StockMinimo: any, StockMaximo: any) {
    return await updateInventario(id_producto, existencias, StockMinimo, StockMaximo);
}

// Eliminar un registro de inventario por su ID de producto
export async function eliminarInventario(id_producto: any) {
    return await deleteInventario(id_producto);
}
