const db = require('../db');

// Buscar usuario por nombre de usuario
const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE name = ?', [username], callback);
};


// Crear un nuevo usuario
const createUser = (username, hashedPassword, callback) => {
  db.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], callback);
};

module.exports = { findUserByUsername, createUser };
