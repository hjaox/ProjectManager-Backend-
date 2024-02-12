const { allUsersData,
    userData } = require('../models/users.model');

function getAllUsersData(_ , response, next) {
    return allUsersData()
    .then((usersData) => {
        response.status(200).send(usersData);
    });
};

function getUserData(request, response, next) {
    const { userId } = request.params;
    return userData(userId)
    .then((userDataResult) => {
        return response.status(200).send({user: userDataResult})
    })
    .catch(next)
}

module.exports = { getAllUsersData,
    getUserData};