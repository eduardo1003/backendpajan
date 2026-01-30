require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DATABASE;
const URL = process.env.DATABASE_URL; // Render suele dar esta variable

console.log("Iniciando conexión a DB...");
if (URL) {
  console.log("Usando DATABASE_URL para la conexión");
} else {
  console.log("Configuración manual detectada:", {
    host: HOST ? "OK" : "FALTA",
    user: USER ? "OK" : "FALTA",
    db: DB ? "OK" : "FALTA",
    pass: PASSWORD ? "OK" : "FALTA"
  });
}

module.exports = {
  URL: URL,
  HOST: HOST,
  USER: USER,
  PASSWORD: PASSWORD ? String(PASSWORD) : undefined,
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