const bcrypt = require('bcryptjs');
const password = "nacher";
const hashedPassword = bcrypt.hashSync(password, 10); // Esto genera el hash
console.log(hashedPassword); // Copia el hash generado y actualiza la base de datos con este valor
