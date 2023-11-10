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
import Cards from "../components/Cards.vue"
import DesarrolloCurricular from "../components/DesarrolloCurricular.vue"
import GuiasAprendizaje from "../components/GuiasAprendizaje.vue"
import InfoGuia from "../components/InfoGuia.vue"
import Ambientes2 from "../components/Ambientes2.vue"
import Materiales2 from "../components/Materiales2.vue"
//import Retroalimetacion from "../components/retroalimetacion.vue"
import instructores from "../components/instructores.vue"
import proyecto from "../components/proyecto.vue"
import registroCalificado from "../components/registroCalificado.vue"
import InformacionPrograma from "../components/InformacionPrograma.vue"


import { useUsuarioStore } from "../stores/Usuarios.js"
import { useUserStore } from "../almacenaje/informacion.js"


import { createRouter, createWebHashHistory } from 'vue-router';


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
    } else {
        return next({ name: 'login' })
    }
}

export const routes = [
    { path: "/", component: Login, name: "login" },
    {
        path: "/header", component: Header, children: [
            { path: "/home", component: Home, name: "home", beforeEnter: prueba2, meta: { rol: ['administrador', 'gestor', 'instructor'] } },
            { path: "/InformacionPrograma", component: InformacionPrograma, name: "InformacionPrograma", beforeEnter: prueba2, meta: { rol: ['gestor','instructor'] } },
            
            //cards 
            { path: "/cards", component: Cards, name: "cards", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/desarrolloCurricular", component: DesarrolloCurricular, name: "DesarrolloCurricular", beforeEnter: prueba2, meta: { rol: ['gestor','instructor'] } },
            { path: "/guiasAprendizaje", component: GuiasAprendizaje, name: "guiasAprendizaje", beforeEnter: prueba2, meta: { rol: ['gestor','instructor'] } },
            { path: "/infoGuia", component: InfoGuia, name: "infoGuia", beforeEnter: prueba2, meta: { rol: ['gestor','instructor'] } },
            { path: "/ambientesPrograma", component: Ambientes2, name: "ambientesPrograma", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/materialesPrograma", component: Materiales2, name: "materialesPrograma", beforeEnter: prueba2, meta: { rol: ['gestor' , 'instructor'] } },
            //{ path: "/retroalimentacion", component: Retroalimetacion, name: "retroalimetacion", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/instructores", component: instructores, name: "instructores", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/investigacion", component: Investigacion, name: "investigaciones", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/proyecto", component: proyecto, name: "proyecto", beforeEnter: prueba2, meta: { rol: ['gestor','instructor'] } },
            { path: "/registroCalificado", component: registroCalificado, name: "registroCalificado", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },

            //no cards
            { path: "/usuarios", component: Usuarios, name: "usuarios", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/programas", component: Programas, name: "programas", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/redes", component: Redes, name: "redes", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/centroF", component: Centros, name: "centrosF", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/niveles", component: Niveles, name: "niveles", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/roles", component: Roles, name: "roles", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/materiales", component: Materiales, name: "materiales", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/ambientes", component: Ambientes, name: "ambientes", beforeEnter: prueba2, meta: { rol: ['administrador'] } },
            { path: "/configuracion", component: Configuracion, name: "configuracion", beforeEnter: prueba2, meta: { rol: ['administrador', 'gestor', 'instructor'] } },
            { path: "/investigacion", component: Investigacion, name: "investigacion", beforeEnter: prueba2, meta: { rol: ['gestor', 'instructor']  } },

        ],
        beforeEnter: (to, from, next) => {
            const useUsuario = useUserStore()
            const token = sessionStorage.getItem('token')
            if (!token && to.path !== '/') {
                next('/');
            } else {
                useUsuario.informacionToken = token
                next();
            }
        }
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
});