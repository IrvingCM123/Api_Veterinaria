import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los productos
export async function obtenerProductos() {
    return await prisma.productos.findMany({
        include: {
            marca: true,
            proveedor: true,
            categoria: true,
            inventario: true,
        },
    });
}

// Obtener un producto por su ID
export async function obtenerProductoPorId(id: number) {
    return await prisma.productos.findUnique({
        where: { id },
        include: {
            marca: true,
            proveedor: true,
            categoria: true,
            inventario: true,
        },
    });
}

// Crear un nuevo producto
export async function crearProducto(nombre: string, descripcion: string | null, precio: string, id_marca: number, id_proveedor: number, id_categoria: number, imagen: string | null) {
    return await prisma.productos.create({
        data: {
            nombre,
            descripcion,
            precio,
            id_marca,
            id_proveedor,
            id_categoria,
            imagen,
        },
        include: {
            marca: true,
            proveedor: true,
            categoria: true,
            inventario: true,
        },
    });
}

// Actualizar un producto por su ID
export async function actualizarProducto(id: number, nombre: string, descripcion: string | null, precio: string, id_marca: number, id_proveedor: number, id_categoria: number, imagen: string | null) {
    return await prisma.productos.update({
        where: { id },
        data: {
            nombre,
            descripcion,
            precio,
            id_marca,
            id_proveedor,
            id_categoria,
            imagen,
        },
        include: {
            marca: true,
            proveedor: true,
            categoria: true,
            inventario: true,
        },
    });
}

// Eliminar un producto por su ID
export async function eliminarProducto(id: number) {
    return await prisma.productos.delete({
        where: { id },
    });
}

// Cerrar la conexión de Prisma al finalizar
export async function cerrarConexionPrisma() {
    await prisma.$disconnect();
}
