<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md  q-pa-md">
            {{ nombre }}
        </div>

        <div class="MatrizCorrelacion">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Diseño Curricular

                </q-toolbar-title>

                <q-btn flat round dense class="ir">
                    <router-link to="">
                        <span class="material-symbols-outlined" id="ir">download</span>
                    </router-link>
                </q-btn>
            </div>
            <small>Descargar diseño curricular</small>
        </div>


        <div class="MatrizCorrelacion">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Desarrollo Curricular
                </q-toolbar-title>

                <q-btn flat round dense class="ir">
                    <router-link to="cards">
                        <span class="material-symbols-outlined" id="ir">bubble</span>
                    </router-link>
                </q-btn>
            </div>
            <small>Ver información del desarrollo Curricular</small>
        </div>

    </q-page>
</template>
  
  
<script setup>
import { useUserStore } from "../almacenaje/informacion.js"
import { ref, watch } from 'vue'
let nombre = ref('')

const dataProgram = useUserStore()

info()

function info() {
    watch(dataProgram.informacionPrograma, (newValue) => {
        if (newValue && newValue[0]) {
            console.log(newValue[0]);
            nombre.value = newValue[0].denominacionPrograma
        } else {
            console.log('No hay información disponible aún.');
        }
    });
}

</script>
  
<style scoped>
.MatrizCorrelacion {
    padding: 2vh;
    margin: 2vh;
}

#cardP {
    margin: 1%;
    background-color: #38a90063;
    text-align: center;
}

#cardP:hover {
    background-color: #38a90094;
    cursor: pointer;
}

#img {
    width: 100%;
    height: 100%;
}


#ir {
    font-weight: 800;
    font-size: 6vh;
    color: black;
}

.title {
    border-bottom: solid 2px rgba(128, 128, 128, 0.174);
    font-weight: 800;
}

#ir {
    border: solid;
    padding: 2vh;
    border-radius: 5px;
    width: 8vh;
    height: 6vh;
    background-color: #39a900;
    color: white;
    font-size: 3.8vh;
}
</style>