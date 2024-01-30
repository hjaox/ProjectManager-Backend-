const format = require('pg-format');
const db = require('../connection');

function seed({usersData}) {
    return db
    .query(`DROP TABLE IF EXISTS projects`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`);
    })    
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
    .then(() => {
        const insertUsersQueryStr = format(
            `INSERT INTO users(name, username, email) VALUES %L;`,
            usersData.map(({name, username, email}) => [name, username, email])
        );

        return db.query(insertUsersQueryStr);
    })
    .then(() => {
        return createTableProjects();
    })
}

//projects under a certain user
function createTableProjects() {
    return db
    .query(`CREATE TABLE projects(
        project_id SERIAL PRIMARY KEY,
        project_name VARCHAR NOT NULL,
        owner VARCHAR NOT NULL REFERENCES users(username)
        );`
    )
}

module.exports = seed;