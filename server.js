const express = require('express');

const server = express();
const usersRouter = require('./usersRouter.js');
const postsRouter = require('./postsRouter.js');
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
