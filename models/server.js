const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();

    //Sockets
    this.sockets();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    //los middlewares son funciones que se ejecutan antes de llamar al controlador o seguir con la ejecucion de la app
    //CORS
    this.app.use(cors());

    //setear directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
