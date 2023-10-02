<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Investigación</div>
            <div class="q-pa-md" style="width: 100%;">
                <div class="spinner-container" v-if="useInvestigacion.loading === true">
                    <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
                </div>

                <q-table v-if="useInvestigacion.loading == false" class="my-sticky-header-table" :separator="separator"
                    bordered :filter="filter" :rows="investigaciones" :columns="columns" row-key="name"
                    :pagination="pagination">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarInves(props.row)" />
                            <!--  <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(props.row)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(props.row)" /> -->
                        </q-td>
                    </template>

                    <!-- <template v-slot:body-cell-estado="props">
                        <q-td :props="props">
                            <span class="text-green" v-if="props.row.estado == 1">Activo</span>
                            <span class="text-red" v-else>Inactivo</span>
                        </q-td>
                    </template> -->

                    <template v-slot:top-right>
                        <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:top-left>
                        <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="
                            agregar = true;
                        nuevo();
                        " />
                    </template>
                </q-table>
            </div>
        </q-page>

        <q-dialog v-model="agregar">
            <q-card style="width: 32%; height: fit-content">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Investigación" : "Agregar Investigación" }}
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
                        <q-input label="Código*" type="number" color="secondary" v-model="codigo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Nombre*" color="secondary" v-model="nombre" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Descripcion*" color="secondary" v-model="descripcion" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Año*" type="number" color="secondary" v-model="fecha" />
                    </div>

                    <div class="q-mb-md">
                        <q-file label="Archivo*" type="file" color="secondary" v-model="archivo">
                            <template v-slot:prepend>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-if="bd == 1" label="Agregar" @click="agregarN()" color="secondary" />
                    <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useInveStore } from "../stores/Investigaciones.js"
import { useQuasar } from 'quasar'

let agregar = ref(false)
let codigo = ref("")
let nombre = ref("")
let descripcion = ref("")
let fecha = ref("")
let archivo = ref("")
let id = ref("")

const useInvestigacion = useInveStore()
let investigaciones = ref([])
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let separator = ref('cell')
let errores = ref([])

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'denominacion', align: 'center', label: 'Nombre', field: "denominacion", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', field: "descripcion", sortable: false },
    { name: 'fecha', align: 'center', label: 'Año', field: "fecha", sortable: true },
    //{ name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    codigo.value = ""
    nombre.value = ""
    descripcion.value = ""
    fecha.value = ""
}

function validarVacios() {
    if (codigo.value === "" && nombre.value === "" && descripcion.value == "" && fecha.value == "" && archivo.value == "") {
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

async function buscar() {
    investigaciones.value = await useInvestigacion.buscarInvestigacion();
    console.log(investigaciones.value);
    investigaciones.value.reverse()
}

async function agregarN() {
    console.log("entro a agregar");
    await useInvestigacion.agregarInves({
        codigo: codigo.value,
        denominacion: nombre.value,
        descripcion: descripcion.value,
        fecha: fecha.value
    }).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Investigación agregada exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
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
                timeout: Math.random() * 3000
            })
        } else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    });
}


function editarInves(i) {
    console.log("Entró a editar", i);
    bd.value = 0;
    id.value = i._id;
    codigo.value = i.codigo
    nombre.value = i.denominacion
    descripcion.value = i.descripcion
    fecha.value = i.fecha
    agregar.value = true;
}

async function actualizar() {
    await useInvestigacion.actualizarInves(
        id.value,
        codigo.value,
        nombre.value,
        descripcion.value,
        fecha.value
    ).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Investigación editada exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        buscar();

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
</style>