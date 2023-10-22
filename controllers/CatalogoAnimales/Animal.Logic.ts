import { getAnimalById, getAllAnimales, createAnimal, updateAnimal, deleteAnimal } from './Animal.AcessData';

// Obtener todos los animales
export async function getAllAnimalesController() {
    return await getAllAnimales();
}

// Obtener un animal por su ID
export async function getAnimalByIdController(id: number) {
    return await getAnimalById(id);
}

// Crear un nuevo animal
export async function createAnimalController(nombre: string, nomenclatura: string) {
    return await createAnimal(nombre, nomenclatura);
}

// Actualizar un animal por su ID
export async function updateAnimalController(id: number, nombre: string, nomenclatura: string) {
    return await updateAnimal(id, nombre, nomenclatura);
}

// Eliminar un animal por su ID
export async function deleteAnimalController(id: number) {
    return await deleteAnimal(id);
}

