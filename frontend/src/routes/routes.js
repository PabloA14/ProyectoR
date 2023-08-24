import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import InicioAdmin from "../components/InicioAdmin.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            { path: "/inicioAdmin", component: InicioAdmin },
        ]
    },
]