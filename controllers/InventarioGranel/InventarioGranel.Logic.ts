// inventarioGranelService.js

// Importa las funciones de acceso a datos de la capa de acceso a datos
import {
    getAllInventarioGranel,
    getInventarioGranelById,
    createInventarioGranel,
    updateInventarioGranel,
    deleteInventarioGranel,
} from './InventarioGranel.AccessData';

// Tipo de entrada para la creación y actualización de inventario granel
type InventarioGranelInput = {
    id_producto: number;
    cantidad_producto: string;
    cantidad_restante: string;
};

// Obtener todos los registros de inventario granel
export async function obtenerTodosLosInventariosGranel() {
    return await getAllInventarioGranel();
}

// Obtener un registro de inventario granel por su ID
export async function obtenerInventarioGranelPorId(id: any) {
    return await getInventarioGranelById(id);
}

// Crear un nuevo registro de inventario granel
export async function crearNuevoInventarioGranel(inventarioGranelData: InventarioGranelInput) {
    return await createInventarioGranel(inventarioGranelData);
}

// Actualizar un registro de inventario granel por su ID
export async function actualizarInventarioGranel(id: any, inventarioGranelData: InventarioGranelInput) {
    return await updateInventarioGranel(id, inventarioGranelData);
}

// Eliminar un registro de inventario granel por su ID
export async function eliminarInventarioGranel(id: any) {
    return await deleteInventarioGranel(id);
}
