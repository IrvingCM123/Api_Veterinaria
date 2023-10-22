// vendedoresService.js

// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllVendedores,
    getVendedorById,
    createVendedor,
    updateVendedor,
    deleteVendedor,
} from './vendedoresAccessData';

// Obtener todos los vendedores
export async function obtenerTodosLosVendedores() {
    return await getAllVendedores();
}

// Obtener un vendedor por su ID
export async function obtenerVendedorPorId(id) {
    return await getVendedorById(id);
}

// Crear un nuevo vendedor
export async function crearNuevoVendedor(acronimo, permisoVenta, userId) {
    return await createVendedor(acronimo, permisoVenta, userId);
}

// Actualizar un vendedor por su ID
export async function actualizarVendedor(id, acronimo, permisoVenta, userId) {
    return await updateVendedor(id, acronimo, permisoVenta, userId);
}

// Eliminar un vendedor por su ID
export async function eliminarVendedor(id) {
    return await deleteVendedor(id);
}
