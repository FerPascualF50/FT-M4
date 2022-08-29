const express = require('express');
const characterMiddleware = require('./middlewares/character.js');
const abilityMiddleware = require('./middlewares/ability.js');

const server = express();

server.use(express.json());

server.use('/character', characterMiddleware);
server.use('/ability', abilityMiddleware);

// localhost:300/character/

server.get('/', (req, res) => {
  res.send('Henry Sequelize Homework');
});

module.exports = server;