const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

//Configuaracion del CORS
app.use(cors({
  origin: 'http://localhost:4200', //Solo permite solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Solo permite estos métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rodriguez196', // Asegúrate de que sea la contraseña correcta
  database: 'testimonios'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1); // Detener la aplicación si no hay conexión a la base de datos
  }
  console.log('Conectado a la base de datos!!!');
});

// Middleware para parsear los datos del cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta POST para agregar testimonios
app.post('/testimonios', (req, res) => {
  const { nombre, comentario, imagen_url } = req.body;
  const fecha = new Date();

  if (!nombre || !comentario) {
    return res.status(400).json({ error: 'Nombre y comentario son obligatorios' });
  }

// Validar que la imagen_url sea una URL valida (opcional)
if(imagen_url && !isValidUrl(imagen_url)) {
  return res.status(400).json({ error: 'La URL de la imagen no es una URL válida' });
}

  connection.query(
    'INSERT INTO testimonios_tabla (nombre, comentario, imagen_url, fecha) VALUES (?, ?, ?, ?)',
    [nombre, comentario, imagen_url || '', fecha],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Testimonio agregado', id: results.insertId });
    }
  );
});

//Funcion para validar URLs
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Ruta GET para obtener testimonios
app.get('/testimonios', (req, res) => {
  connection.query('SELECT * FROM testimonios_tabla', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Ruta para ACTUALIZAR un testimonio (PUT)
app.put('/testimonios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, comentario, imagen_url } = req.body;

  connection.query(
    'UPDATE testimonios_tabla SET nombre = ?, comentario = ?, imagen_url = ? WHERE id = ?',
    [nombr, comentario, imagen_url || '', id],
    (err, results) => {
      if(err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Testimonio actualizado', id });
    }
  );
});

// Ruta para ELIMINAR un testimonio (DELETE)
app.delete('/testimonios/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM testimonios_tabla WHERE id =?',
    [id],
    (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Testimonio eliminado', id });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

