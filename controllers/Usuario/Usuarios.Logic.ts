import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { iniciarSesion, obtenerUsuarios, obtenerUsuario, createUsuario, updateUsuario, deleteUsuario } from "./Usuarios.AcessData";

const secretKey = "Centenito";

// Obtener todos los usuarios

export async function iniciarSesionNegocio(email: string, password: string) {
    const usuario = await iniciarSesion(email, password);

    if (!usuario) {
        return ({ error: "Usuario no encontrado" });
    }

    if (usuario.password !== password) {
        return ({ error: "Contraseña incorrecta" });
    }

    // Si el usuario existe y la contraseña es correcta, crea un token JWT

    const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, secretKey);

    return ({ token });
}

export async function obtenerUsuariosNegocio() {
    return await obtenerUsuarios();
}

export async function obtenerUsuarioNegocio(email: string) {
    return await obtenerUsuario(email);
}

export async function crearUsuarioNegocio( email: string, password: string, nombre: string, apellido: string, telefono: string, direccion: string, imagen: string) {
    return await createUsuario(email, password, nombre, apellido, telefono, direccion, imagen);
}

export async function actualizarUsuarioNegocio(id: any, email: string, password: string, nombre: string, apellido: string, telefono: string, direccion: string, imagen: string) {
    return await updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen);
}

export async function eliminarUsuarioNegocio(id: any) {
    return await deleteUsuario(id);
}
