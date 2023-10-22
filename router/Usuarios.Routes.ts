import { Request, Response, NextFunction, Router } from "express";

import * as UsuariosController from "../controllers/Usuario/Usuarios.Logic";

const router = Router();

// Rutas para el controlador de usuarios

/**
 *  @route GET api/usuarios
 *  @desc Get All Usuarios
 *  @access Public
 *  @params null
 *  @return json con todos los usuarios
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuariosController.obtenerUsuariosNegocio();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route GET api/usuarios/:id
 *  @desc Get An Usuario
 *  @access Public
 *  @params id
 *  @return json con el usuario solicitado
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.id;
    try {
        const usuario = await UsuariosController.obtenerUsuarioNegocio(email);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route POST api/usuarios
 *  @desc Create An Usuario
 *  @access Public
 *  @params -email: string, -password: string, -nombre: string, -apellido: string, -telefono: string, -direccion: string, -imagen: string
 *  @return json con el usuario creado
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = await UsuariosController.crearUsuarioNegocio(email, password, nombre, apellido, telefono, direccion, imagen);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route PUT api/usuarios/:id
 *  @desc Update An Usuario
 *  @access Public
 *  @params id, -email: string, -password: string, -nombre: string, -apellido: string, -telefono: string, -direccion: string, -imagen: string
 *  @return json con el usuario actualizado
 */

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = await UsuariosController.actualizarUsuarioNegocio(id, email, password, nombre, apellido, telefono, direccion, imagen);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
);

/**
 *  @route DELETE api/usuarios/:id
 *  @desc Delete An Usuario
 *  @access Public
 *  @params id
 *  @return json con el usuario eliminado
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        const usuario = await UsuariosController.eliminarUsuarioNegocio(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
);

export default router;