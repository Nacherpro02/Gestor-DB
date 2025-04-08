const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token'); // Obtener el token de los headers

  // Si no existe el token, devuelve un error de acceso denegado
  if (!token) return res.status(401).json({ msg: 'Acceso denegado' });

  try {
    // Verifica el token con la clave secreta definida en el archivo .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Guardamos el userId decodificado en la request
    next(); // Continuamos con la siguiente función (ruta protegida)
  } catch (error) {
    // Si el token es inválido o expirado, retornamos un error
    res.status(400).json({ msg: 'Token inválido' });
  }
};

module.exports = verifyToken;
