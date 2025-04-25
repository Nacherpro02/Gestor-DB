const db = require('../db');

// Buscar usuario 
const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE name = ?', [username], callback);
};


// Crear un nuevo usuario
const createUser = (username, email, hashedPassword, callback) => {
  db.query('INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)', [username, email, hashedPassword], callback);
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

const addCliente = (data, callback) => {
  arrData = []
  const obj = JSON.parse(data);
  const valores = Object.values(obj);
  const query = `
    INSERT INTO clientes (name, email, password) VALUES (?, ?, ?)
  
  `
  db.query(query, valores, callback);
  
}

module.exports = { findUserByUsername, createUser, searchUser, addCliente };
