const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
// Configuración de la aplicación Express

app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://sasha:Winx4210@clusterfotogram.3phxrwf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Rutas de posts
app.use('http://localhost:3001/api/posts/', postsRouter);

// Otros middlewares y configuraciones

app.use((err, req, res, next) => {
  console.error(err); // Imprimir el error en la consola para propósitos de depuración
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
