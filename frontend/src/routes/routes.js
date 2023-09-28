import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Home from "../components/Home.vue"
import Usuarios from "../components/Usuarios.vue"
import Programas from "../components/ProgramasFormacion.vue"
import Redes from "../components/Redes.vue"
import Centros from "../components/Centros.vue"
import Niveles from "../components/Niveles.vue"
import Roles from "../components/Roles.vue"
import Materiales from "../components/Materiales.vue"
import Ambientes from "../components/Ambientes.vue"
import Configuracion from "../components/Configuracion.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            { path: "/home", component: Home },
            { path: "/usuarios", component: Usuarios },
            { path: "/programas", component: Programas },
            { path: "/redes", component: Redes },
            { path: "/centroF", component: Centros },
            { path: "/niveles", component: Niveles },
            { path: "/roles", component: Roles },
            { path: "/materiales", component: Materiales },
            { path: "/ambientes", component: Ambientes },
            { path: "/configuracion", component: Configuracion },
        ]
    },
]


