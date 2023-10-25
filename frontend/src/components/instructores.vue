<template>
  <div>
    <div class="text-h4 text-center q-mt-md">Instructores</div>
    <div class="spinner-container" v-if="loading">
      <q-spinner
        style="margin-left: 10px"
        color="black"
        size="7em"
        :thickness="10"
      />
    </div>
    <q-page v-else class="q-pa-md">
      <div class="q-pa-md" style="width: 100%">
        <q-table
          title="Treats"
          :rows="instructores"
          :columns="columns"
          row-key="cedula"
        >
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon
                color="green"
                name="fa-solid fa-check fa-xl"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
              />
              <q-icon
                color="red"
                name="fa-solid fa-trash-alt fa-xl"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
                @click="Modeliminar"
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
            <div class="q-mb-md">
              <q-select
                label="Instructor"
                color="secondary"
                v-model="instructor"
                :options="instructores"
                option-label="nombre"
                option-value="nombre"
              />
            </div>
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
            ¿Esta seguro que desea eliminar a '*****+*** ' de la lista de
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
import { useUsuarioStore } from "../stores/Usuarios.js";

let modalAgg = ref();
let filter = ref();
let modalEliminar = ref();
let instructor = ref();
let loading = ref(false);
let usuarios = ref([]);
let instructores = ref([]);

const useUsuari = useUsuarioStore();

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Instructor",
    field: "nombre",
    sortable: true,
  },
  { name: "estado", label: "Estado ", field: "estado", sortable: true },
  { name: "correo", label: "Email", field: "correo" },
  { name: "telefono", label: "Telefono", field: "telefono" },
  { name: "opciones", label: "Opciones", field: "opciones" },
];

function obtenerInstructores() {
  console.log("entraste a instructores");
  instructores.value = usuarios.value.filter(
    (user) => user.rol.denominacion === "instructor"
  );
  console.log("sadasdadasd", instructores.value);
  // Rellena las opcions del q-select con los instructores
  instructor.value = null; // Reinicia el valor seleccionado
}

// function eliminarInstructor(instructor) {
//   // lógica para eliminar al instructor
// }

async function cargarUsuarios() {
  loading.value = true;
  usuarios.value = await useUsuari.buscarUsuarios();
  obtenerInstructores();
  loading.value = false;
}
cargarUsuarios();
// onMounted(() => {
//   cargarUsuarios();
// });

function Modagregar() {
  modalAgg.value = true;
}

function Modeliminar() {
  modalEliminar.value = true;
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
</style>
