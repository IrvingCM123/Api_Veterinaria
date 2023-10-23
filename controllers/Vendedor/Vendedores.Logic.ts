// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllVendedores,
    getVendedorById,
    createVendedor,
    updateVendedor,
    deleteVendedor,
} from "./Vendedores.AccessData";

// Obtener todos los vendedores
export async function obtenerTodosLosVendedores() {
    return await getAllVendedores();
}

// Obtener un vendedor por su ID
export async function obtenerVendedorPorId(id: any) {
    return await getVendedorById(id);
}

// Crear un nuevo vendedor
export async function crearNuevoVendedor(
    acronimo: any,
    permisoVenta: any,
    userId: any
) {
    return await createVendedor(acronimo, permisoVenta, userId);
}

// Actualizar un vendedor por su ID
export async function actualizarVendedor(
    id: any,
    acronimo: any,
    permisoVenta: any,
    userId: any
) {
    return await updateVendedor(id, acronimo, permisoVenta, userId);
}

// Eliminar un vendedor por su ID
export async function eliminarVendedor(id: any) {
    return await deleteVendedor(id);
}
