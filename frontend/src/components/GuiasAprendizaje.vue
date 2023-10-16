<template>
  <q-page padding>
    <div class="text-h4 text-center q-mb-md">Guías de Aprendizaje</div>
    <div class="q-pa-md" style="width: 100%">
      <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="rows"
        :columns="columns" row-key="name" :pagination="pagination">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <div class="opciones">

              <router-link to="infoDesarrollo">
                <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                <q-icon title="Detalle de Guía" name="fa-solid fa-eye" color="primary" size="25px"
                  style="margin-right: 25px;cursor: pointer;" />
              </router-link>

              <router-link to="cards">
                <q-icon title="Editar Guía" color="orange" name="fa-solid fa-pen-to-square fa-xl" size="25px"
                  style="margin-right: 10px;cursor: pointer;" />
              </router-link>

              <router-link to="cards">
                <!-- <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" /> -->
                <q-icon title="Descargar guía" color="green" name="fa-solid fa-download" size="25px"
                  style="margin-left: 10px;cursor: pointer;" />
              </router-link>

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
            agregar = true;
          nuevo();
          " />
        </template>
      </q-table>
    </div>
  </q-page>
</template>
 
  
  <!-- @click="editarRol(props.row)" -->
<style>
#opciones {
  font-size: 4vh;
}

.opciones button {
  margin-right: 8%;
  color: white;
}
</style>


<script setup>
const columns = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
    field: (row) => row.name,
    align: 'center'
  },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

const rows = [
  {
    name: "Guia de aprendizaje",
  },
];

</script>
 