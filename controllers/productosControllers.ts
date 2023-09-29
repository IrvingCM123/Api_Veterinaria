import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.productos.findMany();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const buscarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto: any = await prisma.productos.findUnique({
      where: { id },
    });
    res.json(producto);
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.productos.delete({
      where: { id },
    });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const modificarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productoDetectado = req.body;
  try {
    await prisma.productos.update({
      where: { id },
      data: productoDetectado,
    });
    res.json({ message: "Producto modificado" });
  } catch (error) {
    console.error("Error al modificar el producto:", error);
    res.status(500).json({ error: "Error al modificar el producto" });
  }
}

export const crearProducto = async (req: Request, res: Response) => {
  const productoDetectado = req.body;
  try {
    await prisma.productos.create({
      data: productoDetectado,
    });
    res.json({ message: "Producto creado" });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
}
