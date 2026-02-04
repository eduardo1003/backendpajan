const db = require("../models");
const Content = db.content;
const { Op } = require("sequelize");

// Create content
exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const content = {
        title: req.body.title,
        slug: req.body.slug || req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: req.body.content || req.body.body,
        section: req.body.section,
        type: req.body.type || 'page',
        status: req.body.status || 'published',
        publishedAt: req.body.status === 'published' ? new Date() : null,
        order: req.body.order || 0,
        isPublic: req.body.isPublic !== undefined ? req.body.isPublic : true,
        featuredImage: req.body.featuredImage || req.body.image,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        tags: req.body.tags || []
    };

    Content.create(content)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error creating content." }));
};

// Get all content with optional status filter
exports.findAll = (req, res) => {
    const status = req.query.status;
    const section = req.query.section;
    let condition = {};

    if (status && status !== 'all') condition.status = status;
    if (section) condition.section = section;

    Content.findAll({ where: condition, order: [['order', 'ASC'], ['createdAt', 'DESC']] })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error retrieving content." }));
};

// Get content by section (public)
exports.findBySection = (req, res) => {
    const section = req.params.section;

    Content.findAll({
        where: {
            section: section,
            status: 'published'
            // isPublic: true // Temprarily removed to ensure content visibility
        },
        order: [['order', 'ASC']]
    })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error retrieving content." }));
};

// Update content
exports.update = (req, res) => {
    const id = req.params.id;

    Content.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Content updated successfully." });
            } else {
                res.send({ message: `Cannot update Content with id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: "Error updating Content with id=" + id }));
};

// Delete content
exports.delete = (req, res) => {
    const id = req.params.id;

    Content.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Content deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete Content with id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: "Could not delete Content with id=" + id }));
};
