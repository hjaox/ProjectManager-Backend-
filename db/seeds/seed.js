const format = require('pg-format');
const db = require('../connection');

function seed() {
    return db
    .query(`DROP TABLE IF EXISTS users`)
    .then(() => {
        return db.query(`
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL
        );`
        );
    })
}

seed();