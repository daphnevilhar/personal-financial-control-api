const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});
