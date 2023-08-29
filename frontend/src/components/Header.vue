<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="text-white" style="background-color: rgb(57, 169, 0);">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="../imagenes/Logo-sena-blanco-sin-fondo.png">
                    </q-avatar>
                    Repositorio
                </q-toolbar-title>
                <q-icon name="logout" size="30px" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false"
            @mouseout="miniState = true" :width="300" :breakpoint="500" bordered mini-to-overlay
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <q-list padding>
                    <router-link to="programas">
                        <q-item clickable v-ripple >

                            <q-item-section avatar>
                                <q-icon class="fa-solid fa-book-open"  color="secondary"/>
                            </q-item-section>

                            <q-item-section>
                                Programas de formación
                            </q-item-section>
                        </q-item>
                    </router-link>

                    <router-link to="Instructores">
                        <q-item clickable v-ripple>

                            <q-item-section avatar>
                                <q-icon class="fa-solid fa-chalkboard-user"  color="secondary"/>
                            </q-item-section>

                            <q-item-section style="color: black; text-decoration: none;">
                                Instructores
                            </q-item-section>
                        </q-item>
                    </router-link>

                    <q-separator />

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="drafts" />
                        </q-item-section>

                        <q-item-section>
                            Drafts
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {

        return {
            drawer: ref(false),
            miniState: ref(true),
        }
    }
}
</script>