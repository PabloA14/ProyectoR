<template>
      <q-page padding>

        <div class="row q-mt-md">
            <div class="col"></div>
            <div class="col">
                <q-btn flat outlined color="secondary" label="Instrumentos  Evaluación" class="btn" @click="instrumento=true, material=false" />
            </div>
            <div class="col"></div>
            <div class="col">
                <q-btn flat  outlined color="secondary" label="Materiales de Apoyo " class="btn"  @click="instrumento=false , material=true"/>

            </div>
            <div class="col"></div>
        </div>

        <div v-if="instrumento===true">
            <div class="text-h4 text-center q-mb-md q-mt-xl">Instrumentos de Evaluación</div>
<!-- TABLA DE INSTRUMENTOS DE EVALUACION -->
          <div class="q-pa-md  q-mt-xl" style="width: 100%">
      <q-table
        class="my-sticky-header-table"
        :separator="separator"
        bordered
        :filter="filter"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="pagination"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" >
            <div class="opciones">

              <router-link to="infoDesarrollo">
                <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                  <q-btn color="secondary">
                    <q-icon class="material-symbols-outlined" id="opciones" >
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
          <q-input
            color="secondary"
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="secondary"
            icon="add"
            label="Agregar"
            class="q-mb-md"
            @click="
              agregar = true;
              nuevo();
            "
          />
        </template>
      </q-table>
          </div>
        </div>


        <div v-if="material===true">
            <div class="text-h4 text-center q-mb-md q-mt-xl">Material Apoyo</div>

            <div class="q-pa-md  q-mt-xl" style="width: 100%">
      <q-table
        class="my-sticky-header-table"
        :separator="separator"
        bordered
        :filter="filter"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="pagination"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" >
            <div class="opciones">

              <router-link to="infoDesarrollo">
                <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                  <q-btn color="secondary">
                    <q-icon class="material-symbols-outlined" id="opciones" >
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
          <q-input
            color="secondary"
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="secondary"
            icon="add"
            label="Agregar"
            class="q-mb-md"
            @click="
              agregar = true;
              nuevo();
            "
          />
        </template>
      </q-table>
    </div>



        </div>


      </q-page>
</template>

<script setup>
import {ref} from 'vue'

let instrumento=ref(true)
let material = ref(false)


const columns = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
    field: (row) => row.name,
    align: 'center'
  },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align:'center' },
];

const rows = [
  {
    name: "Instrumento Evaluación",
  },
];


</script>


<style>
.btn{
    border-bottom: solid 2px;
    border-radius: none;
    /* right */
}
</style>