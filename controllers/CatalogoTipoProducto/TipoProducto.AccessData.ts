import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function getAllTipoCantidad() {
    return await prisma.catalogoTipoCantidad.findMany();
}

export async function getTipoCantidadById(id: number) {
    return await prisma.catalogoTipoCantidad.findUnique({
        where: { id_tipoCantidad: id },
    });
}

export async function createTipoCantidad(nombre: string, nomenclatura: string) {
    return await prisma.catalogoTipoCantidad.create({
        data: {
            nombre, 
            nomenclatura
        }
    });
}

export async function updateTipoCantidad(id: number, data: any) {
    return await prisma.catalogoTipoCantidad.update({
        where: { id_tipoCantidad: id },
        data,
    });
}

export async function deleteTipoCantidad(id: number) {
    return await prisma.catalogoTipoCantidad.delete({
        where: { id_tipoCantidad: id },
    });
}

