const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

// Imports
const db = require('./config/database')

class Server {
    constructor() {
        this.app =  express();
        this.port = process.env.PORT || 8080;
        this.server = require("http").createServer(this.app);

        // Paths
        this.paths = {
            user: '/api/user'
        }

        // Conexión con la base de datos
        this.connectDB();

        // JSON
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        await db.authenticate().then(() => {
            console.log("Base de datos se ha conectado satisfactoriamente.")
        }).catch((err) => {
            console.error("No se ha podido establecer la conexión con la base de datos.", err)
        })

        // Carga de modelos a la base de datos
    }

    middlewares() {
        // Logger
        this.app.use(morgan('dev'))

        // CORS
        this.app.use(cors())
    }

    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en la url: http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
