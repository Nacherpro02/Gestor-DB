const db = require('../db');

// Buscar usuario 
const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE name = ?', [username], callback);
};


// Crear un nuevo usuario
const createUser = (username, hashedPassword, callback) => {
  db.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], callback);
};

const searchUser = (data, callback) => {
  const query = `
    SELECT name, email FROM users
    WHERE 
      name LIKE ? OR
      email LIKE ?
  `;
  const searchValue = `%${data}%`;
  db.query(query, [searchValue, searchValue], callback);
};


module.exports = { findUserByUsername, createUser, searchUser };
