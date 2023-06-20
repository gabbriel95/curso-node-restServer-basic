const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Todo validar contra base de datos

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({ usuario });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  // Encriptar el password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en base de datos
  await usuario.save();

  res.json({ usuario });
};

const usuariosPath = (req, res) => {
  res.json({ mgs: "patch API" });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false,
    new: true,
  });

  res.json({ usuario });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPath,
  usuariosDelete,
};
