<template>
    <q-page class="q-pa-md">
 
        <div class="text-h4 text-center q-mb-md q-mt-md">
            <b  style="text-transform:capitalize;">{{nombre}}</b>
            </div>

        <div class="bloques">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Diseño Curricular
                </q-toolbar-title>

                <q-btn flat round dense class="ir">
                    <span class="material-symbols-outlined" id="ir">more_vert</span>
                    <q-menu max-height="130px">
                        <q-list style="min-width: 100px">
                            <!--                             <q-item clickable @click="agregar = true">
                                <q-item-section>
                                    <span class="material-symbols-outlined" style="" id="opciones">
                                        add
                                    </span>
                                </q-item-section>
                            </q-item> -->
                            <q-item clickable>
                                <q-item-section>
                                    <a :href="programaSeleccionado.disCurricular" style="text-align: center;"
                                        target="_blank">
                                        <span class="material-symbols-outlined" id="opciones">
                                            download
                                        </span>
                                    </a>

                                </q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>
                                    <span class="material-symbols-outlined" style="" id="opciones">
                                        edit
                                    </span>
                                </q-item-section>
                            </q-item>

                            <q-separator />

                        </q-list>
                    </q-menu>
                </q-btn>

                <q-dialog v-model="agregar">
                    <q-card style="width: 40%; height: fit-content">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">
                                Agregar Diseño Curricular
                            </div>
                            <q-space />
                            <q-btn icon="close" color="negative" flat round dense v-close-popup />
                        </q-card-section>

                        <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />

                        <q-card-section style="max-height: 65vh" class="scroll">

                            <div class="q-mb-md">
                                <input type="file" @change="archivo" />
                            </div>

                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn label="Agregar" @click="agregarDis()" color="secondary" />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </div>
            <small>Descargar diseño curricular</small>
        </div>


        <div class="bloques">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Desarrollo Curricular
                </q-toolbar-title>

                <q-btn flat round dense class="ir">
                    <router-link to="desarrolloCurricular">
                        <span class="material-symbols-outlined" id="ir">bubble</span>
                    </router-link>
                </q-btn>
            </div>
            <small>Ver información del Desarrollo Curricular</small>
        </div>

        <div class="bloques">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Gestión del Programa
                </q-toolbar-title>

                <q-btn flat round dense class="ir">
                    <router-link to="cards">
                        <span class="material-symbols-outlined" id="ir">bubble</span>
                    </router-link>
                </q-btn>
            </div>
            <small>Ver la gestión del programa de formación como los intructores, los proyectos, las investigaciones, el
                registro calificado,
                etc.</small>
        </div>

    </q-page>
</template>
  
  
<script setup>
 import { useUsuarioStore } from "../stores/Usuarios.js";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { ref } from 'vue'

const useUsuario = useUsuarioStore();
const rol = useUsuario.rol;

console.log(rol)
const usePrograma = useProgramasFormacionStore();
let nombre = ref(usePrograma.programa.denominacionPrograma)
let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);


let agregar = ref(false)
let dis = ref('')

function archivo(event) {
    dis.value = event.target.files[0]
    console.log(dis.value);
}

async function agregarDis() {
    console.log("entró");
    console.log(dis.value);
    const id = "6532e4ad96ea85c476b11f6d"
    const data = await usePrograma.postDiseno(id, dis.value)
        .then(() => {
            agregar.value = false
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })

}


</script>
  
<style scoped>
.bloques {
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