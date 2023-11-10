<template>
  <q-page padding>

    <div class="row q-mt-md">
      <div class="col"></div>
      <div class="col">
        <q-btn flat outlined color="secondary" label="Instrumentos  Evaluación" class="btn"
          @click="instrumento = true, material = false" />
      </div>
      <div class="col"></div>
      <div class="col">
        <q-btn flat outlined color="secondary" label="Materiales de Apoyo " class="btn"
          @click="instrumento = false, material = true" />

      </div>
      <div class="col"></div>
    </div>

    <!-- TABLA INSTRUMENTOS -->
    <div v-if="instrumento === true">
      <div class="text-h4 text-center q-mb-md q-mt-xl">Instrumentos de Evaluación</div>
      <!-- TABLA DE INSTRUMENTOS DE EVALUACION -->
      <div class="q-pa-md  q-mt-xl" style="width: 100%">
        <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="rows"
          :columns="columns" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <div class="opciones">

                <router-link to="infoDesarrollo">
                  <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                  <q-btn color="secondary">
                    <q-icon class="material-symbols-outlined" id="opciones">
                      visibility
                    </q-icon>
                  </q-btn>

                </router-link>

                <router-link to="cards">
                  <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                  <q-btn color="secondary">
                    <q-icon class="material-symbols-outlined" id="opciones">
                      border_color
                    </q-icon>
                  </q-btn>

                </router-link>


                <router-link to="cards">
                  <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                  <q-btn color="secondary">
                    <q-icon class="material-symbols-outlined" style="" id="opciones">
                      download
                    </q-icon>
                  </q-btn>

                </router-link>

              </div>
            </q-td>
          </template>

          <template v-slot:top-left>
            <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right>
            <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="
              agregar = true;
            nuevo();
            " />
          </template>
        </q-table>
      </div>
    </div>


    <!-- TABLA MATERIALES -->
    <div v-if="material === true">
      <div class="text-h4 text-center q-mb-md q-mt-xl">Materiales de Apoyo</div>

      <div class="q-pa-md  q-mt-xl" style="width: 100%">
        <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="materiales"
          :columns="columnsMaterial" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <div class="opciones">

                <q-icon title="Visitar Link" color="blue" @click="editarGuia(props.row)" name="fa-solid fa-share"
                  size="25px" style="margin-right: 25px;cursor: pointer;" />

                <q-icon title="Editar Material" color="orange" @click="editarGuia(props.row)"
                  name="fa-solid fa-pen-to-square fa-xl" size="25px" style="margin-right: 10px;cursor: pointer;" />

                <a :href="props.row.documento" target="_blank">
                  <q-icon title="Descargar material" color="green" name="fa-solid fa-download" size="25px"
                    style="margin-left: 10px;cursor: pointer;" />
                </a>

              </div>
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
              agregarMaterial = true;
            nuevo();
            " />
          </template>
        </q-table>
      </div>
    </div>

    <!-- Modal MATERIALES -->
    <q-dialog v-model="agregarMaterial">
        <q-card style="width: 32%; height: fit-content">
          <q-card-section class="row items-center q-pb-none">

            <div class="text-h6">
              {{ bd === 0 ? "Editar Material" : "Agregar Material" }}
            </div>

            <q-space />
            <q-btn icon="close" color="negative" flat round dense v-close-popup />

          </q-card-section>

          <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

          <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

            <div class="q-mb-md">
              <q-input label="Código*" color="secondary" v-model="codigo" />
            </div>

            <div class="q-mb-md">
              <q-input label="Nombre*" color="secondary" v-model="nombre" />
            </div>

            <div class="q-mb-md">
              <q-input label="Enlace" color="secondary" v-model="enlace" />
            </div>

            <div class="q-mb-md">
              <b>
                <p>Archivo</p>
              </b>
              <input type="file" @change="doc">
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn :disabled="loading" color="secondary" v-if="bd == 1" label="Guardar" @click="agregarN" />
            <q-btn :disabled="loading" color="secondary" v-else label="Actualizar" @click="actualizar" />
          </q-card-actions>
        </q-card>
      </q-dialog>


  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useInstrumento } from "../stores/Instrumentos.js"
import { usegiasStore } from "../stores/guias"
import { useApoyo } from "../stores/MaterialesApoyo.js"

import { useQuasar } from 'quasar'

let material = ref('')
let instrumento = ref('')
let instrumentos = ref([])
let materiales = ref([])
let filter = ref('')
let separator = ref('cell')
let useInst = useInstrumento()
let useMatApoyo = useApoyo()
let useGuia = usegiasStore()

console.log(useGuia.guia);

const agregarMaterial = ref(false)
let loading = ref(false)
const $q = useQuasar()

const columnsInstrumento = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
    align: 'center'
  },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

const columnsMaterial = [
  { name: "nombre", label: "Nombre", sortable: true, field: 'nombre', align: 'center' },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

const pagination = ref({
  rowsPerPage: 6
})

buscarMaterialesApoyo()

async function buscarMaterialesApoyo() {
  try {
    materiales.value = await useMatApoyo.buscarMatApoyo()
    materiales.value.reverse()
    console.log(materiales.value);
  } catch (error) {
    console.log(error);
  }
}


</script>


<style>
.btn {
  border-bottom: solid 2px;
  border-radius: none;
  /* right */
}
</style>