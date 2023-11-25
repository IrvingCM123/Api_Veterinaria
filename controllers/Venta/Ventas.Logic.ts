import {
    crearVenta,
    getAllVentas,
    getVentaById,
    updateVenta,
    deleteVenta,
    getFechasVentas,
    getVentaByFecha,
    getVentaReporte,
} from "./Ventas.AcessData";

import {
    obtenerDetalleVentaPorIdVenta
} from "../DetalleVenta/DetalleVenta.Logic"

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

// Obtener las fechas de las ventas y filtrar por fecha para no repetir las fechas
export async function obtenerFechasVentas() {
    const ventas: any = await getFechasVentas();
    const fechas = ventas.map((venta: any) => venta.fecha_venta);
    const fechasFiltradas = fechas.filter((fecha: any, index: any) => {
        return fechas.indexOf(fecha) === index;
    });
    return fechasFiltradas;
}

// Obtener las fechas de las ventas y filtrar por fecha para no repetir las fechas, además de filtrarlas por el mes recibido como parámetro
export async function obtenerFechasVentasPorMes(mes: number) {
    const ventas: any = await getFechasVentas();
    const fechas = ventas.map((venta: any) => venta.fecha_venta);
    const fechasFiltradas = fechas.filter((fecha: any, index: any) => {
        return fechas.indexOf(fecha) === index;
    });
    const fechasFiltradasPorMes = fechasFiltradas.filter((fecha: any) => {
        const fechaDate = new Date(fecha);
        const fechaMes = fechaDate.getMonth() + 1;
        return fechaMes === mes;
    });
    return fechasFiltradasPorMes;
}

// Obtener las ventas por fecha
export async function obtenerVentaPorFecha(fecha: string) {
    const ventas: any = await getVentaByFecha(fecha);

    for (let i = 0; i < ventas.length; i++) {
        const detallesVenta: any = await obtenerDetalleVentaPorIdVenta(
            ventas[i].id_venta
        );
        ventas[i].detallesVenta = detallesVenta;
    }

    //Recorrer todo el arreglo de ventas y hacer un fixed de 2 decimales a cada uno de los subtotales
    for (let i = 0; i < ventas.length; i++) {
        ventas[i].subtotal = ventas[i].subtotal.toFixed(2);

        for (let j = 0; j < ventas[i].detallesVenta.length; j++) {
            ventas[i].detallesVenta[j].subtotal = ventas[i].detallesVenta[j].subtotal.toFixed(2);
        }

    }

    return ventas;
}

// Obtener las ventas por mes, pasando como parámetro todos los días del mes
export async function obtenerInformacionReporte(año: number, mes: number) {

    let fechaInicio: any = new Date(año, mes - 1, 1);
    fechaInicio = fechaInicio.toString();
    fechaInicio = fechaInicio.slice(4, 15);

    let fechaFin: any = new Date(año, mes, 0);
    fechaFin = fechaFin.toString();
    fechaFin = fechaFin.slice(4, 15);

    fechaInicio =
        fechaInicio.slice(7, 11) +
        "-" +
        fechaInicio.slice(0, 3) +
        "-" +
        fechaInicio.slice(4, 6);

    fechaFin =
        fechaFin.slice(7, 11) +
        "-" +
        fechaFin.slice(0, 3) +
        "-" +
        fechaFin.slice(4, 6);

    let mesString = fechaInicio.slice(5, 8);

    let mesNumber: number = 1;
    switch (mesString) {
        case "Jan":
            mesNumber = 1;
            break;
        case "Feb":
            mesNumber = 2;
            break;
        case "Mar":
            mesNumber = 3;
            break;
        case "Apr":
            mesNumber = 4;
            break;
        case "May":
            mesNumber = 5;
            break;
        case "Jun":
            mesNumber = 6;
            break;
        case "Jul":
            mesNumber = 7;
            break;
        case "Aug":
            mesNumber = 8;
            break;
        case "Sep":
            mesNumber = 9;
            break;
        case "Oct":
            mesNumber = 10;
            break;
        case "Nov":
            mesNumber = 11;
            break;
        case "Dec":
            mesNumber = 12;
            break;
    }
    mes = mesNumber;

    fechaInicio =
        fechaInicio.slice(0, 4) + "-" + mes + "-" + fechaInicio.slice(9, 11);

    fechaFin =
        fechaFin.slice(0, 4) + "-" + mes + "-" + fechaFin.slice(9, 11);

    const ventasPorMes: any = await getVentaReporte(fechaInicio, fechaFin);

    for (let i = 0; i < ventasPorMes.length; i++) {
        const detallesVenta: any = await obtenerDetalleVentaPorIdVenta(
            ventasPorMes[i].id_venta
        );
        ventasPorMes[i].detallesVenta = detallesVenta;
    }

    for (let i = 0; i < ventasPorMes.length; i++) {
        ventasPorMes[i].subtotal = parseFloat(ventasPorMes[i].subtotal).toFixed(2);

        for (let j = 0; j < ventasPorMes[i].detallesVenta.length; j++) {
            ventasPorMes[i].detallesVenta[j].subtotal = parseFloat(ventasPorMes[i].detallesVenta[j].subtotal).toFixed(2);
        }

    }

    return ventasPorMes;
}
