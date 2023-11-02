import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function obtenerProductoPorId(id: number) {
    return await prisma.productos.findFirst({
        where: { codigo_barras: id.toString() },
        include: {
            marca: true,
            proveedor: true,
            categoria: true,
            inventario: true,
        },
    });
}

export async function obtenerIdProveedorPorNomenclatura(nomenclatura: string) {
    const proveedor = await prisma.catalogoProveedor.findFirst({
        where: { nomenclatura },
    });

    if (!proveedor) {
        throw new Error(`Proveedor con nomenclatura ${nomenclatura} no encontrado`);
    }

    return proveedor.id_proveedor;
}

export async function obtenerIdMarcaPorNomenclatura(nomenclatura: string) {
    const marca = await prisma.catalogoMarca.findFirst({
        where: { nomenclatura },
    });

    if (!marca) {
        throw new Error(`Marca con nomenclatura ${nomenclatura} no encontrada`);
    }

    return marca.id_marca;
}

export async function obtenerIdCategoriaPorNomenclatura(nomenclatura: string) {
    const categoria = await prisma.catalogoCategoria.findFirst({
        where: { nomenclatura },
    });

    if (!categoria) {
        throw new Error(`Categoría con nomenclatura ${nomenclatura} no encontrada`);
    }

    return categoria.id_categoria;
}

export async function obtenerIdAnimalPorNomenclatura(nomenclatura: string) {
    const animal = await prisma.catalagoAnimal.findFirst({
        where: { nomenclatura },
    });

    if (!animal) {
        throw new Error(`Animal con nomenclatura ${nomenclatura} no encontrado`);
    }

    return animal.id_categoria;
}

export async function obtenerIDCantidadPorNomenclatura(nomenclatura: string) {
    const tipoCantidad = await prisma.catalogoTipoCantidad.findFirst({
        where: { nomenclatura },
    });

    if (!tipoCantidad) {
        throw new Error(
            `Tipo de cantidad con nomenclatura ${nomenclatura} no encontrado`
        );
    }

    return tipoCantidad.id_tipoCantidad;
}

export async function crearProducto(data: any) {
    return await prisma.productos.create({
        data: {
            nombre: data.nombre,
            precio: data.precio,
            cantidad: data.cantidad,
            descripcion: data.descripcion,
            imagen: data.imagen,
            id_marca: data.id_marca,
            id_categoria: data.id_categoria,
            id_proveedor: data.id_proveedor,
            id_animal: data.id_animal,
            id_tipoCantidad: data.id_tipoCantidad,
            codigo_barras: data.codigo_barras,
            venta_granel: data.venta_granel,
            precio_granel: data.precio_granel,
            
        }
    });
}

export async function actualizarProducto(id: any, data: any) {
    return await prisma.productos.update({
        where: { id },
        data,
    });
}

export async function eliminarProducto(id: number) {
    return await prisma.productos.delete({
        where: { id },
    });
}

