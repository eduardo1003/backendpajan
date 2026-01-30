const db = require("../models");
const Transparencia = db.transparencia;
const Op = db.Sequelize.Op;

// Create and Save a new Document
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titulo || !req.body.archivo_url || !req.body.section) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Document
    const doc = {
        section: req.body.section,
        year: req.body.year,
        mes: req.body.mes,
        literal: req.body.literal,
        category: req.body.category,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        archivo_url: req.body.archivo_url,
        orden: req.body.orden,
        published: req.body.published ? req.body.published : false
    };

    // Save Document in the database
    Transparencia.create(doc)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Document."
            });
        });
};

// Retrieve all Documents from the database.
exports.findAll = (req, res) => {
    const { year, mes, section, published, search } = req.query;
    var condition = {};

    if (year) condition.year = year;
    if (mes) condition.mes = mes;
    if (section) condition.section = section;
    if (published !== undefined) condition.published = published === 'true';

    if (search) {
        condition[Op.or] = [
            { titulo: { [Op.iLike]: `%${search}%` } },
            { descripcion: { [Op.iLike]: `%${search}%` } }
        ];
    }

    Transparencia.findAll({ where: condition, order: [['orden', 'ASC']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving documents."
            });
        });
};

// Find a single Document with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Transparencia.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Document with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Document with id=" + id
            });
        });
};

// Update a Document by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Transparencia.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Document was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Document with id=" + id
            });
        });
};

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Transparencia.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Document was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Document with id=${id}. Maybe Document was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Document with id=" + id
            });
        });
};

// Get all years
exports.findYears = (req, res) => {
    Transparencia.findAll({
        attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('year')), 'year']],
        order: [['year', 'DESC']]
    })
        .then(data => {
            const years = data.map(item => item.year);
            res.send(years);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving years."
            });
        });
};
