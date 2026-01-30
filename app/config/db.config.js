require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD || ""; // Asegura que sea string aunque esté vacío
const DB = process.env.DATABASE;

if (!HOST || !USER || !DB) {
  console.error("CRÍTICO: Faltan variables de entorno para la base de datos (HOST, USER o DATABASE)");
}

module.exports = {
  HOST: HOST,
  USER: USER,
  PASSWORD: String(PASSWORD), // Forzar a string
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