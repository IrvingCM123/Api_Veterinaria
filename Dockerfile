# Utiliza una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el contenido de la carpeta dist de tu proyecto local al contenedor
COPY ./dist /app

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecutará tu aplicación (si es necesario)
# EXPOSE 8080

# Comando para ejecutar tu aplicación
CMD ["node", "app.js"]
