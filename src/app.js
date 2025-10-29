const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/', routes);
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

module.exports = app;
