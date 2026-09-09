const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

// Imports
const db = require('./config/database')
const User = require('./models/user')
const Rock = require("./models/rock")

class Server {
    constructor() {
        this.app =  express();
        this.port = process.env.PORT || 8080;
        this.server = require("http").createServer(this.app);

        // Paths
        this.paths = {
            // A integración en la siguiente clase
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
        await User.sync({ force: false })
        await Rock.sync({ force: false })
    }

    middlewares() {
        // Logger
        this.app.use(morgan('dev'))

        // CORS
        this.app.use(cors())
    }

    routes() {
        this.app.use(this.paths.user, require('./routes/user.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en la url: http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;