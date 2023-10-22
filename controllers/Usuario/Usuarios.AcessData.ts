import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function iniciarSesion(email: string, password: string) {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

export async function obtenerUsuarios() {
    return await prisma.user.findMany();
}

export async function obtenerUsuario(email: string) {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

export async function createUsuario(email: string, password: string, nombre: string, apellido: string, telefono: string, direccion: string, imagen: string | null) {
    return await prisma.user.create({
        data: {
            email,
            password,
            nombre,
            apellido,
            telefono,
            direccion,
            imagen,
        },
    });
}

export async function updateUsuario(id: string, email: string, password: string, nombre: string, apellido: string, telefono: string, direccion: string, imagen: string | null) {
    return await prisma.user.update({
        where: { id_usuario: Number(id) },
        data: {
            email,
            password,
            nombre,
            apellido,
            telefono,
            direccion,
            imagen,
        },
    });
}

export async function deleteUsuario(id: string) {
    return await prisma.user.delete({
        where: { id_usuario: Number(id) },
    });
}


