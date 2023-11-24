<template>
    <q-page class="q-pa-md">

        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
            <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
            <q-breadcrumbs-el label="Registro Calificado" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md">Registro Calificado</div><br>

        <div class="spinner-container" v-if="useRegistro.loading === true">
            <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
        </div>

        <div class="row" style="display: grid; place-items: center;" v-if="useRegistro.loading === false">
            <q-card class="my-card q-mt-xl" flat bordered v-if="mostrarRegistro">
                <div class="text-h5 q-mt-sm q-mb-md" style="text-align: center">
                    <b style="text-transform: capitalize;">{{ programaSeleccionado.denominacionPrograma }}</b>
                </div>

                <q-separator inset style="height: 5px; margin-top: 5px"
                    :style="{ backgroundColor: colorMenu, color: colorLetra }" />

                <q-card-section horizontal>
                    <q-card-section class="q-pt-xs" id="section">
                        <div class="row">
                            <div class="col-6">

                                <div class="text-h6 q-mt-sm q-mb-xs">Título que otorga:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.titulo }}
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Lugar de desarrollo de la oferta:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.lugardesarrollo }}
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Metodología:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.metodologia }}
                                </div>

                            </div>

                            <div class="col-6">
                                <div class="text-h6 q-mt-sm q-mb-xs">Numero de créditos:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.creditos }}
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Código SNIES:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.codigosnies }}
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Fecha de Otorgamiento:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.fechaOtorgamiento }}
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Fecha de Vencimiento:</div>
                                <div class="text-caption text" style="margin-top: -5%">
                                    {{ mostrarRegistro.fechaVencimiento }}
                                </div>
                            </div>
                        </div>

                    </q-card-section>

                </q-card-section>

                <q-separator />

                <q-card-actions align="center">
                    <q-btn v-if="rol === 'gestor'" style="margin: auto;margin-right: -20%;"
                        :style="{ backgroundColor: colorMenu, color: colorLetra }" icon="edit" label="Editar"
                        class="q-mb-md" @click="editarRegistro(mostrarRegistro)" />

                    <a style="margin: auto;" :href="mostrarRegistro.documento" target="_blank">
                        <q-btn color="primary" icon="download" label="Descargar" />
                    </a>

                </q-card-actions>
            </q-card>

            <div style="display: flex;justify-content: center;align-items: center;" v-else-if="rol === 'gestor'">
                <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" icon="add"
                    label="Agregar Registro Calificado" class="q-mb-md" @click="
                        agregar = true; nuevo();" />
            </div>
        </div>
        <b v-if="!mostrarRegistro && rol === 'instructor'">Aún no se ha agregado el Registro Calificado</b>

        <q-dialog v-model="agregar">
            <q-card class="modal" id="card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Registro Calificado" : "Agregar Registro Calificado" }}
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="height: 5px; margin-top: 5px"
                    :style="{ backgroundColor: colorMenu, color: colorLetra }" />

                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

                    <div class="q-mb-md">
                        <q-input label="Título que otorga el programa*" v-model="titulo" />
                    </div>


                    <div class="q-mb-md">
                        <q-input label="Lugar De Desarrollo*" v-model="lugardesarrollo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Metodología*" v-model="metodologia" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Creditos*" type="number" v-model="creditos" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Código SNIES*" type="Number" v-model="codigosnies" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Fecha de Otorgamiento*" type="Date" v-model="fechaOtorgamiento" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Fecha de Vencimiento*" type="Date" v-model="fechaVencimiento" />
                    </div>

                    <div class="q-mb-md">
                        <q-file v-model="archivo" @update:archivo-value="val => { archivo = val[0] }" label="Archivo*">
                            <template v-slot:prepend>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :disabled="loading" v-if="bd == 1" label="Agregar" @click="agregarN()"
                        :style="{ backgroundColor: colorMenu, color: colorLetra }" />
                    <q-btn :disabled="loading" v-else label="Actualizar" @click="actualizar()"
                        :style="{ backgroundColor: colorMenu, color: colorLetra }" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>
    
<script setup>

import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { UsesRegistroCalificado } from "../stores/registroCalificado.js"
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useUsuarioStore } from "../stores/Usuarios.js";
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
const rol = useUsuario.rol;
const usePrograma = useProgramasFormacionStore();
const useRegistro = UsesRegistroCalificado()
let programaSeleccionado = usePrograma.programa
let idPrograma = programaSeleccionado._id
let registroCalificado = ref([])
let bd = ref('')
const $q = useQuasar()
let agregar = ref(false)
let errores = ref([])
let loading = ref(false)
const renderTrigger = ref(0);
let titulo = ref("")
let metodologia = ref("")
let lugardesarrollo = ref("")
let creditos = ref("")
let codigosnies = ref("")
let fechaOtorgamiento = ref("")
let fechaVencimiento = ref("")
let archivo = ref("")
let id = ref("")

let mostrarRegistro = ref('')
let infoReg = ref('')

buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    titulo.value = ""
    metodologia.value = ""
    lugardesarrollo.value = ""
    creditos.value = ""
    codigosnies.value = ""
    fechaOtorgamiento.value = ""
    fechaVencimiento.value = ""
    archivo.value = ""
}

async function buscar() {
    registroCalificado.value = await useRegistro.buscarRegistros();
    registroCalificado.value.reverse()
    infoReg.value = registroCalificado.value

    for (let i = 0; i < infoReg.value.length; i++) {
        let a = infoReg.value[i]

        if (a.programa._id === idPrograma) {
            mostrarRegistro.value = a
        }
    }
}

async function buscarRegistroCodigo() {
    console.log(codigosnies.value);
    const res = await useRegistro.buscarRegistrosCodigo(codigosnies.value)
    mostrarRegistro.value = res
    console.log(mostrarRegistro.value);
}

function validarVacios() {
    if (titulo.value === "" && metodologia.value === "" && lugardesarrollo.value == "" && creditos.value == "" && codigosnies.value == ""
        && fechaOtorgamiento.value === "" && fechaVencimiento.value === "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: Math.random() * 3000
        })
    } else return true
}

function validar() {
    $q.notify({
        message: errores,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
    })
}

async function agregarN() {
    console.log("entro a agregar");
    loading.value = true
    await useRegistro.agregarRegistroC({
        titulo: titulo.value,
        lugardesarrollo: lugardesarrollo.value,
        metodologia: metodologia.value,
        creditos: creditos.value,
        codigosnies: codigosnies.value,
        fechaOtorgamiento: fechaOtorgamiento.value,
        fechaVencimiento: fechaVencimiento.value,
        documento: archivo.value,
        programa: idPrograma
    }).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Registro Calificado agregado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        buscar();
        buscarRegistroCodigo()
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })

        } else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}

function editarRegistro(mostrarRegistro) {
    console.log("entró a editar", mostrarRegistro)
    bd.value = 0;
    id.value = mostrarRegistro._id
    titulo.value = mostrarRegistro.titulo
    lugardesarrollo.value = mostrarRegistro.lugardesarrollo
    metodologia.value = mostrarRegistro.metodologia
    creditos.value = mostrarRegistro.creditos
    codigosnies.value = mostrarRegistro.codigosnies
    fechaOtorgamiento.value = mostrarRegistro.fechaOtorgamiento
    fechaVencimiento.value = mostrarRegistro.fechaVencimiento
    agregar.value = true
}

async function actualizar() {
    loading.value = true
    await useRegistro.actualizarRegistro(
        id.value,
        titulo.value,
        lugardesarrollo.value,
        metodologia.value,
        creditos.value,
        codigosnies.value,
        fechaOtorgamiento.value,
        fechaVencimiento.value,
        archivo.value
    ).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Registro Calificado editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        buscar();
        renderTrigger.value += 1;

    }).catch((error) => {
        errores.value = ''
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })
        }
        else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}

console.log(programaSeleccionado);

</script>

<style scoped>
.my-card {
    margin-top: -1%;
    color: rgb(0, 0, 0);
    border-radius: 1px;
    width: 55%;
}

.my-card .text-h6 {
    color: rgb(0, 0, 0);
    font-weight: 800;
    margin-bottom: 9%;
    font-size: 3vh;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 10%;

}

.my-card .text-caption {
    font-size: 2.5vh;
    color: rgb(63, 63, 63);
    text-align: center;
}

#section {
    margin: 1.5% 5%;
}

#agregar {
    justify-content: center;
    text-align: center;
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

#card {
    width: 32%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #card {
        width: 100%;
    }

    .my-card {
        width: 100%;
    }

}
</style>