# Usamos una imagen de Node.js como base
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app/front
# docker run -p 2222:2222 front .
# docker build -t front .   


# Copiamos el archivo package.json y yarn.lock
# COPY ./package.json ./yarn.lock* ./
# Copiar los archivos package.json y yarn.lock al directorio de trabajo
COPY package.json yarn.lock ./

# Instalamos las dependencias
RUN yarn install



# Copiamos el resto de los archivos del proyecto
COPY . .

#hacemos el build
RUN yarn  build

# Exponemos el puerto en el que se ejecutará la aplicación
EXPOSE 8787

CMD ["node", "server.js"]
# CMD ["node", "./src/index.js"]
