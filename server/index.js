const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');



const app = express();
const port = 2222;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const staticOptions = {
  etag: false,
  maxAge: '1d',
  index: false,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
  },
};

// app.use(express.static(path.join(__dirname, './dist'), staticOptions));

// Middleware para servir archivos estáticos con opciones personalizadas
app.use(express.static(path.join(__dirname, '../dist'), staticOptions));

//cuando la ruta es /productos/:id_del_producto
app.get('/products/:id_product', async (req, res) => {
  console.log('SSR PRODUCTOS', req.params.id_product);

  let data = {};
  try {
    const response = await axios.get(
      `http://localhost:1313/products/${req.params.id_product}`,
    );
    // console.log(response.data);
    console.log(response.data.metaData);
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
  const indexPath = path.join(__dirname, '../dist', 'index.html');
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
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
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

  // Lee el archivo "index.html"
  const indexPath = path.join(__dirname, '../dist', 'index.html');
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

app.listen(port, () => {
  console.log(`Servidor Express.js en ejecución en http://localhost:${port}`);
});
