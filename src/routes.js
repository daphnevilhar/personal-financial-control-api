const express = require('express');
const { registerUser, login } = require('./controllers/users');
const verifyAuthentication = require('./middleware/authentication');
const { listCategories, listTransactions, detailTransaction } = require('./controllers/transactions');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);
routes.use(verifyAuthentication);
routes.get('/categories', listCategories);
routes.get('/transactions', listTransactions);
routes.get('/transactions/:id', detailTransaction);


module.exports = routes;