const db = require('../db/connection');
const format = require('pg-format');

function allUsersData() {
    return db
    .query(`SELECT * FROM users`)
    .then(({rows}) => {
        return rows;
    })

}

function userData(userId) {
    const userDataQueryStr = format(
        `SELECT * FROM users WHERE user_id = %L`, [userId]
    );

    return db
    .query(userDataQueryStr)
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({status: 400, msg: "Not Found"});
        return rows[0];
    })
}

module.exports = {allUsersData,
    userData}