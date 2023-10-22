// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
} from './DetalleVenta.AccessData';

// Obtener todos los detalles de venta
export async function obtenerTodosLosDetallesVenta() {
    return await getAllDetallesVenta();
}

// Obtener un detalle de venta por su ID
export async function obtenerDetalleVentaPorId(id: any) {
    return await getDetalleVentaById(id);
}

// Crear un nuevo detalle de venta
export async function crearNuevoDetalleVenta(id_venta: any, id_producto: any, cantidad_vendida: any, precio_producto: any, subtotal: any, venta_granel: any) {
    return await createDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel);
}

// Actualizar un detalle de venta por su ID
export async function actualizarDetalleVenta(id: any, id_venta: any, id_producto: any, cantidad_vendida: any, precio_producto: any, subtotal: any) {
    return await updateDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal);
}

// Eliminar un detalle de venta por su ID
export async function eliminarDetalleVenta(id: any) {
    return await deleteDetalleVenta(id);
}
