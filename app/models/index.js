const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize;
if (config.URL) {
  sequelize = new Sequelize(config.URL, {
    dialect: config.dialect,
    pool: config.pool,
    dialectOptions: config.dialectOptions,
    retry: config.retry
  });
} else {
  sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: config.pool,
    dialectOptions: config.dialectOptions,
    retry: config.retry,
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.transparencia = require("./transparencia.model.js")(sequelize, Sequelize);
db.content = require("./content.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = [
  "admin",
  "tic",
  "participacion",
  "comunicacion"
];

module.exports = db;