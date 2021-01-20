const { Pool } = require('pg');

const dbName = 'Foodfy db - Launch Base Project';

module.exports = new Pool({
  user: 'postgres',
  password: 'defcon4',
  host: 'localhost',
  port: '5432',
  database: dbName,
});
