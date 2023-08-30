import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Opciones from "../components/Opciones.vue"
import Usuarios from "../components/Usuarios.vue"
import instructorInvitado from "../components/Instructorinv.vue"
import Programas from "../components/ProgramasFormacion.vue"
import redes from "../components/redes.vue"
import centros from "../components/centros.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            { path: "/opciones", component: Opciones },
            { path: "/usuarios", component: Usuarios },
            { path: "/Instructores", component: instructorInvitado },
            { path: "/programas", component: Programas },
            { path: "/redes", component: redes },
            { path: "/centroF", component: centros }


        ]
    },
]


