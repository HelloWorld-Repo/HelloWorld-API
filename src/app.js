const express = require('express');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    this.express.get("/", (req, res) => {
      res.send("Hi Docker!!!");
    });
    
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;
