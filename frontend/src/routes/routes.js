import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Opciones from "../components/Opciones.vue"
import InicioAdmin from "../components/InicioAdmin.vue"
import instructores from "../components/instructores.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            { path: "/inicioAdmin", component: InicioAdmin },
            { path: "/opciones", component: Opciones },
            { path: "/Instructores", component: instructores },
        ]
    },
]


