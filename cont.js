const bcrypt = require('bcryptjs');
password = "" //Dentro de las comillas escribes la contraseña
console.log(bcrypt.hashSync(password, 10))