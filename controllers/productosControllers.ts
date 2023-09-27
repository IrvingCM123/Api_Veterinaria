import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { check, validationResult } from "express-validator";

import { firebaseAdmin } from "../database/firebase/firebaseConfig";

const prisma = new PrismaClient();

const db = firebaseAdmin.firestore();
const historial_ventaCollection = db.collection("historial_venta");

export const validarVenta = [
  check("nombre").notEmpty().withMessage("El nombre es requerido"),
  check("precio")
    .isNumeric()
    .withMessage("El precio debe ser un número válido"),
];

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
    const producto = await prisma.productos.findUnique({
      where: { id },
    });
    res.json(producto);
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

export const registrarVenta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ventaDetectada = req.body;

    const fechaVenta = ventaDetectada.fecha; 
    
    const nombreDocumento = `${fechaVenta}`;

    // Agrega el documento con el nombre generado
    historial_ventaCollection
      .doc(nombreDocumento)
      .set(ventaDetectada)
      .then(() => {
        console.log("Documento agregado con nombre:", nombreDocumento);
      })
      .catch((error) => {
        console.error("Error al agregar el documento:", error);
      });

    res.json({ message: "Venta registrada" });
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};
