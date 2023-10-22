import { getAllProveedores, getProveedorById, createProveedor, updateProveedor, deleteProveedor } from './Proveedores.AccessData';

// Obtener todos los proveedores
export async function getAllProveedoresController() {
    return await getAllProveedores();
}

// Obtener un proveedor por su ID
export async function getProveedorByIdController(id: number) {
    return await getProveedorById(id);
}

// Crear un nuevo proveedor
export async function createProveedorController(
    nombre: string,
    nomenclatura: string,
    direccion: string,
    ciudad: string,
    estado: string,
    telefono: string,
    email: string
) {
    return await createProveedor(nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
}

// Actualizar un proveedor por su ID
export async function updateProveedorController(id: number, nombre: string, nomenclatura: string) {
    return await updateProveedor(id, nombre, nomenclatura);
}

// Eliminar un proveedor por su ID
export async function deleteProveedorController(id: number) {
    return await deleteProveedor(id);
}
