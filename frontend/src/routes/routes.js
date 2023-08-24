// import Login from "../components/Login.vue"
// import Header from "../components/Header.vue"
// import Opciones from "../components/Opciones.vue"
// import instructores from "../components/instructores.vue"

// export const routes = [
//     { path: "/", component: Login },
//     {
//         path: "/header", component: Header, children: [
//             { path : "/opciones" ,  component : Opciones},
//             { path : "/Instructores" , component : instructores},


//         ]
//     },
// ]

import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Opciones from "../components/Opciones.vue"
import instructores from "../components/Usuarios.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header",
        component: Header,
        redirect: "/header/opciones", // Redirige "/header" a "/header/opciones"
        children: [
            { path : "opciones" ,  component : Opciones },
            { path : "instructores" , component : instructores },
        ]
    },
]
