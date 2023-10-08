import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los productos
export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        return await prisma.inventario.findMany({
            include: {
                producto: true,
            },
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}