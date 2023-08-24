import express from "express"
import pruebas from "./routes/prueba.js"
import instructores from "./routes/instructores.js"
import mongoose from "mongoose"
import cors from "cors"


class Server {
    
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conecarBaseDatos()
    }

    routes() {
        this.app.use('/api/prueba', pruebas)
        this.app.use('/api/instructor', instructores)

    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    conecarBaseDatos() {
        mongoose.connect(process.env.MONGODB)
            .then(() => console.log('Connected on line!'));
    }

    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }

}
export default Server