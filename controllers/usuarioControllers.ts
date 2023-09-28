import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const iniciarSesion = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await prisma.user.findUnique({
      where: { email },
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (usuario.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  const { email } : any = req.params;
  try {
    const usuario: any = await prisma.user.findUnique({
      where: { email: (email) }, // Convierte id a número usando parseInt
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};
