const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { nombre, apellido = "No vino" } = req.query;
  res.json({ mgs: "get API - controlador", nombre, apellido });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({ mgs: "put API", id });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.json({ mgs: "post API", nombre, edad });
};

const usuariosPath = (req, res) => {
  res.json({ mgs: "patch API" });
};

const usuariosDelete = (req, res) => {
  const { id } = req.params;
  res.json({ mgs: "delete API", id });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPath,
  usuariosDelete,
};
