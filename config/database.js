const pgp = require('pg-promise')();
const database = 'postgres://College_user:123456@localhost:5432/CollegeProject';
const db = pgp(database);
module.exports = db;
