const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5500', // O también puedes usar 127.0.0.1 si es tu caso
  credentials: true
}));




app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
