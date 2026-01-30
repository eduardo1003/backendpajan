require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DATABASE;
const URL = process.env.DATABASE_URL; // Render suele dar esta variable

if (!URL && (!HOST || !USER || !DB)) {
  console.error("CRÍTICO: Faltan variables de entorno para la base de datos.");
  console.log("Configuración detectada:", {
    host: HOST ? "OK" : "FALTA",
    user: USER ? "OK" : "FALTA",
    db: DB ? "OK" : "FALTA",
    pass: PASSWORD ? "OK" : "FALTA",
    url: URL ? "Detectada" : "No detectada"
  });
}

module.exports = {
  URL: URL,
  HOST: HOST,
  USER: USER,
  PASSWORD: PASSWORD ? String(PASSWORD) : "",
  DB: DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true,
    connectTimeout: 120000,
  },
  retry: {
    match: [
      /ECONNRESET/,
      /ETIMEDOUT/,
      /Connection terminated unexpectedly/,
    ],
    max: 5,
  },
  PORT: process.env.PORTP || 5432,
};