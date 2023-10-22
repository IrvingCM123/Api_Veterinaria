import { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } from './Categoria.AcessData';

// Obtener todas las categorías
export async function getAllCategoriasController() {
    return await getAllCategorias();
}

// Obtener una categoría por su ID
export async function getCategoriaByIdController(id: number) {
    return await getCategoriaById(id);
}

// Crear una nueva categoría
export async function createCategoriaController(nombre: string, nomenclatura: string) {
    return await createCategoria(nombre, nomenclatura);
}

// Actualizar una categoría por su ID
export async function updateCategoriaController(id: number, nombre: string, nomenclatura: string) {
    return await updateCategoria(id, nombre, nomenclatura);
}

// Eliminar una categoría por su ID
export async function deleteCategoriaController(id: number) {
    return await deleteCategoria(id);
}

