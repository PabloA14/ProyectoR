import express from "express"
import instructores from "./routes/instructores.js"
import programasFormacion from "./routes/programasFormacion.js"
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
        this.app.use('/api/instructor', instructores)
        this.app.use('/api/programasFormacion',programasFormacion )
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