const express = require('express');
const { registerUser, login } = require('./controllers/users');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);

//routes.get('/', );

module.exports = routes;