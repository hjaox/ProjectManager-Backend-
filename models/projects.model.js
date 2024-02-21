const db = require('../db/connection');
const format = require('pg-format');

function selectProjectsByUserID(userID) {
    console.log('test')
    const queryStr = format(`SELECT * FROM projects WHERE for_owner_id = %L`, [userID]);

    return db.query(queryStr)
    .then(({rows}) => {
        return rows
    })
}

module.exports = { selectProjectsByUserID }