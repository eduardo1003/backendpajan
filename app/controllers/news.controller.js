const db = require("../models");
const News = db.news;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: "News title can not be empty!" });
    }

    const news = {
        title: req.body.title,
        slug: req.body.slug || req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: req.body.content || req.body.body,
        excerpt: req.body.excerpt,
        category: req.body.category || 'general',
        status: req.body.status || 'published',
        isFeatured: req.body.isFeatured || req.body.featured || false,
        isBreaking: req.body.isBreaking || false,
        image: req.body.image,
        publishedAt: req.body.status === 'published' ? new Date() : null,
        tags: req.body.tags || []
    };

    News.create(news)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error creating news." }));
};

exports.findAll = (req, res) => {
    const { status, category, featured } = req.query;
    let condition = {};

    if (status && status !== 'all') condition.status = status;
    if (category) condition.category = category;
    if (featured === 'true') condition.isFeatured = true;

    News.findAll({ where: condition, order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']] })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error retrieving news." }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    News.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `News with id=${id} not found.` });
        })
        .catch(err => res.status(500).send({ message: "Error retrieving news with id=" + id }));
};

exports.update = (req, res) => {
    const id = req.params.id;
    News.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "News updated successfully." });
            else res.send({ message: `Cannot update News with id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error updating News with id=" + id }));
};

exports.delete = (req, res) => {
    const id = req.params.id;
    News.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "News deleted successfully!" });
            else res.send({ message: `Cannot delete News with id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Could not delete News with id=" + id }));
};
