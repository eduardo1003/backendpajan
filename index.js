const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// Sincronización de la base de datos e inicialización de roles
db.sequelize.sync().then(() => {
  console.log('Database connected and synced');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GAD Paján API." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/transparencia.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  const count = await Role.count();
  if (count > 0) return;

  await Promise.all([
    Role.create({ id: 1, name: "user" }),
    Role.create({ id: 2, name: "tic" }),
    Role.create({ id: 3, name: "admin" }),
    Role.create({ id: 4, name: "participacion" }),
    Role.create({ id: 5, name: "comunicacion" }),
    Role.create({ id: 6, name: "transparencia" })
  ]);
  console.log("Roles initialized");
}