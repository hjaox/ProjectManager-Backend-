const format = require('pg-format');
const db = require('../connection');

function seed({usersData}) {
    return db
    .query(`DROP TABLE IF EXISTS users`)
    .then(() => {
        return db.query(`
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL
        );`
        );
    })
    .then(() => {
        const insertUsersQueryStr = format(
            `INSERT INTO users(name, username, email, password) VALUES %L;`,
            usersData.map(({name, username, email, password}) => [name, username, email, password])
        );

        return db.query(insertUsersQueryStr)
    })
}

module.exports = seed;