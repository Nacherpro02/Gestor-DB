const bcrypt = require('bcryptjs');
const crypto = require("crypto");
password = "" //Dentro de las comillas escribes la contraseña
console.log(bcrypt.hashSync(password, 10))

results = "hola"
    function codeGenerator(input) {
      const hash = crypto.createHash("sha256").update(input).digest("hex");
      return hash.slice(0, 6);
    }

    const userName = results;
    const code = codeGenerator(userName);
    console.log(code)