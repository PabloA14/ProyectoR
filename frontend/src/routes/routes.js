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
import Investigacion from "../components/Investigacion.vue"

import { useUsuarioStore } from "../stores/Usuarios.js"

const prueba = () => {
    const useUsuario = useUsuarioStore()

    const token = useUsuario.token

    if (useUsuario.logeo == "" || useUsuario.logeo === undefined) {
        return false;
    }
    if (!token) return false
    return true

}

const prueba2 = (to, from, next) => {
    if (prueba()) {
        const userUsuario = useUsuarioStore()
        const rol = userUsuario.rol
        if (!to.meta.rol.includes(rol)) {
            return next({ name: 'login' })
        }
        next()
    }
    else {
        return next({ name: 'login' })
    }
}

export const routes = [
    { path: "/", component: Login, name: "login" },
    {
        path: "/header", component: Header, children: [
            { path: "/home", component: Home, name: "home", beforeEnter: prueba2, meta: { rol: ['administrador', 'gestor', 'instructor'] } },
            { path: "/usuarios", component: Usuarios, name: "usuarios", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/programas", component: Programas, name: "programas", beforeEnter: prueba2, meta: { rol: ['gestor'] } },
            { path: "/redes", component: Redes, name: "redes", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/centroF", component: Centros, name: "centrosF", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/niveles", component: Niveles, name: "niveles", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/roles", component: Roles, name: "roles", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/materiales", component: Materiales, name: "materiales", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/ambientes", component: Ambientes, name: "ambientes", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/configuracion", component: Configuracion, name: "configuracion", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/investigacion", component: Investigacion, name: "investigacion", beforeEnter: prueba2, meta: { rol: ['gestor'] } },
        ]
    },
]