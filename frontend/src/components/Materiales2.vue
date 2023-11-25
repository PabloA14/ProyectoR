<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
            <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
            <q-breadcrumbs-el label="Materiales de Formación" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md">Materiales de Formación</div>

        <div class="q-pa-md" style="width: 100%;">
            <div class="spinner-container" v-if="usePrograma.loading === true">
                <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
            </div>
            <q-table v-if="usePrograma.loading === false" class="my-sticky-header-table" :separator="separator" bordered
                :filter="filter" :rows="materialesPrograma" :columns="columns" row-key="name" :pagination="pagination">

                <template v-slot:top-right>
                    <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <template v-slot:body-cell-descripcion="props">
                    <q-td :props="props" style="white-space: pre-line;">
                        {{ props.row.descripcion }}
                    </q-td>
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
                        Agregar Materiales de Formación
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
                        <q-select label="Seleccionar los materiales de formación" v-model="materialSeleccionado"
                            :options="material.map(mat => ({ label: mat.nombre, value: mat._id }))" emit-value map-options>
                        </q-select>
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :disabled="loading" label="Agregar" @click="agregarN()"
                        :style="{ backgroundColor: colorMenu, color: colorLetra }" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useMaterialStore } from "../stores/Materiales.js"
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
let materialSeleccionado = ref("")
let material = ref([])
let materialesPrograma = ref([])
let agregar = ref(false)
const $q = useQuasar()
let loading = ref(false)
const useMaterial = useMaterialStore()
const usePrograma = useProgramasFormacionStore()
let materialesBd = usePrograma.programa.materialesformacion

let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
]

buscarMateriales()

materialesPrograma.value = usePrograma.programa.materialesformacion

let idPrograma = usePrograma.programa._id


async function buscarMat() {
    await usePrograma.informacionPrograma(usePrograma.programa.codigo)
        .then(() => {
            materialesPrograma.value = usePrograma.programa.materialesformacion
            materialesPrograma.value.reverse()
        }).catch((error) => {
            console.log(error);
        })
}

console.log(usePrograma.programa);

async function buscarMateriales() {
    const materialesActivos = await useMaterial.buscarMateriales();
    material.value = materialesActivos.filter(mat => mat.estado === 1);
}

function nuevo() {
    materialSeleccionado.value = ""
}

async function agregarN() {
    loading.value = true
    console.log("entro a agregar");
    await usePrograma.asignarMateriales(idPrograma, materialSeleccionado.value)
        .then(() => {
            agregar.value = false
            $q.notify({
                message: 'Material de formación agregado exitosamente',
                color: 'green',
                icon: 'check',
                position: 'bottom',
                timeout: 3000
            })
            buscarMat()
        }).catch((error) => {
            if (materialSeleccionado.value === "") {
                $q.notify({
                    message: 'Debe seleccionar un material',
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: 3000
                })
            } else if (error.response && error.response.data.msg) {
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
    width: 40%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #card {
        width: 100%;
    }
}

.input {
    color: red !important;

    height: fit-content;
}
</style>