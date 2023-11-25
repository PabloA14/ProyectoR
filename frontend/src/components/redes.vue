<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Redes de Conocimiento</div>
            <div class="q-pa-md" style="width: 100%;">

                <div class="spinner-container" v-if="useRed.loading === true">
                    <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
                </div>

                <q-table v-if="useRed.loading === false" class="my-sticky-header-table" :separator="separator" bordered
                    :filter="filter" :rows="redes" :columns="columns" row-key="name" :pagination="pagination">

                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarRed(props.row)" />
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(props.row)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(props.row)" />
                        </q-td>
                    </template>

                    <template v-slot:body-cell-estado="props">
                        <q-td :props="props">
                            <span class="text-green" v-if="props.row.estado == 1">Activo</span>
                            <span class="text-red" v-else>Inactivo</span>
                        </q-td>
                    </template>

                    <template v-slot:top-right>
                        <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:top-left>
                        <q-btn id="colorBtn" icon="add" label="Agregar" class="q-mb-md" @click="
                            agregar = true;
                        nuevo();
                        " />
                    </template>
                </q-table>
            </div>
        </q-page>

        <q-dialog v-model="agregar">
            <q-card class="dialog" id="card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Red" : "Agregar Red" }}
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator :style="{ backgroundColor: colorMenu, color: colorLetra }" inset id="separador" style="
            height: 5px;
            margin-top: 5px;
          " />


                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

                    <div class="q-mb-md">
                        <q-input label="Denominación*" v-model="denominacion" />
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :disabled="loading" v-if="bd == 1"
                        label="Agregar" @click="agregarR()" />
                    <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :disabled="loading" v-else
                        label="Actualizar" @click="actualizar()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRedStore } from "../stores/Redes.js"
import { useQuasar } from 'quasar'
import { useColorStore } from "../stores/colorSetings.js";
let colores = useColorStore();
let colorMenu = ref('')
let colorLetra = ref('')

onMounted(async () => {
    await colores.traerConfiguracion()
    colorMenu.value = colores.configuracion.colorMenu
    colorLetra.value = colores.configuracion.colorLetra
})

let agregar = ref(false)
let denominacion = ref("")
let id = ref("")

const useRed = useRedStore()
let redes = ref([])
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let separator = ref('cell')
let errores = ref([])
let loading = ref(false)

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'denominacion', align: 'center', label: 'Denominación', field: "denominacion", sortable: true },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]



function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    denominacion.value = ""
}


function validar() {
    $q.notify({
        message: errores,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: 3000
    })
}

async function buscar() {
    redes.value = await useRed.buscarRedes();
    console.log(redes.value);
    redes.value.reverse()
}

buscar()

async function agregarR() {
    loading.value = true
    console.log("entro a agregar");
    await useRed.agregarRedes({
        denominacion: denominacion.value
    }).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Red de conocimiento agregada exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: 3000
        })
        buscar();
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: 3000
            })
        } else if (error.response && error.response.data) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}

function editarRed(red) {
    console.log("Entró a editar", red);
    bd.value = 0;
    id.value = red._id;
    denominacion.value = red.denominacion
    agregar.value = true;
}

async function actualizar() {
    loading.value = true
    await useRed.actualizarRedes(
        id.value,
        denominacion.value
    ).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Red de conocimiento editada exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: 3000
        })
        buscar();
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: 3000
            })
        } else if (error.response && error.response.data) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}

async function editarEstado(red) {
    console.log("entre a editar estado", red.estado);
    try {
        if (red.estado === 1) {
            red.estado = 0
        } else {
            red.estado = 1
        }
        const res = await useRed.cambiarEstado(red._id, red.estado)
        $q.notify({
            message: 'Estado editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: 3000
        })
        buscar()

    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
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
}

#colorBtn {
    background-color: v-bind('colorMenu');
    color: v-bind('colorLetra');
}

#separador {
    color: v-bind('colorMenu');
}
</style>