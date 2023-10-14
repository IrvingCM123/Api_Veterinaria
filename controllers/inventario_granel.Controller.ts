import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type InventarioGranelInput = {
  id_producto: number;
  cantidad_producto: string;
  cantidad_restante: string;
};

// Obtener todos los registros de inventario_granel
export async function getAllInventarioGranel() {
  return await prisma.inventario_granel.findMany({
    include: {
      producto: true,
    },
  });
}

// Obtener un registro de inventario_granel por su ID
export async function getInventarioGranelById(id: number) {
  return await prisma.inventario_granel.findUnique({
    where: { id_inventario_granel: id },
    include: {
      producto: true,
    },
  });
}

// Crear un registro de inventario_granel
export async function createInventarioGranel(inventarioGranelData: InventarioGranelInput) {
  return await prisma.inventario_granel.create({
    data: inventarioGranelData,
  });
}

// Actualizar un registro de inventario_granel por su ID
export async function updateInventarioGranel(id: number, inventarioGranelData: InventarioGranelInput) {
  return await prisma.inventario_granel.update({
    where: { id_inventario_granel: id },
    data: inventarioGranelData,
    include: {
      producto: true,
    },
  });
}

// Eliminar un registro de inventario_granel por su ID
export async function deleteInventarioGranel(id: number) {
  return await prisma.inventario_granel.delete({
    where: { id_inventario_granel: id },
  });
}
