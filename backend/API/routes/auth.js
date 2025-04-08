const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');  // Importa el middleware

// Ruta pública para registro de usuario
router.post('/register', authController.registerUser);

// Ruta pública para inicio de sesión
router.post('/login', authController.loginUser);

// Ruta protegida - Accede solo si el usuario está autenticado
router.get('/profile', verifyToken, (req, res) => {
  res.json({ msg: 'Perfil de usuario', userId: req.userId });
});

module.exports = router;
