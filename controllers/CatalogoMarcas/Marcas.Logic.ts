import { getAllMarcas, getMarcaById, createMarca, updateMarca, deleteMarca } from './Marcas.AccessData';

// Obtener todas las marcas
export async function getAllMarcasController() {
    return await getAllMarcas();
}

// Obtener una marca por su ID
export async function getMarcaByIdController(id: number) {
    return await getMarcaById(id);
}

// Crear una nueva marca
export async function createMarcaController(nombre: string, nomenclatura: string) {
    return await createMarca(nombre, nomenclatura);
}

// Actualizar una marca por su ID
export async function updateMarcaController(id: number, nombre: string, nomenclatura: string) {
    return await updateMarca(id, nombre, nomenclatura);
}

// Eliminar una marca por su ID
export async function deleteMarcaController(id: number) {
    return await deleteMarca(id);
}
