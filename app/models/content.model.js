module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("contents", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        section: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'page' // 'page', 'block', 'alert'
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'published' // 'published', 'draft', 'archived'
        },
        publishedAt: {
            type: Sequelize.DATE
        },
        order: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isPublic: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        featuredImage: {
            type: Sequelize.STRING
        },
        metaTitle: {
            type: Sequelize.STRING
        },
        metaDescription: {
            type: Sequelize.TEXT
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: []
        }
    }, {
        schema: 'public'
    });

    return Content;
};
