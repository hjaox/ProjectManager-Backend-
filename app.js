const { getAllUsersData,
getUserData } = require('./controllers/users.controller');
const {serverErrorHandler, customErrorHandler} = require('./error-handlers');
const cors = require("cors");

const express = require('express');

const app = express();

app.use(cors());

app.get(`/api/users`, getAllUsersData)

app.get(`/api/user/:userId`, getUserData)

app.use(customErrorHandler)

app.use(serverErrorHandler)

module.exports = app;