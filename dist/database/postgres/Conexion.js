"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL_Postgres = void 0;
const Conexion_Postgres = {
    titulo: process.env.postgres_Titulo,
    usuario: process.env.postgres_Usuario,
    contraseña: process.env.postgres_Contrasena,
    host: process.env.postgres_Host
};
exports.URL_Postgres = Conexion_Postgres.titulo + "://" + Conexion_Postgres.usuario + ":" + Conexion_Postgres.contraseña + "@" + Conexion_Postgres.host;
