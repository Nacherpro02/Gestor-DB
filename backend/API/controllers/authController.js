const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'El nombre de usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar al usuario por su nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};
