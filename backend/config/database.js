const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // database name
  process.env.DB_USER,       // username
  process.env.DB_PASSWORD,   // password
  {
    host: process.env.DB_HOST || 'localhost', // host
    port: process.env.DB_PORT || 3306,        // port
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development',
  }
);

module.exports = sequelize;
