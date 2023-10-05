<template>
  <q-layout>
    <q-header elevated class="text-white" style="background-color: #39a900">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../imagenes/Logo-sena-blanco-sin-fondo.png" />
          </q-avatar>
          Repositorio
        </q-toolbar-title>
        <q-icon name="logout" title="Cerrar Sesión" size="30px" style="cursor: pointer" @click="cerrarSesion()" />
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">¿Estás seguro de que deseas cerrar la sesión?</span>
        </q-card-section>
        <i class="fa-solid fa-question" id="interrogacion"></i>

        <q-card-actions class="flex-center " align="right">
          <q-btn label="Cancelar" color="negative" @click="confirm = false" />
          <q-btn label="Cerrar Sesión" color="primary" @click="logout()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true"
      :width="300" :breakpoint="500" bordered mini-to-overlay :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <router-link v-if="(rol === 'gestor')" to="programas" style="text-decoration: none; color: black">
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
                <q-icon class="fi fi-sr-clip" />
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

          <router-link to="investigacion" style="color: black; text-decoration: none" v-if="rol === 'gestor'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon />
              </q-item-section>

              <q-item-section>Investigación</q-item-section>
            </q-item>
          </router-link>

          <q-separator />

          <router-link to="configuracion" style="color: black; text-decoration: none">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon class="fa-solid fa-gear" />
              </q-item-section>

              <q-item-section> Configuración </q-item-section>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
const drawer = ref(false);
const miniState = ref(true);
const confirm = ref(false);
const router = useRouter();

import { useUsuarioStore } from "../stores/Usuarios.js"
const useUsuario = useUsuarioStore()
const rol = useUsuario.rol

console.log(rol);

// Función para cerrar sesión (combina abrir diálogo y realizar cierre)
const cerrarSesion = () => {
  confirm.value = true; // Mostrar el diálogo de confirmación
};

function logout() {
  confirm.value = false; // Cerrar el diálogo
  sessionStorage.removeItem("token");
  router.push("/");
}
</script>
  
<style scooped>
#interrogacion {
  color: rgb(0, 132, 255);
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>