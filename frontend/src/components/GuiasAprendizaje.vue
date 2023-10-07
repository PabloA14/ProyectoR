<template>
  <q-page padding>
    <div class="text-h4 text-center q-mb-md">Guías de Aprendizaje</div>
    <div class="q-pa-md" style="width: 100%">
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
          <q-td :props="props">
            <q-btn flat round dense>              
                   <q-btn color="secondary" label="">
                     <q-icon name="more_vert" />

                     <q-menu max-height="130px">
                       <q-list style="min-width: 100px">
                         <q-item clickable>
                           <q-item-section>
                            <span class="material-symbols-outlined" style="" id="opciones">
                              download
                            </span>
                            </q-item-section>
                         </q-item>
                         <q-item clickable>
                           <q-item-section>
                            <span class="material-symbols-outlined" id="opciones">
                              border_color
                            </span>
                           </q-item-section>
                         </q-item>
                         <q-separator />

                       </q-list>
                     </q-menu>
                   </q-btn>
            </q-btn>
            <!-- <q-icon
                color="green"
                name="fa-solid fa-check fa-xl"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
                v-if="props.row.estado == 0"
                @click="editarEstado(props.row)"
              />
              <q-icon
                color="red"
                name="fa-solid fa-x"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
                v-else
                @click="editarEstado(props.row)"
              /> -->
          </q-td>
        </template>

        <!-- <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado == 1">Activo</span>
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template> -->

        <template v-slot:top-right>
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
        <template v-slot:top-left>
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
  </q-page>
</template>
  
  <script setup>
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
    name: "Guia de aprendizaje",
  },
];
</script>
  
  
  <!-- @click="editarRol(props.row)" -->
  