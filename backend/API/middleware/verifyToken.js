const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(403).json({ msg: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    res.status(401).json({ msg: 'Token de sesión expirado' });
  }
};

module.exports = verifyToken;
