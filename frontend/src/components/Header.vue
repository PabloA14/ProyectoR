<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="text-white" style="background-color: rgb(13, 150, 13);">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="drawer = !drawer"  />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://tramiteinformativo.com/wp-content/uploads/2022/08/Logo-sena-blanco-sin-fondo.png">
                    </q-avatar>
                    <!-- Repositorio SENA -->
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false"
            @mouseout="miniState = true" :width="200" :breakpoint="500" bordered
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <q-list padding>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section>
                            Inbox
                        </q-item-section>
                    </q-item>

                    <q-item active clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="star" />
                        </q-item-section>

                        <q-item-section>
                            Star
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            Send
                        </q-item-section>
                    </q-item>

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