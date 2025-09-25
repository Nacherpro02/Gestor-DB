const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());

app.use(express.static('../../GESTOR-DB')); 

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.listen(3000, '0.0.0.0', () => {
console.log('Servidor corriendo en http://127.0.0.1:3000');
});
