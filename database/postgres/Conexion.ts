const Conexion_Postgres = {
    titulo: process.env.postgres_Titulo,
    usuario: process.env.postgres_Usuario,
    contraseña: process.env.postgres_Contrasena,
    host: process.env.postgres_Host
}

export const URL_Postgres = Conexion_Postgres.titulo + "://" + Conexion_Postgres.usuario + ":" + Conexion_Postgres.contraseña + "@" + Conexion_Postgres.host
