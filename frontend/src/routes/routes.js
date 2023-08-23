import Login from "../components/Login.vue"
import Header from "../components/Header.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header, children: [
            //{ path: "/homeAdmin", component: HomeAdmin },
        ]
    },
]