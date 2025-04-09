const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { username, password } = req.body;
  
  userModel.findUserByUsername(username, (err, results) => {
    if (results.length > 0) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    userModel.createUser(username, hashedPassword, (err) => {
      if (err) throw err;
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

module.exports = { register, login };
