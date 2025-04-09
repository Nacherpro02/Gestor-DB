const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));




app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(3000, () => {
console.log('Servidor corriendo en http://127.0.0.1:3000');
});
