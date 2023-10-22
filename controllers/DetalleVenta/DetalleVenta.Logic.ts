// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
} from './detallesVentaAccessData';

// Obtener todos los detalles de venta
export async function obtenerTodosLosDetallesVenta() {
    return await getAllDetallesVenta();
}

// Obtener un detalle de venta por su ID
export async function obtenerDetalleVentaPorId(id) {
    return await getDetalleVentaById(id);
}

// Crear un nuevo detalle de venta
export async function crearNuevoDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel) {
    return await createDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel);
}

// Actualizar un detalle de venta por su ID
export async function actualizarDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal) {
    return await updateDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal);
}

// Eliminar un detalle de venta por su ID
export async function eliminarDetalleVenta(id) {
    return await deleteDetalleVenta(id);
}
