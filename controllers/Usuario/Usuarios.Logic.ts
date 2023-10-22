import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { iniciarSesion, obtenerUsuarios, obtenerUsuario, createUsuario, updateUsuario, deleteUsuario } from "./Usuarios.AcessData";

const secretKey = "Centenito";

export const iniciarSesionNegocio = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const usuario = await iniciarSesion(email, password);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (usuario.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Si el usuario existe y la contraseña es correcta, crea un token JWT
        const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, secretKey);

        // Retorna el token y otros datos del usuario si es necesario
        res.json({ token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};

export const obtenerUsuariosNegocio = async (req: Request, res: Response) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

export const obtenerUsuarioNegocio = async (req: Request, res: Response) => {
    const { email }: any = req.params;
    try {
        const usuario: any = await obtenerUsuario(email);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

export const crearUsuarioNegocio = async (req: Request, res: Response) => {
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const nuevoUsuario = await createUsuario(email, password, nombre, apellido, telefono, direccion, imagen);
        res.json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
};

export const actualizarUsuarioNegocio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuarioActualizado = await updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen);
        res.json(usuarioActualizado);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

export const eliminarUsuarioNegocio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteUsuario(id);
        res.json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

