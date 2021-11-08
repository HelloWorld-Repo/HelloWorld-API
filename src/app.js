const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001',
};

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors(corsOptions));
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
