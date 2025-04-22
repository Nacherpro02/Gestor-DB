const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { username, email, password } = req.body;

  userModel.findUserByUsername(username, (err, results) => {
    if (err) {
      console.error('Error buscando usuario:', err);
      return res.status(500).json({ msg: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ msg: 'Usuario ya existe' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    userModel.createUser(username, email, hashedPassword, (err) => {
      if (err) {
        console.error('Error creando usuario:', err);
        return res.status(500).json({ msg: 'Error al registrar usuario' });
      }

      res.status(201).json({ msg: 'Usuario registrado' });
    });
  });
};


const login = (req, res) => {
  const { username, password } = req.body;
  userModel.findUserByUsername(username, (err, results) => {
    if (results.length === 0) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const user = results[0];
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};


const search = (req, res) => {
  const searchTerm = req.params.search;

  userModel.searchUser(searchTerm, (err, results) => {
    if (err) {
      console.error('Error en búsqueda:', err);
      return res.status(500).json({ error: 'Error al buscar usuarios' });
    }
    res.json(results);
  });
};

module.exports = { register, login, search};
