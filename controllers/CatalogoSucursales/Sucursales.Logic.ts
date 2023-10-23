import { getAllSucursales, getSucursalById, createSucursal, updateSucursal, deleteSucursal } from './Sucursales.AccessData';

// Obtener todas las sucursales
export async function getAllSucursalesController() {
    return await getAllSucursales();
}

// Obtener una sucursal por su ID
export async function getSucursalByIdController(id: number) {
    return await getSucursalById(id);
}

// Crear una nueva sucursal
export async function createSucursalController(
    nombre: string,
    direccion: string,
    ciudad: string,
    estado: string,
    codigoPostal: string,
    telefono: string,
    encargado: string
) {
    return await createSucursal(
        nombre,
        direccion,
        ciudad,
        estado,
        codigoPostal,
        telefono,
        encargado
    );
}

// Actualizar una sucursal por su ID
export async function updateSucursalController(
    id: number,
    nombre: string,
    direccion: string,
    ciudad: string,
    estado: string,
    codigoPostal: string,
    telefono: string,
    encargado: string
) {
    return await updateSucursal(
        id,
        nombre,
        direccion,
        ciudad,
        estado,
        codigoPostal,
        telefono,
        encargado
    );
}

// Eliminar una sucursal por su ID
export async function deleteSucursalController(id: number) {
    return await deleteSucursal(id);
}
