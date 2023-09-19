const express = require('express');
const { registerUser, login } = require('./controllers/users');
const verifyAuthentication = require('./middleware/authentication');
const listCategories = require('./controllers/categories/list');
const listTransactions = require('./controllers/transactions/list');
const detailTransaction = require('./controllers/transactions/detail');
const registerTransaction = require('./controllers/transactions/register');
const editTransaction = require('./controllers/transactions/edit');
const deleteTransaction = require('./controllers/transactions/delete');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);
routes.use(verifyAuthentication);
routes.get('/categories', listCategories);
routes.get('/transactions', listTransactions);
routes.get('/transactions/:id', detailTransaction);
routes.post('/transactions', registerTransaction);
routes.put('/transactions/:id', editTransaction);
routes.delete('/transactions/:id', deleteTransaction);

module.exports = routes;