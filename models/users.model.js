const db = require('../db/connection');

function allUsersData() {
    return db
    .query(`SELECT * FROM users`)
    .then(({rows}) => {
        console.log(rows)
        return rows;
    })

}

module.exports = {allUsersData}