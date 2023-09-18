const express = require('express');
const { registerUser, login, access } = require('./controllers/users');
const verifyAuthentication = require('./middleware/authentication');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);

routes.use(verifyAuthentication);

module.exports = routes;