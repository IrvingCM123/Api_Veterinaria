import {
    crearVenta,
    getAllVentas,
    getVentaById,
    updateVenta,
    deleteVenta,
} from './Ventas.AcessData';

type DetalleVentaInput = {
    id_producto: number;
    cantidad_vendida: string;
    precio_producto: string;
    subtotal: string;
    venta_porcion: boolean;
};

type VentaInput = {
    id_vendedor: string;
    id_sucursal: number;
    fecha_venta: string;
    total_venta: string;
    subtotal: string;
    iva: string;
    detallesVenta: DetalleVentaInput[];
};

// Función para validar los datos de una venta
function validarVenta(venta: VentaInput) {
    if (parseFloat(venta.total_venta) <= 0) {
        throw new Error("El total de la venta debe ser mayor que cero.");
    }
}

// Obtener todas las ventas
export async function obtenerTodasLasVentas() {
    return await getAllVentas();
}

// Obtener una venta por su ID
export async function obtenerVentaPorId(id: number) {
    return await getVentaById(id);
}

export async function crearNuevaVenta(venta: VentaInput) {
    validarVenta(venta); 
    return await crearVenta(
        venta.id_vendedor,
        venta.id_sucursal,
        venta.fecha_venta,
        venta.total_venta,
        venta.subtotal,
        venta.iva,
        venta.detallesVenta
    );
}

// Actualizar una venta por su ID
export async function actualizarVenta(id: number, venta: VentaInput) {
    validarVenta(venta); 
    return await updateVenta(
        id,
        venta.id_sucursal,
        venta.id_vendedor,
        venta.fecha_venta,
        venta.total_venta,
        venta.subtotal,
        venta.iva
    );
}

// Eliminar una venta por su ID
export async function eliminarVenta(id: number) {
    return await deleteVenta(id);
}

