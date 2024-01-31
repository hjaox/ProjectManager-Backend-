const format = require('pg-format');
const db = require('../connection');

function seed({usersData, projectsData, columnsData}) {
    return db
    .query(`DROP TABLE IF EXISTS columns`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS projects`)
    })
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
    .then(() => {
        return createColumnsTable();
    })
    .then(() => {
        return insertColumnsData(columnsData);
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
        for_owner_id INT NOT NULL REFERENCES users(user_id)
        );`
    );
}

//create columns table
function createColumnsTable() {
    return db
    .query(`CREATE TABLE columns(
        column_id SERIAL PRIMARY KEY,
        column_name VARCHAR NOT NULL,
        for_project_id INT NOT NULL REFERENCES projects(project_id)
    )`);
}


//insert dev data into users table
function insertUsersData(usersData) {
    const insertUsersQueryStr = format(
        `INSERT INTO users(name, username, email) VALUES %L;`,
        usersData.map(({name, username, email}) => [name, username, email])
    );
    return db.query(insertUsersQueryStr);
}

//insert dev data into projects table
function insertProjectsData(projectsData) {
    const insertProjectsQueryStr = format(
        `INSERT INTO projects(project_name, for_owner_id) VALUES %L`,
        projectsData.map(({projectName, owner}) => [projectName, owner])
    );

    return db.query(insertProjectsQueryStr);
}

//insert dev data into columns table
function insertColumnsData(columnsData) {
    const insertColumnsQueryStr = format(
        `INSERT INTO columns(column_name, for_project_id) VALUES %L`,
        columnsData.map(({columnName, projectId}) => [columnName, projectId])
    );

    return db.query(insertColumnsQueryStr);
}


module.exports = seed;