const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


function agruparPorUsuarioYContrato(data) {
  const usuariosMap = {};

  data.forEach(item => {
    const clienteId = item.cliente_id;
    const numeroContrato = item.numero_contrato;

    // Crear el usuario si no existe
    if (!usuariosMap[clienteId]) {
      usuariosMap[clienteId] = {
        cliente_id: clienteId,
        datos_usuario: {
          nombre: item.nombre,
          apellido_1: item.apellido_1,
          apellido_2: item.apellido_2,
          nie: item.nie,
          fecha_nacimiento: item.fecha_nacimiento,
          estado_civil: item.estado_civil,
          numero_hijos: item.numero_hijos,
          direccion: item.direccion,
          localidad: item.localidad,
          codigo_postal: item.codigo_postal,
          provincia: item.provincia,
          telefono1: item.telefono1,
          telefono2: item.telefono2,
          vivienda: item.vivienda,
          situacion: item.situacion,
          profesion: item.profesion,
          empresa: item.empresa,
          direccion_empresa: item.direccion_empresa,
          telefono_empresa: item.telefono_empresa,
          antiguedad_laboral: item.antiguedad_laboral,
          ingreso_neto_mensual: item.ingreso_neto_mensual,
          nombre_apellido_2: item.nombre_apellido_2,
          nif: item.nif,
          fecha_nacimiento_e: item.fecha_nacimiento_e,
          direccion_2: item.direccion_2
        },
        contratos: []
      };
    }

    // Buscar si el contrato ya fue agregado al usuario
    const usuario = usuariosMap[clienteId];
    let contrato = usuario.contratos.find(c => c.numero_contrato === numeroContrato);

    // Si no existe, lo agregamos
    if (!contrato) {
      contrato = {
        numero_contrato: numeroContrato,
        datos_contrato: {
          codigo_agente: item.codigo_agente,
          fecha_contrato: item.fecha_contrato,
          observaciones: item.observaciones,
          total_financiado: item.total_financiado,
          total_incluido: item.total_incluido
        },
        articulos: [],
        firmas: {
          firma_cliente: item.firma_cliente,
          firma_repartidor: item.firma_repartidor,
          firma_agente: item.firma_agente
        }
      };
      usuario.contratos.push(contrato);
    }

    // Agregar el artículo si tiene descripción
    if (item.descripcion) {
      contrato.articulos.push({
        descripcion: item.descripcion,
        precio: item.precio,
        cantidad: item.cantidad,
        fecha_entrega: item.fecha_pago
      });
    }
  });

  return Object.values(usuariosMap);
}


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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  });
};


const search = (req, res) => {
  const searchTerm = req.params.search;

  userModel.searchUser(searchTerm, (err, results) => {
    if (err) {
      console.error('Error en búsqueda:', err);
      return res.status(500).json({ error: 'Error al buscar cliente' });
    }
    res.json(results);
  });
};

const addcliente = (req, res) => {
  const data = req.body
  userModel.addCliente(data, (err, results) => {
    if (err) {
      console.err('Error al añadir', err)
      return res.status(500).json({ error: 'Error al añadir cliente' });
    }
  })
}

const getCode = (req, res) => {
  const { destination } = req.body;
  const email = process.env.MAIL_MAIL;
  const email_pass = process.env.MAIL_PASS;

  userModel.findUserByMail(destination, async (err, results) => {
    if (err || !results.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const code = crypto.randomBytes(3).toString("hex").slice(0, 6);
    const expires = new Date(Date.now() + 5 * 60000);

    // Guarda el código y expiración
    userModel.saveResetCode(destination, code, expires, (err) => {
      if (err) return res.status(500).json({ error: "Error guardando código" });

      // Enviar correo
      const transporter = require("nodemailer").createTransport({
        service: "gmail",
        auth: { user: email, pass: email_pass },
      });

      const mailOptions = {
        from: email,
        to: destination,
        subject: "Código para restablecer contraseña",
        text: `Se ha solicitado un restablecimiento de tu contraseña.

Tu código es: ${code}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        console.log(error)
        if (error) return res.status(500).json({ error: "Error enviando correo" });
        return res.status(200).json({ message: "Código enviado" });
      });
    });
  });
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;

  userModel.findUserByMail(email, (err, results) => {
    if (err || !results.length) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = results[0];
    const now = new Date();

    if (user.reset_code !== code || new Date(user.reset_code_expires) < now) {
      return res.status(400).json({ error: "Código incorrecto o expirado" });
    }

    res.status(200).json({ message: "Código verificado" });
  });
};

const resetPassword = async (req, res) => {
  const { email, newPass } = req.body;
  const hashed = await bcrypt.hash(newPass, 10);

  userModel.updatePassword(email, hashed, (err) => {
    if (err) return res.status(500).json({ error: "Error actualizando contraseña" });
    res.status(200).json({ message: "Contraseña actualizada" });
  });
};

const existCode = async (req, res) => {
  const { email } = req.body;
  
  userModel.findUserByMail(email, (err, results) => {
    if (err) {
      return res.status(500).json({error: "Ha habido un error"})
    }

    const user = results[0]
    const now = new Date();
    
    if (results.length <= 0 || new Date(user.reset_code_expires) < now){
      return res.status(404).json({msg: "No existe"})
    }
    

    res.status(200).json({msg: "Existe"})
    
  });
};

const getTime = async (req, res) => {
  const { email } = req.body;
  
  userModel.findUserByMail(email, (err, results) => {
    if (err) {
      return res.status(500).json({error: "Ha habido un error"})
    }

    const user = results[0]
    const now = new Date();
    
    const time_left = Math.floor((new Date(user.reset_code_expires) - now)/1000)
    

    res.status(200).json({time: time_left})
    
})};

const searchAllData = (req, res) => {
  const { nombre, localidad, provincia, telefono1, nif } = req.body;  // Cambiar "dni" a "nif"
  console.log(nombre,localidad, provincia, telefono1, nif)
  // Creamos una consulta dinámica con JOIN para obtener datos de varias tablas
  let query = `
    SELECT 
      clientes.*, 
      contratos.*, 
      articulos.*, 
      pagos.*, 
      firmas.*
    FROM clientes
    LEFT JOIN contratos ON contratos.cliente_id = clientes.id
    LEFT JOIN articulos ON articulos.contrato_id = contratos.id
    LEFT JOIN pagos ON pagos.contrato_id = contratos.id
    LEFT JOIN firmas ON firmas.contrato_id = contratos.id
    WHERE 1=1
  `;
  
  let params = [];

  // Aplicamos filtros basados en los parámetros proporcionados
  if (nombre) {
    query += ' AND clientes.nombre LIKE ?';
    params.push(`%${nombre}%`);
  }

  if (localidad) {
    query += ' AND clientes.localidad LIKE ?';
    params.push(`%${localidad}%`);
  }

  if (provincia) {
    query += ' AND clientes.provincia LIKE ?';  // Aquí usamos "provincia"
    params.push(`%${provincia}%`);
  }

  if (telefono1) {
    query += ' AND clientes.telefono1 LIKE ?';
    params.push(`%${telefono1}%`);
  }

  if (nif) {  // Cambiar "dni" a "nif"
    query += ' AND clientes.nif LIKE ?';
    params.push(`%${nif}%`);
  }
  // Ejecutar la consulta en el modelo
  userModel.searchWithJoin(query, params, (err, results) => {
    console.log(results)
    if (err) {
      console.error('Error buscando datos relacionados:', err);
      return res.status(500).json({ error: 'Error al buscar datos' });
    }
    const datos = agruparPorUsuarioYContrato(results)
    res.json(datos); // Devuelve todos los datos relacionados en un único objeto
  });
};

module.exports = { searchAllData, register, login, search, addcliente, getCode, verifyCode, resetPassword, existCode, getTime };
