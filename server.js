const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const path = require('path');
const fs = require('fs');
const axios = require('axios');

//userSocketMap
const userSocketMap = new Map();

const app = express();
const server = http.createServer(app);

const staticOptions = {
  etag: false,
  maxAge: '1d',
  index: false,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
  },
};

app.use(express.static(path.join(__dirname, '/dist'), staticOptions));

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store');
//   next();
// });

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.get('/message', (req, res) => {
  // const { message } = req.body;
  console.log('Mensaje recibido:');
  io.emit('message', 'hola');
  res.send('Mensaje enviado');
});

const messages = [];
// Manejador de conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  //enviar mensaje al recibirlo

  // Manejar eventos personalizados aquí
  socket.on('MESSAGES_SERVER', () => {
    // console.log('Mensaje recibido:', msg);
    // io.emit('MESSAGES_CLIENT', messages); // Enviar el mensaje a todos los clientes
    //broadcast
    // socket.broadcast.emit("hello", "world");
    socket.emit('MESSAGES_CLIENT', messages);
  });

  socket.on('NEW_MESSAGE_SERVER', (data) => {
    console.log('Mensaje recibido:', data);
    messages.push(data);
    // io.emit('NEW_MESSAGE_CLIENT', data); // Enviar el mensaje a todos los clientes
    //BROADCAST
    // socket.emit('NEW_MESSAGE_CLIENT', data);
    socket.broadcast.emit('NEW_MESSAGE_CLIENT', data);
  });
  //

  // Manejar evento para unirse a un canal privado
  // socket.on('unirse-a-canal-privado', (userId) => {
  //   userSocketMap.set(userId, socket.id);
  //   console.log(`Usuario ${userId} se unió al canal privado.`);
  // });

  // Manejar evento para unirse a una sala privada
  socket.on('unirse-a-sala-privada', (roomId) => {
    socket.join(roomId);
    console.log(`Usuario ${socket.id} se unió a la sala privada ${roomId}`);
  });

  // Manejar evento de mensaje privado
  socket.on('mensaje-privado', ({ roomId, mensaje }) => {
    // Enviar el mensaje a todos los usuarios en la sala privada menos al remitente
    socket.broadcast.to(roomId).emit('mensaje', mensaje);
    console.log(`Mensaje enviado a la sala privada ${roomId}: ${mensaje}`);
  });

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
    // Eliminar la asociación entre el ID de usuario y el ID de socket al desconectar
    // for (const [userId, socketId] of userSocketMap) {
    //   if (socketId === socket.id) {
    //     userSocketMap.delete(userId);
    //     console.log(`Usuario ${userId} desconectado.`);
    //     break;
    //   }
    // }
  });
});

app.get('/products/:id_product', async (req, res) => {
  console.log('SSR PRODUCTOS', req.params.id_product);

  let data = {};
  try {
    const response = await axios.get(
      `https://armor-api.alguientiene.com/products/${req.params.id_product}`,
    );
    // console.log(response.data);
    console.log('response.data.metaData');
    data = response.data.metaData;
  } catch (error) {
    console.error(error);
    //dejar pasar igual
    // res.status(500).send('Error interno del servidor');
  }

  // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
  // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta
  // <meta itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
  //       <meta property="og:image" itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
  // console.log(response.data.metaData);

  //backup meta
  // const metaTags = `
  //       <title>${data.title}</title>
  //       <meta name="description" content=" ${data.content}">
  //       <meta itemprop="image" content="${data.img}">
  //       <meta property="og:image" itemprop="image" content="${data.img}">
  //       <!-- Otras metaetiquetas dinámicas -->
  //   `;

  const metaTags = `
        <!-- HTML Meta Tags -->
  <title>${data.title}</title>
  <meta name="description" content="${data.content}">

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="${data.title}">
  <meta itemprop="description" content="${data.content}">
  <meta itemprop="image" content="${data.img}">

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://armor.alguientiene.com/products/${req.params.id_product}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content="${data.content}">
  <meta property="og:image" content="${data.img}">

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@nombre_de_usuario_del_sitio">
  <meta name="twitter:site:id" content="ID_de_Twitter_del_sitio">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.content}">
  <meta name="twitter:image" content="${data.img}">

  <!-- Meta Tags Generated via http://heymeta.com -->
    `;

  // Lee el archivo "index.html"
  const indexPath = path.join(__dirname, '/dist', 'index.html');
  fs.readFile(indexPath, 'utf-8', (err, html) => {
    const modifiedHtml = html.replace('<title></title>', `${metaTags}`);
    if (err) {
      console.error('Error al leer el archivo index.html', err);
      res.send(modifiedHtml);
      // return res.status(500).send('Error interno del servidor');
    }

    // Inserta las metaetiquetas dinámicas en el archivo "index.html" creadas en ej objeto metaTags

    // Envía el archivo "index.html" modificado con las metaetiquetas
    res.send(modifiedHtml);
  });
});
app.get('/events/:id_event', async (req, res) => {
  console.log('SSR PRODUCTOS', req.params.id_product);

  let data = {};
  try {
    const response = await axios.get(
      `https://armor-api.alguientiene.com/events/${req.params.id_event}`,
    );
    // console.log(response.data);
    console.log('response.data.metaData event');
    data = response.data.metaData;
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }

  // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
  // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta
  // <meta itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
  //       <meta property="og:image" itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
  // console.log(response.data.metaData);
  const metaTags = `
        <title>${data.title}</title>
        <meta name="description" content=" ${data.content}">
        <meta itemprop="image" content="${data.img}">
        <meta property="og:image" itemprop="image" content="${data.img}">
        <!-- Otras metaetiquetas dinámicas -->
    `;

  // Lee el archivo "index.html"
  const indexPath = path.join(__dirname, '/dist', 'index.html');
  fs.readFile(indexPath, 'utf-8', (err, html) => {
    if (err) {
      console.error('Error al leer el archivo index.html', err);
      res.send(modifiedHtml);
      // return res.status(500).send('Error interno del servidor');
    }

    // Inserta las metaetiquetas dinámicas en el archivo "index.html" creadas en ej objeto metaTags
    const modifiedHtml = html.replace('<title></title>', `${metaTags}`);

    // Envía el archivo "index.html" modificado con las metaetiquetas
    res.send(modifiedHtml);
  });
});

app.get('*', async (req, res) => {
  // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
  // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta
  const metaTags = `<title>Warrior Template</title>
        <meta name="description" content=" test">
        <meta itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <meta property="og:image" itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <meta name="apple-mobile-web-app-title" content="hola">
        <!-- Otras metaetiquetas dinámicas -->
    `;

  // res.setHeader('Content-Type', 'application/javascript');

  // Lee el archivo "index.html"
  // if (req.url === '/dist/assets/index-d5f393a9.js') {
  //   // Establece el tipo MIME para JavaScript
  //   res.setHeader('Content-Type', 'application/javascript');

  //   // Lee y sirve el archivo JavaScript
  //   fs.readFile(__dirname, '/dist/assets/index-d5f393a9.js', (err, data) => {
  //     if (err) {
  //       // Manejar errores aquí
  //       console.error(err);
  //       res.statusCode = 500;
  //       res.end('Error interno del servidor');
  //     } else {
  //       res.end(data);
  //     }
  //   });
  // } else {
  //   // Manejar otras rutas o recursos aquí
  //   res.statusCode = 404;
  //   res.end('Recurso no encontrado');
  // }

  const indexPath = path.join(__dirname, '/dist', 'index.html');
  fs.readFile(indexPath, 'utf-8', (err, html) => {
    if (err) {
      console.error('Error al leer el archivo index.html', err);
      return res.status(500).send('Error interno del servidor');
    }

    // Inserta las metaetiquetas dinámicas en el archivo "index.html" creadas en ej objeto metaTags
    const modifiedHtml = html.replace('<title></title>', `${metaTags}`);

    // Envía el archivo "index.html" modificado con las metaetiquetas
    res.send(modifiedHtml);
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

//enviar mensaje

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.static(path.join(__dirname, '/dist'), staticOptions));

// Iniciar el servidor
const port = process.env.PORT || 2222;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
