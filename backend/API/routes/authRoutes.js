const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida
router.get('/protected', verifyToken, (req, res) => {
  // Si el token es válido, esta parte se ejecutará
  res.json({ msg: 'Acceso concedido, token válido' });
});

module.exports = router;
