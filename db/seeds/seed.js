const format = require('pg-format');
const db = require('../connection');
const { projectsData } = require('./data/development');

function seed({usersData}) {
    return db
    .query(`DROP TABLE IF EXISTS projects`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`);
    })    
    .then(() => {
        return createUsersTable();
    })
    .then(() => {
        return insertUsersData(usersData);
    })
    .then(() => {
        return createProjectsTable();
    })
    .then(() => {
        return insertProjectsData(projectsData);
    })
}


//create users table
function createUsersTable() {
    return db
    .query(`
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL
        );`
    );
}

//create projects table
function createProjectsTable() {
    return db
    .query(`CREATE TABLE projects(
        project_id SERIAL PRIMARY KEY,
        project_name VARCHAR NOT NULL,
        owner INT NOT NULL REFERENCES users(user_id)
        );`
    )
}


//insert dev data into users table
function insertUsersData(usersData) {
    const insertUsersQueryStr = format(
        `INSERT INTO users(name, username, email) VALUES %L;`,
        usersData.map(({name, username, email}) => [name, username, email])
    );
    return db.query(insertUsersQueryStr);
}

//inset dev data into projects table
function insertProjectsData(projectData) {
    const insertProjectsQueryStr = format(
        `INSERT INTO projects(project_name, owner) VALUES %L`,
        projectData.map(({projectName, owner}) => [projectName, owner])
    );

    return db.query(insertProjectsQueryStr);
}

module.exports = seed;