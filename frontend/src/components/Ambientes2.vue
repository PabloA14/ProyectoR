<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
            <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
            <q-breadcrumbs-el label="Ambientes de Formación" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md">Ambientes de Formación</div>
        

        <div class="q-pa-md" style="width: 100%;">
            <div class="spinner-container" v-if="usePrograma.loading === true">
                <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
            </div>
            <q-table v-if="usePrograma.loading === false" class="my-sticky-header-table" :separator="separator" bordered
                :filter="filter" :rows="ambientesPrograma" :columns="columns" row-key="name" :pagination="pagination">

                <template v-slot:top-right>
                    <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>


                <template v-if="rol === 'gestor'" v-slot:top-left>
                    <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" icon="add" label="Agregar"
                        class="q-mb-md" @click="
                            agregar = true;
                        nuevo();
                        " />
                </template>
            </q-table>
        </div>


        <q-dialog v-model="agregar">
            <q-card id="card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        Agregar Ambientes de Formación
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " :style="{ backgroundColor: colorMenu, color: colorLetra }" />

                <q-card-section style="max-height: 65vh" class="scroll">

                    <div class="q-mb-md">
                        <q-select clearable label="Seleccionar los ambientes de formación" v-model="ambienteSeleccionado"
                            :options="ambiente.map(amb => ({ label: amb.nombre, value: amb._id }))" emit-value map-options>
                        </q-select>
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :loading="loading" label="Agregar  "
                        @click="agregarN()" />
                </q-card-actions>
            </q-card>
        </q-dialog>


    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useAmbienteStore } from "../stores/Ambientes.js"
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
let ambienteSeleccionado = ref("")
let ambiente = ref([])
let ambientesPrograma = ref([])
let agregar = ref(false)
const $q = useQuasar()
let loading = ref(false)
const useAmbiente = useAmbienteStore()
const usePrograma = useProgramasFormacionStore()

let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true, field: (row) => row.descripcion },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
]

buscarAmbientes()

ambientesPrograma.value = usePrograma.programa.ambienteFormacion

let idPrograma = usePrograma.programa._id

async function buscarAmb() {
    await usePrograma.informacionPrograma(usePrograma.programa.codigo)
        .then(() => {
            ambientesPrograma.value = usePrograma.programa.ambienteFormacion
            ambientesPrograma.value.reverse()
        }).catch((error) => {
            console.log(error);
        })
}

async function buscarAmbientes() {
    const ambientesActivos = await useAmbiente.buscarAmbientes();
    ambiente.value = ambientesActivos.filter(amb => amb.estado === 1);
}

function nuevo() {
    ambienteSeleccionado.value = ""
}

function validar() {
    if (!ambienteSeleccionado.value) {
        $q.notify({
            message: 'Debe seleccionar un ambiente',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    } else return true
}

async function agregarN() {
    if (validar() === true) {
        loading.value = true
        await usePrograma.asignarAmbientes(idPrograma, ambienteSeleccionado.value)
            .then(() => {
                agregar.value = false
                $q.notify({
                    message: 'Ambiente de formación agregado exitosamente',
                    color: 'green',
                    icon: 'check',
                    position: 'bottom',
                    timeout: 3000
                })
                buscarAmb()
            }).catch((error) => {
                if (error.response && error.response.data.msg) {
                    const fallo = error.response.data.msg
                    $q.notify({
                        message: fallo,
                        color: 'negative',
                        position: 'top',
                        icon: 'warning',
                        timeout: 3000
                    })
                } else {
                    console.log(error);
                }
            })
        loading.value = false
    }
}

</script>

<style scoped>
#card {
    width: 40%;
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

.input {
    color: red !important;

    height: fit-content;
}
</style>