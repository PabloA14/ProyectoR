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
                                style="margin-right: 10px;cursor: pointer;" @click="editarRol(props.row)" />
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
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMaterialStore } from "../stores/Materiales.js"
import { useQuasar } from 'quasar'

const useMaterial = useMaterialStore()
let material = ref([])
//let expanded = ref(false)

const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true },
    { name: 'archivo', align: 'center', label: 'Archivo', field: "documentacion"},
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]


buscar()


async function buscar() {
    material.value = await useMaterial.buscarMateriales();
    console.log(material.value);
    material.value.reverse()
}


</script>