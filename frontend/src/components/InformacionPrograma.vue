<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el :label="usePrograma.programa.denominacionPrograma" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md q-mt-md">
            <b style="text-transform:capitalize;">{{ nombre }}</b>
        </div>

        <div class="spinner-container" v-if="usePrograma.loading === true">
            <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
        </div>

        <div v-if="usePrograma.loading === false" class="bloques">
            <div class="row" id="row">
                <q-toolbar-title class="title">
                    Diseño Curricular
                </q-toolbar-title>

                <q-btn flat round dense>
                    <span class="material-symbols-outlined" :style="{ backgroundColor: colorMenu, color: colorLetra }"
                        id="ir">more_vert</span>
                    <q-menu max-height="130px">
                        <q-list style="min-width: 100px">

                            <q-item clickable>
                                <q-item-section>
                                    <a :href="disCurri" style="text-align: center;color: black;" target="_blank">
                                        <span class="material-symbols-outlined" id="opciones"
                                            style="font-size: 5.5vh; color: black">
                                            download
                                        </span>
                                    </a>

                                </q-item-section>
                            </q-item>
                            <q-item @click="agregar = true" clickable v-if="useUsuario.rol != 'instructor'">
                                <q-item-section>
                                    <span class="material-symbols-outlined" style="font-size: 4.5vh;" id="opciones">
                                        edit
                                    </span>
                                </q-item-section>
                            </q-item>

                            <q-separator />

                        </q-list>
                    </q-menu>
                </q-btn>

                <q-dialog v-model="agregar">
                    <q-card id="card">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">
                                Editar Diseño Curricular
                            </div>
                            <q-space />
                            <q-btn icon="close" color="negative" flat round dense v-close-popup />
                        </q-card-section>

                        <q-separator inset style="height: 5px;margin-top: 5px;"
                            :style="{ backgroundColor: colorMenu, color: colorLetra }" />

                        <q-card-section style="max-height: 65vh" class="scroll">

                            <div class="q-mb-md">
                                <input type="file" @change="archivo" />
                            </div>

                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn label="Editar" :disabled="loading" @click="agregarDis()"
                                :style="{ backgroundColor: colorMenu, color: colorLetra }" />
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

                <q-btn flat round dense>
                    <router-link to="desarrolloCurricular">
                        <span class="material-symbols-outlined" :style="{ backgroundColor: colorMenu, color: colorLetra }"
                            id="ir">bubble</span>
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

                <q-btn flat round dense>
                    <router-link to="cards">
                        <span class="material-symbols-outlined" :style="{ backgroundColor: colorMenu, color: colorLetra }"
                            id="ir">bubble</span>
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
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
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

const useUsuario = useUsuarioStore();
const usePrograma = useProgramasFormacionStore();
let nombre = ref(usePrograma.programa.denominacionPrograma)
let disCurri = ref(usePrograma.programa.disCurricular)
/* let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado); */

let codigo = ref(usePrograma.programa.codigo);
let agregar = ref(false)
let dis = ref('')
let router = useRouter()
const $q = useQuasar()
let errores = ref([])
let loading = ref(false)
let id = ref(usePrograma.programa._id)

function validar() {
    $q.notify({
        message: errores,
        color: "negative",
        position: "top",
        icon: "warning",
        timeout: 3000,
    });
}

function archivo(event) {
    dis.value = event.target.files[0];
}

function validarHayDiseño() {
    if (!dis.value) {
        $q.notify({
            message: 'Debe adjuntar el archivo',
            color: "negative",
            position: "top",
            icon: "warning",
            timeout: 3000,
        });
    } else return true
}

async function agregarDis() {
    if (validarHayDiseño() === true) {
        loading.value = true
        await usePrograma.putDiseno(id.value, dis.value)
            .then(() => {
                agregar.value = false
                $q.notify({
                    message: "Diseño Curricular editado exitosamente",
                    color: "green",
                    icon: "check",
                    position: "bottom",
                    timeout: 3000,
                });
                informacionPrograma(codigo.value)
                router.push("/InformacionPrograma");
            }).catch((error) => {
                if (error.response && error.response.data) {
                    errores.value = error.response.data.errors[0].msg;
                    validar();
                } else {
                    console.log(error);
                }
            })
        loading.value = false
    }
}

async function informacionPrograma(x) {
    codigo.value = x;
    const a = await usePrograma.informacionPrograma(codigo.value).then(() => {
        disCurri.value = a.data.disCurricular
    }).catch((error) => {
        console.log(error);
    });
}


</script>
  
<style scoped>
.bloques {
    padding: 2vh;
    margin: 2vh;
}


#ir {
    font-weight: 800;
    font-size: 6vh;
    color: black;
    border: solid;
    padding: 2vh;
    border-radius: 5px;
    width: 8vh;
    height: 6vh;
    color: white;
    font-size: 3.8vh;
}

.title {
    border-bottom: solid 2px rgba(128, 128, 128, 0.174);
    font-weight: 800;
}

#card {
    width: 38%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #card {
        width: 100%;
    }
}

.spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
}
</style>