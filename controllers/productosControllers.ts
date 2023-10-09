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

// Obtener el ID de proveedor por su nomenclatura
async function obtenerIdProveedorPorNomenclatura(nomenclatura: string) {
  const proveedor = await prisma.catalogoProveedor.findFirst({
    where: { nomenclatura },
  });

  if (!proveedor) {
    throw new Error(`Proveedor con nomenclatura ${nomenclatura} no encontrado`);
  }

  return proveedor.id_proveedor;
}

// Obtener el ID de marca por su nomenclatura
async function obtenerIdMarcaPorNomenclatura(nomenclatura: string) {
  const marca = await prisma.catalogoMarca.findFirst({
    where: { nomenclatura },
  });

  if (!marca) {
    throw new Error(`Marca con nomenclatura ${nomenclatura} no encontrada`);
  }

  return marca.id_marca;
}

// Obtener el ID de categoría por su nomenclatura
async function obtenerIdCategoriaPorNomenclatura(nomenclatura: string) {
  const categoria = await prisma.catalogoCategoria.findFirst({
    where: { nomenclatura },
  });

  if (!categoria) {
    throw new Error(`Categoría con nomenclatura ${nomenclatura} no encontrada`);
  }

  return categoria.id_categoria;
}

// Crear un nuevo producto con las consultas a proveedor, marca y categoría
export async function crearProducto(nombre: string, descripcion: string | null, precio: string, nomenclaturaProveedor: string, nomenclaturaMarca: string, nomenclaturaCategoria: string, imagen: string | null, cantidad: string) {
  const id_proveedor = await obtenerIdProveedorPorNomenclatura(nomenclaturaProveedor);
  const id_marca = await obtenerIdMarcaPorNomenclatura(nomenclaturaMarca);
  const id_categoria = await obtenerIdCategoriaPorNomenclatura(nomenclaturaCategoria);

  return await prisma.productos.create({
    data: {
      nombre,
      descripcion,
      precio,
      id_marca,
      id_proveedor,
      id_categoria,
      imagen,
      cantidad
    },
    include: {
      marca: true,
      proveedor: true,
      categoria: true,
      inventario: true,
    },
  });
}


// Actualizar un producto por su ID o por su nomenclatura de proveedor, marca y categoría
export async function actualizarProducto(id: number, nombre: string, descripcion: string | null, precio: string, nomenclaturaProveedor: string, nomenclaturaMarca: string, nomenclaturaCategoria: string, imagen: string | null, cantidad: string) {
  const id_proveedor = await obtenerIdProveedorPorNomenclatura(nomenclaturaProveedor);
  const id_marca = await obtenerIdMarcaPorNomenclatura(nomenclaturaMarca);
  const id_categoria = await obtenerIdCategoriaPorNomenclatura(nomenclaturaCategoria);

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
      cantidad
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
