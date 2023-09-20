const express = require('express');
const registerUser = require('./controllers/users/register');
const login = require('./controllers/users/login');
const verifyAuthentication = require('./middleware/authentication');
const detailUser = require('./controllers/users/detail');
const updateUser = require('./controllers/users/update');
const listCategories = require('./controllers/categories/list');
const listTransactions = require('./controllers/transactions/list');
const detailTransaction = require('./controllers/transactions/detail');
const registerTransaction = require('./controllers/transactions/register');
const editTransaction = require('./controllers/transactions/edit');
const deleteTransaction = require('./controllers/transactions/delete');
const extract = require('./controllers/transactions/extract');

const routes = express();

routes.post('/user', registerUser);
routes.post('/login', login);

routes.use(verifyAuthentication);

routes.get('/user', detailUser);
routes.put('/user', updateUser);

routes.get('/categorie', listCategories);
routes.get('/transaction', listTransactions);

routes.get('/transaction/extract', extract)

routes.get('/transaction/:id', detailTransaction);
routes.post('/transaction', registerTransaction);
routes.put('/transaction/:id', editTransaction);
routes.delete('/transaction/:id', deleteTransaction);

module.exports = routes;