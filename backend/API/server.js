const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin: ['http://192.168.1.169:5500' ,'http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  credentials: true,
}));

app.use(express.static('../../GESTOR-DB')); 

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.listen(3000, '0.0.0.0', () => {
console.log('Servidor corriendo en http://127.0.0.1:3000');
});
