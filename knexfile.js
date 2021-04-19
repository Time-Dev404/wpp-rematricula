const path = require('path');
require('dotenv/config');

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB,
    port: process.env.DB_PORT,
  },
  migrations: {
    tablename: 'knex_migrations',
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  }
};