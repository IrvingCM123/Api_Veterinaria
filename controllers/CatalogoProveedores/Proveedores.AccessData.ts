import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los proveedores
export async function getAllProveedores() {
    return await prisma.catalogoProveedor.findMany();
}

// Obtener un proveedor por su ID
export async function getProveedorById(id: number) {
    return await prisma.catalogoProveedor.findUnique({
        where: { id_proveedor: id },
    });
}

// Crear un nuevo proveedor
export async function createProveedor(
    nombre: string,
    nomenclatura: string,
    direccion: string,
    ciudad: string,
    estado: string,
    telefono: string,
    email: string
) {
    return await prisma.catalogoProveedor.create({
        data: {
            nombre,
            nomenclatura,
            direccion,
            ciudad,
            estado,
            telefono,
            email,
        },
    });
}

// Actualizar un proveedor por su ID
export async function updateProveedor(id: number, nombre: string, nomenclatura: string) {
    return await prisma.catalogoProveedor.update({
        where: { id_proveedor: id },
        data: {
            nombre,
            nomenclatura,
        },
    });
}

// Eliminar un proveedor por su ID
export async function deleteProveedor(id: number) {
    return await prisma.catalogoProveedor.delete({
        where: { id_proveedor: id },
    });
}
