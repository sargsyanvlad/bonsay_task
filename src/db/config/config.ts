const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "112358s",
  database: process.env.DB_NAME,
  dialect: "postgres",
  logging: true,
};
