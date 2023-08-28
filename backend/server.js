import express from "express"
import usuarios from "./routes/ususarios.js"
import programasFormacion from "./routes/programasFormacion.js"
import redes from "./routes/redesConocimiento.js"
import roles from "./routes/rolesUsuario.js"
import ciudades from "./routes/ciudades.js"
import ambientesFormacion from "./routes/ambientesFormacion.js"
import desarrolloCurricular from "./routes/desarrolloCurricular.js"
import guias from "./routes/guias.js"
import instrumentos from "./routes/instrumentos.js"
import centrosFormacion from "./routes/centrosFormacion.js"
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
        this.app.use('/api/programasFormacion', programasFormacion)
        this.app.use('/api/redes', redes)
        this.app.use('/api/roles', roles)
        this.app.use('/api/ciudades', ciudades)
        this.app.use('/api/ambientes', ambientesFormacion)
        this.app.use('/api/desarrollo', desarrolloCurricular)
        this.app.use("/api/guia", guias)
        this.app.use("/api/instrumentos", instrumentos)
        this.app.use("/api/centrosF", centrosFormacion)


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