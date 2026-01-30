module.exports = (sequelize, Sequelize) => {
    const Transparencia = sequelize.define("transparencias", {
        section: {
            type: Sequelize.ENUM('LOTAIP', 'Rendición de Cuentas'),
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mes: {
            type: Sequelize.STRING, // For LOTAIP
            allowNull: true
        },
        literal: {
            type: Sequelize.STRING, // For LOTAIP (1.1, etc) or Phase for RC (Fase 1, etc)
            allowNull: true
        },
        category: {
            type: Sequelize.STRING, // For LOTAIP (Conjunto de datos, etc)
            allowNull: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        archivo_url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        orden: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        schema: 'public'
    });

    return Transparencia;
};
