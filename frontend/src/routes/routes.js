import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Opciones from "../components/Opciones.vue"
import Usuarios from "../components/Usuarios.vue"
import instructorInvitado from "../components/Instructorinv.vue"
import Programas from "../components/ProgramasFormacion.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            { path: "/opciones", component: Opciones },
            { path: "/usuarios", component: Usuarios },
            { path: "/Instructores", component: instructorInvitado },
            { path: "/programas", component: Programas }
        ]
    },
]


