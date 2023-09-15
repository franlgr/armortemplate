const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const path = require('path');
const fs = require('fs');
const axios = require('axios');

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

// app.use(express.static(path.join(__dirname, '/dist'), staticOptions));

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store');
//   next();
// });
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.static(path.join(__dirname, '/dist'), staticOptions));
app.get('*', async (req, res) => {
  // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
  // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta
  const metaTags = `<title>DEFAULT TEMPLATE CHARLY G</title>
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

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


//enviar mensaje 

// Manejador de conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  //enviar mensaje al recibirlo

  app.get('/message', (req, res) => {
    // const { message } = req.body;
    io.emit('message', "hola");
    res.send('Mensaje enviado');
  });

  // Manejar eventos personalizados aquí
  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido:', msg);
    io.emit('chat message', msg); // Enviar el mensaje a todos los clientes
  });

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
