const express = require('express');
const registerUser = require('./controllers/users/registerUser');
const login = require('./controllers/users/login');
const verifyAuthentication = require('./middleware/authentication');
const detailUser = require('./controllers/users/detailUser');
const updateUser = require('./controllers/users/updateUser');
const extract = require('./controllers/transactions/extract');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);

routes.use(verifyAuthentication);
routes.get('/user', detailUser);
routes.put('/user', updateUser);

routes.get('/transaction/extract', extract)
routes.get('/transaction',)

module.exports = routes;