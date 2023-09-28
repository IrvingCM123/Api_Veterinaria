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
    }