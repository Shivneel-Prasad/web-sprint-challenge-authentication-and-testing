const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');
const userRouter = require('./users/users-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'))

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to the Sprint Challenge',
        time: new Date().toLocaleTimeString(),
    })
}) 

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
})

module.exports = server;
