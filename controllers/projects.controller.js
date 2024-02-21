const { selectProjectsByUserID } = require('../models/projects.model');

function getProjectsByUserID(request, response, next) {
    const { userID } = response.params;
    return selectProjectsByUserID(userID)
    .then(data => {
        console.log(data)
    })
}

module.exports = { getProjectsByUserID }