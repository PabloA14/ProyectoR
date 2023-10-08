<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mt-md">Instructores</div>
      <div class="q-pa-md" style="width: 100%">
        <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon
                color="green"
                name="fa-solid fa-check fa-xl"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
              />
            </q-td>
          </template>
          <!--
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <span class="text-green" v-if="props.row.estado == 1"
                  >Activo</span
                >
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
              @click="Modagregar"
            />
            <q-btn
              color="black"
              label="Eliminar"
              class="q-mb-md"
              @click="Modeliminar"
            />
          </template>
        </q-table>
      </div>
    </q-page>

    <q-dialog v-model="modalAgg">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar Instructor</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-select label="Intructor" color="secondary" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary" label="Agregar" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalEliminar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Eliminar Instructor</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="text-h5 text-center q-mt-md">
            ¿Esta seguro que desea eliminar a '*********** ' de la lista de
            instructores ?
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Confirmar" />
          <q-btn color="negative" label="Rechazar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
let modalAgg = ref();
let filter = ref();
let modalEliminar = ref();

function Modagregar() {
  modalAgg.value = true;
}

function Modeliminar() {
  modalEliminar.value = true;
}

const columns = [
  {
    name: "calories",
    align: "center",
    label: "Instructor",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Estado ", field: "fat", sortable: true },
  { name: "carbs", label: "Email", field: "carbs" },
  { name: "protein", label: "Telefono", field: "protein" },
  { name: "sodium", label: "Opciones", field: "sodium" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
];
</script>

<!-- <script setup>
  import { ref } from "vue";
  import { useUsuarioStore } from "../stores/Usuarios.js";
  
  const useUsuari = useUsuarioStore();
  let usuarioFiltrado = ref([])
  let usuarios = ref([])
  
  const pagination = ref({
    rowsPerPage: 6
  })
  
  let filter = ref('')
  let separator = ref('cell')
  
  buscar()
  
  async function buscar() {
    usuarios.value = await useUsuari.buscarUsuarios();
    console.log(usuarios.value);
    usuarios.value.reverse()
    usuarioFiltrado.value = usuarios.filter(x => x.rol === 'instructor')
    console.log(usuarioFiltrado.value);
  }
  
  </script> -->
<style scoped></style>
