<template>
  <q-layout>
    <q-header :style="{ backgroundColor: colorMenu, color: colorLetra }" elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-avatar style="margin-left: 10px;">
          <img src="../imagenes/Logo-sena-blanco-sin-fondo.png" />
        </q-avatar>

        <q-toolbar-title id="titulo">
          Repositorio
        </q-toolbar-title>
        <div style="padding: 10px;text-transform: capitalize;">
          {{ rol }}

          <q-avatar style="cursor: pointer;">
            <img v-if="datos.foto === ''" src="../imagenes/usuario.png" alt="imagenes">
            <img v-else :src="datos.foto" />
            <q-menu>
              <q-list style="min-width: 100px">

                <q-item to="perfil" style="color: black;" clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>
                      <q-icon name="account_circle" size="20px" />
                      <span style="margin-left: 10px;">Perfil</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section @click="cerrarSesion()">
                    <q-item-label>
                      <q-icon name="logout" size="20px" />
                      <span style="margin-left: 10px;">Cerrar Sesión</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-avatar>


        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center" style="max-width: 370px;">
          <div class="row">
            <div class="col-5">
              <i class="fa-solid fa-circle-exclamation" id="interrogacion"></i>
            </div>
            <div class="col-7 " style="margin-top: 15px; font-size: 15px;">
              <span class="q-ml-sm " id="t">¿Está seguro de que desea cerrar sesión?</span>
            </div>
          </div>

        </q-card-section>
        <q-card-actions class="flex-center" align="right">
          <q-btn label="Cancelar" color="negative" @click="confirm = false" />
          <q-btn label="Cerrar Sesión" :style="{ backgroundColor: colorMenu, color: colorLetra }" @click="logout()" />
        </q-card-actions><br />
      </q-card>
    </q-dialog>

    <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true"
      :width="300" :breakpoint="500" bordered mini-to-overlay :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <router-link v-if="rol === 'gestor' || rol === 'instructor'" to="programas"
            style="text-decoration: none; color: black">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-book-open-cover" />
              </q-item-section>

              <q-item-section> Programas de Formación </q-item-section>
            </q-item>
          </router-link>

          <router-link to="redes" v-if="rol === 'administrador'" style="text-decoration: none; color: black">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-head-side-brain" />
              </q-item-section>

              <q-item-section> Redes de Conocimiento </q-item-section>
            </q-item>
          </router-link>

          <router-link to="niveles" style="color: black; text-decoration: none" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-chart-pyramid" />
              </q-item-section>

              <q-item-section> Niveles de Formación </q-item-section>
            </q-item>
          </router-link>

          <router-link to="centroF" style="text-decoration: none; color: black" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fa-solid fa-building-columns" />
              </q-item-section>

              <q-item-section> Centros de Formación </q-item-section>
            </q-item>
          </router-link>

          <router-link to="ambientes" style="text-decoration: none; color: black" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-chart-user" />
              </q-item-section>

              <q-item-section> Ambientes de Formación </q-item-section>
            </q-item>
          </router-link>

          <router-link to="materiales" style="text-decoration: none; color: black" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-pencil-paintbrush" />
              </q-item-section>

              <q-item-section> Materiales de Formación </q-item-section>
            </q-item>
          </router-link>

          <router-link to="usuarios" style="text-decoration: none; color: black" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fa-solid fa-users" />
              </q-item-section>

              <q-item-section> Usuarios </q-item-section>
            </q-item>
          </router-link>

          <router-link to="roles" style="color: black; text-decoration: none" v-if="rol === 'administrador'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fi fi-sr-key" />
              </q-item-section>

              <q-item-section> Roles de Usuario </q-item-section>
            </q-item>
          </router-link>

          <q-separator />

          <router-link to="perfil" style="color: black; text-decoration: none">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fa-solid fa-user" />
              </q-item-section>

              <q-item-section>Perfil</q-item-section>
            </q-item>
          </router-link>

          <router-link v-if="rol === 'administrador'" to="colorSettings" style="color: black; text-decoration: none">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fa-solid fa-gear" />
              </q-item-section>

              <q-item-section>Configuración</q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template> 

<script setup>
import { useUsuarioStore } from "../stores/Usuarios.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let colorMenu = ref('')
let colorLetra = ref('')

onMounted(async () => {
  await colores.traerConfiguracion()
  colorMenu.value = colores.configuracion.colorMenu
  colorLetra.value = colores.configuracion.colorLetra
})

const drawer = ref(false);
const miniState = ref(true);
const confirm = ref(false);
const router = useRouter();
let datos = ref({})

const useUsuario = useUsuarioStore();
datos.value = useUsuario.usuario
const rol = useUsuario.rol;

// Función para cerrar sesión (combina abrir diálogo y realizar cierre)
const cerrarSesion = () => {
  confirm.value = true; // Mostrar el diálogo de confirmación
};

function logout() {
  confirm.value = false; // Cerrar el diálogo
  useUsuario.usuario = {}
  useUsuario.token = ""
  router.push("/");
}

</script>

<style scoped>
#interrogacion {
  color: rgb(227, 2, 2);
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#t {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
