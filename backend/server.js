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
import materialesFor from "./routes/materialesFor.js"
import login from "./routes/login.js"
import nivelesFormacion from "./routes/nivelesFormacion.js"
import registroCalificado from "./routes/registroCalificado.js"
import proyectos from "./routes/proyectos.js"
import retroalimentacionRed from "./routes/retroalimentacion.js"
import investigaciones from "./routes/investigaciones.js"
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
        this.app.use("/api/materiales", materialesFor)
        this.app.use("/api/login", login)
        this.app.use("/api/proyecto", proyectos)
        this.app.use("/api/nivelesFormacion", nivelesFormacion)
        this.app.use("/api/registroCalificado", registroCalificado)
        this.app.use("/api/retroalimentacion", retroalimentacionRed)
        this.app.use('/api/investigaciones', investigaciones)
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
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