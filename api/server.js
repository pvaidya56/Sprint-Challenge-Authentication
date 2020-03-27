const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

function checkRole(role) {
    return (req, res, next) => {
      if (
        req.decodedToken &&
        req.decodedToken.role &&
        req.decodedToken.role.toLowerCase() === role
      ) {
        next();
      } else {
        res.status(403).json({ message: "Role not authenticated" });
      }
    };
  }

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
   res.status(200).json({ statusReport: "its working!"});
});

module.exports = server;
