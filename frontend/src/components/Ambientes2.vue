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
                    <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
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
                    <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="
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
          " color="secondary" />

                <q-card-section style="max-height: 65vh" class="scroll">

                    <div class="q-mb-md">
                        <q-select label="Seleccionar los ambientes de formación" color="secondary"
                            v-model="ambienteSeleccionado"
                            :options="ambiente.map(amb => ({ label: amb.nombre, value: amb._id }))" emit-value map-options>
                        </q-select>
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :disabled="loading" label="Agregar" @click="agregarN()" color="secondary" />
                </q-card-actions>
            </q-card>
        </q-dialog>


    </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useAmbienteStore } from "../stores/Ambientes.js"
import { useQuasar } from 'quasar'
import { useUsuarioStore } from "../stores/Usuarios.js";

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

let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);

let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true },
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

console.log(usePrograma.programa);

async function buscarAmbientes() {
    const ambientesActivos = await useAmbiente.buscarAmbientes();
    ambiente.value = ambientesActivos.filter(amb => amb.estado === 1);
    console.log(ambiente.value);
}

function nuevo() {
    ambienteSeleccionado.value = ""
}

async function agregarN() {
    loading.value = true
    console.log("entro a agregar");
    await usePrograma.asignarAmbientes(idPrograma, ambienteSeleccionado.value)
        .then(() => {
            agregar.value = false
            $q.notify({
                message: 'Ambiente de formación agregado exitosamente',
                color: 'green',
                icon: 'check',
                position: 'bottom',
                timeout: Math.random() * 3000
            })
            buscarAmb()
        }).catch((error) => {
            if (ambienteSeleccionado.value === "") {
                $q.notify({
                    message: 'Debe seleccionar un ambiente',
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: Math.random() * 3000
                })
            } else if (error.response && error.response.data.msg) {
                const fallo = error.response.data.msg
                $q.notify({
                    message: fallo,
                    color: 'negative',
                    position: 'top',
                    icon: 'warning',
                    timeout: Math.random() * 3000
                })
            } else {
                console.log(error);
            }
        })
    loading.value = false
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
</style>