const { getAllUsersData,
getUserData } = require('./controllers/users.controller');
const {serverErrorHandler} = require('./error-handlers');

const express = require('express');

const app = express();

app.get(`/api/users`, getAllUsersData)

app.get(`/api/user/:userId`, getUserData)

app.use((err, _, response, __) => {
    return response.status(500).send(err)
})

module.exports = app;