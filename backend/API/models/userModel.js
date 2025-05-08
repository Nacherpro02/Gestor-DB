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

const findUserByMail = (mail, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [mail], callback);
}

const saveResetCode = (email, code, expires, callback) => {
  db.query(
    "UPDATE users SET reset_code = ?, reset_code_expires = ? WHERE email = ?",
    [code, expires, email],
    callback
  );
}

const updatePassword = (email, hashedPassword, callback) => {
  db.query(
    "UPDATE users SET password = ?, reset_code = NULL, reset_code_expires = NULL WHERE email = ?",
    [hashedPassword, email],
    callback
  );
}

const searchWithJoin = (query, params, callback) =>{
  db.query(query, params, callback)
}

module.exports = { searchWithJoin, findUserByUsername, createUser, searchUser, addCliente, findUserByMail, saveResetCode, updatePassword};
