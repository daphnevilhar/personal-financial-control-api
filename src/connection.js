const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '8810ae',
    database: 'dindin'
});

module.exports = pool;