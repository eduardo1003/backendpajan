exports.allAccess = (req, res) => {
  res.status(200).send("Contenido Publico.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido de Usuario.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido de Administrador.");
};

exports.ticBoard = (req, res) => {
  res.status(200).send("Contenido de TIC.");
};

exports.participacionBoard = (req, res) => {
  res.status(200).send("Contenido de Participación.");
};

exports.comunicacionBoard = (req, res) => {
  res.status(200).send("Contenido de Comunicación.");
};