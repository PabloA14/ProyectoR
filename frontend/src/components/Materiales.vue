<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Materiales de Formación</div>
            <div class="q-pa-md" style="width: 100%;">
                <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="material"
                    :columns="columns" row-key="name" :pagination="pagination">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarMaterial(props.row)" />
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(props.row)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(props.row)" />
                        </q-td>
                    </template>

                    <template v-slot:body-cell-descripcion="props">
                        <q-td :props="props" style="white-space: pre-line;">
                            {{ props.row.descripcion }}
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
                        {{ bd === 0 ? "Editar Material" : "Agregar Material" }}
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />

                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
                    <div class="q-mb-md">
                        <q-input label="Código" color="secondary" v-model="codigo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Nombre" color="secondary" v-model="nombre" />
                    </div>

                    <q-select v-model="tipo" color="secondary" label="Tipo" :options="options" />

                    <div class="q-mb-md">
                        <q-input label="Descripción" color="secondary" type="textarea" v-model="descripcion" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Archivo" color="secondary" type="text" v-model="archivo" />
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-if="bd == 1" label="Agregar" @click="agregarR()" color="secondary" v-close-popup />
                    <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMaterialStore } from "../stores/Materiales.js"
import { useQuasar } from 'quasar'

const useMaterial = useMaterialStore()
let material = ref([])
let options = ref(['Herramienta', 'Evaluación'])
let agregar = ref(false)


let codigo = ref("")
let nombre = ref("")
let tipo = ref("")
let descripcion = ref("")
let archivo = ref("")
let bd = ref("")
let id = ref("")

//let expanded = ref(false)

const $q = useQuasar()
let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})


const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true },
    { name: 'archivo', align: 'center', label: 'Archivo', field: "documentacion" },
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
    nombre.value = ""
    tipo.value = ""
    descripcion.value = ""
    archivo.value = ""
}

async function buscar() {
    material.value = await useMaterial.buscarMateriales();
    console.log(material.value);
    material.value.reverse()
}

async function agregarR() {
    console.log("entro a agregar");
    await useMaterial.agregarMateriales({
        codigo: codigo.value,
        nombre: nombre.value,
        tipo: tipo.value,
        descripcion: descripcion.value,
        documentacion: archivo.value

    });
    $q.notify({
        message: 'Material agregado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

function editarMaterial(materiales) {
    console.log("Entró a editar", materiales);
    bd.value = 0;
    id.value = materiales._id;
    codigo.value = materiales.codigo
    nombre.value = materiales.nombre
    tipo.value = materiales.tipo
    descripcion.value = materiales.descripcion
    archivo.value = materiales.documentacion
    agregar.value = true;
}

async function actualizar() {
    await useMaterial.actualizarMateriales(
        id.value,
        codigo.value,
        nombre.value,
        tipo.value,
        descripcion.value,
        archivo.value
    );
    $q.notify({
        message: 'Material editado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

async function editarEstado(materiales) {
    console.log("entre a editar estado", materiales.estado);
    try {
        if (materiales.estado === 1) {
            materiales.estado = 0
        } else {
            materiales.estado = 1
        }
        const res = await useMaterial.cambiarEstado(materiales._id, materiales.estado)
        $q.notify({
            message: 'Estado editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'top',
            timeout: Math.random() * 3000
        })
        buscar()

    } catch (error) {
        console.log(error);
    }
}


</script>