const express = require('express');

const routes = express();

routes.get('/', (require, response) => {
    return response.json('olá');
});

module.exports = routes;