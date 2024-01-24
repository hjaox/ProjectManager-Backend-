const { allUsersData } = require('../models/users.model');

function getAllUsersData(request, response, next) {
    return allUsersData()
    .then((usersData) => {
        response.status(200).send(usersData);
    });
};

module.exports = { getAllUsersData };