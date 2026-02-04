module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
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
        excerpt: {
            type: Sequelize.TEXT
        },
        category: {
            type: Sequelize.STRING,
            defaultValue: 'general'
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'published'
        },
        isFeatured: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isBreaking: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: Sequelize.STRING
        },
        publishedAt: {
            type: Sequelize.DATE
        },
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: []
        }
    }, {
        schema: 'public'
    });

    return News;
};
