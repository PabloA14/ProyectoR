import express from "express"
import usuarios from "./routes/ususarios.js"
import programasFormacion from "./routes/programasFormacion.js"
import redes from "./routes/redesConocimiento.js"
import roles from "./routes/rolesUsuario.js"
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
        this.app.use('/api/usuario', usuarios)
        this.app.use('/api/programasFormacion',programasFormacion )
        this.app.use('/api/redes' , redes)
        this.app.use('/api/roles' , roles)

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