import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import Home from "../components/Home.vue"
import Usuarios from "../components/Usuarios.vue"
import Programas from "../components/ProgramasFormacion.vue"
import Redes from "../components/redes.vue"
import Centros from "../components/Centros.vue"
import Niveles from "../components/Niveles.vue"
import Roles from "../components/Roles.vue"
import Materiales from "../components/Materiales.vue"
import Ambientes from "../components/Ambientes.vue"
import Perfil from "../components/Perfil.vue"
import Investigacion from "../components/Investigacion.vue"
import Cards from "../components/Cards.vue"
import DesarrolloCurricular from "../components/DesarrolloCurricular.vue"
import GuiasAprendizaje from "../components/GuiasAprendizaje.vue"
import InfoGuia from "../components/InfoGuia.vue"
import Ambientes2 from "../components/Ambientes2.vue"
import Materiales2 from "../components/Materiales2.vue"
import Retroalimetacion from "../components/retroalimetacion.vue"
import Instructores from "../components/Instructores.vue"
import proyecto from "../components/proyecto.vue"
import Recuperar from "../components/Recuperar.vue"
import registroCalificado from "../components/registroCalificado.vue"
import InformacionPrograma from "../components/InformacionPrograma.vue"
import colorSettings from "../components/colorSettings.vue"


import { useUsuarioStore } from "../stores/Usuarios.js"
import { useUserStore } from "../almacenaje/informacion.js"
import { createRouter, createWebHashHistory } from 'vue-router';
import { Notify } from 'quasar'


const auth = (to, from, next) => {
    if (checkAuth()) {
        const userUsuario = useUsuarioStore()
        const rol = userUsuario.rol
        if (!to.meta.rol.includes(rol)) {
            Notify.create({
                message: 'No tiene autorización para visitar esta página',
                color: 'negative',
                icon: 'warning',
                position: 'top',
                timeout: 3000
            })
            return next({ name: 'login' })

        }
        next()
    } else {
        Notify.create({
            message: 'No tiene autorización para visitar esta página',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
        return next({ name: 'login' })
    }
}

const checkAuth = () => {
    const useUsuario = useUsuarioStore()

    const token = useUsuario.token

    if (useUsuario.logeo == "" || useUsuario.logeo === undefined) {
        return false;
    }
    if (!token) return false
    return true
};

export const routes = [
    { path: "/", component: Login, name: "login" },
    { path: "/nueva/contrasena", component: Recuperar, name: "recuperar" },
    {
        path: "/header", component: Header, children: [
            { path: "/home", component: Home, name: "home", beforeEnter: auth, meta: { rol: ['administrador', 'gestor', 'instructor'] } },
            { path: "/InformacionPrograma", component: InformacionPrograma, name: "InformacionPrograma", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/cards", component: Cards, name: "cards", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/desarrolloCurricular", component: DesarrolloCurricular, name: "DesarrolloCurricular", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/guiasAprendizaje", component: GuiasAprendizaje, name: "guiasAprendizaje", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/infoGuia", component: InfoGuia, name: "infoGuia", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/ambientesPrograma", component: Ambientes2, name: "ambientesPrograma", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/materialesPrograma", component: Materiales2, name: "materialesPrograma", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/retroalimentacion", component: Retroalimetacion, name: "retroalimetacion", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/instructores", component: Instructores, name: "instructores", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/investigacion", component: Investigacion, name: "investigaciones", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/proyecto", component: proyecto, name: "proyecto", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/registroCalificado", component: registroCalificado, name: "registroCalificado", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/usuarios", component: Usuarios, name: "usuarios", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/programas", component: Programas, name: "programas", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/redes", component: Redes, name: "redes", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/centroF", component: Centros, name: "centrosF", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/niveles", component: Niveles, name: "niveles", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/roles", component: Roles, name: "roles", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/materiales", component: Materiales, name: "materiales", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/ambientes", component: Ambientes, name: "ambientes", beforeEnter: auth, meta: { rol: ['administrador'] } },
            { path: "/perfil", component: Perfil, name: "perfil", beforeEnter: auth, meta: { rol: ['administrador', 'gestor', 'instructor'] } },
            { path: "/investigacion", component: Investigacion, name: "investigacion", beforeEnter: auth, meta: { rol: ['gestor', 'instructor'] } },
            { path: "/colorSettings", component: colorSettings, name: "colorSettings", beforeEnter: auth, meta: { rol: ['administrador'] } },
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
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});