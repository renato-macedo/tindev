const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://renato:123@cluster0-ubjaz.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

const port = process.env.PORT || 3333;
server.listen(port, () => console.log('servidor conectado'));
