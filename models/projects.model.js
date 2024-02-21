const db = require('../db/connection');
const format = require('pg-format');

function selectProjectsByUserID(userID) {
    const queryStr = format(`SELECT * FROM projects WHERE user_id = %L`, [userID]);

    return db.query(queryStr)
    ,then(data => {
        console.log(data)
    })
}

module.exports = { selectProjectsByUserID }