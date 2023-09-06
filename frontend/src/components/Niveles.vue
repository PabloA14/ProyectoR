<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Niveles de Formación</div>
            <div class="q-pa-md" style="width: 100%;">
                <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="niveles"
                    :columns="columns" row-key="name" :pagination="pagination">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarNivel(props.row)" />
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
                        <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:top-left>
                        <q-btn color="secondary" icon="add" label="Agregar Red" class="q-mb-md" @click="
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
                        {{ bd === 0 ? "Editar Nivel" : "Agregar Nivel" }}
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
                        <q-input label="Código" color="secondary" v-model="codigo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Denominación" color="secondary" v-model="denominacion" />
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-if="bd == 1" label="Agregar" @click="agregarN()" color="secondary" v-close-popup />
                    <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useNivelStore } from "../stores/Niveles.js"
import { useQuasar } from 'quasar'

let agregar = ref(false)
let codigo = ref("")
let denominacion = ref("")
let id = ref("")

const useNivel = useNivelStore()
let niveles = ref([])
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'denominacion', align: 'center', label: 'Denominación', field: "denominacion", sortable: true },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    codigo.value = ""
    denominacion.value = ""
}

async function buscar() {
    niveles.value = await useNivel.buscarNiveles();
    console.log(niveles.value);
    niveles.value.reverse()
}

async function agregarN() {
    console.log("entro a agregar");
    await useNivel.agregarNiveles({
        codigo: codigo.value,
        denominacion: denominacion.value
    });
    $q.notify({
        message: 'Nivel de formación agregado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

function editarNivel(nivel) {
    console.log("Entró a editar", nivel);
    bd.value = 0;
    id.value = nivel._id;
    codigo.value = nivel.codigo
    denominacion.value = nivel.denominacion
    agregar.value = true;
}

async function actualizar() {
    await useNivel.actualizarNiveles(
        id.value,
        codigo.value,
        denominacion.value
    );
    $q.notify({
        message: 'Nivel de formación editado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

</script>