const { getAllUsersData } = require('./controllers/users.controller');

const express = require('express');

const app = express();

app.get(`/api/users`, getAllUsersData)

app.use((err, request, response) => {
    this.response.status(500).send(err)
})

module.exports = app;