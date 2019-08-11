const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/config.json');
const cors = require('cors');
const routes = require('./routes');

const httpServer = express();
const server = require('http').Server(httpServer);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    console.log(user, socket.id);
    connectedUsers[user] = socket.id;
});

mongoose.connect(`${ process.env.MONGO_CONNECTION || config.MONGO_CONNECTION }`, {
    useNewUrlParser: true
});


httpServer.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

const port = process.env.PORT || config.PORT;
server.listen(port, () => console.log(`Server running on port ${port}`));
