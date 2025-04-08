const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true // Aseguramos que el nombre de usuario sea único
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Middleware de Mongoose para encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);  // Generar un 'sal' con 10 rondas
    this.password = await bcrypt.hash(this.password, salt);  // Encriptamos la contraseña
  }
  next();
});

// Crear el modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
