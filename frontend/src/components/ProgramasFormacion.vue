<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mb-md">Programas de Formación</div>
      <div class="q-pa-md" style="width: 100%">
        <q-table
          :separator="separator"
          class="my-sticky-header-table"
          bordered
          :filter="filter"
          :rows="programas"
          :columns="columns"
          row-key="codigo"
          rowsPerPage="6"
        >
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon
                color="orange"
                name="fa-solid fa-pen-to-square fa-xl"
                size="20px"
                style="margin-right: 10px; cursor: pointer"
                @click="editarPrograma(props.row)"
              />
              <q-icon
                color="green"
                name="fa-solid fa-check fa-xl"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
                v-if="props.row.estado === 0"
                @click="cambiarEstadoPrograma(props.row)"
              />
              <q-icon
                color="red"
                name="fa-solid fa-x"
                size="20px"
                style="margin-left: 10px; cursor: pointer"
                v-else
                @click="cambiarEstadoPrograma(props.row)"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado === 1"
                >Activo</span
              >
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template>

          <!-- Resto de las columnas del programa de formación -->

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
              label="Agregar Programa"
              class="q-mb-md"
              @click="mostrarModal()"
            />
          </template>
        </q-table>
      </div>
    </q-page>

    <q-dialog v-model="agregar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ bd === 0 ? "Editar Programa" : "Agregar Programa" }}
          </div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <!-- Campos de edición del programa de formación (código, denominación, nivel, versión, etc.) -->
          <div class="row">
            <div class="col-6">
              <div class="q-mb-md">
                <q-input
                  label="Código"
                  type="text"
                  color="secondary"
                  v-model="codigo"
                />
              </div>

              <div class="q-mb-md">
                <q-input
                  label="Denominación"
                  color="secondary"
                  v-model="denominacionPrograma"
                />
              </div>

              <!-- ----------- aca --------------- -->
              <div class="q-mb-md">
                <q-select
                  label="Niveles de formacion"
                  color="secondary"
                  v-model="nivel"
                  :options="
                    niveles.map((nivel) => ({
                      label: nivel.denominacion,
                      value: nivel._id,
                    }))
                  "
                  emit-value
                  map-options
                >
                </q-select>
              </div>

              <div class="q-mb-md">
                <q-input
                  label="Versión"
                  type="text"
                  color="secondary"
                  v-model="version"
                />
              </div>
              <!-- 
              <div class="q-mb-md">
                <q-select
                  label="Red de conocimiento"
                  color="secondary"
                  v-model="red" 
                  :options="
                redes.map((red) => ({
                  label: red.denominacion,
                  value: red._id,
                }))
              "
                />
              </div>

              <div class="q-mb-md">
                <q-input
                  label="Diseño curricular"
                  color="secondary"
                  v-model="disCurricular"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="q-mb-md">
                <q-select
                  label="Desarrollo Culicular"
                  color="secondary"
                  v-model="desarrolloCurricular"
                />
              </div>

              <div class="q-mb-md">
                <q-select
                  label="Instructores"
                  color="secondary"
                  v-model="instructores"
                />
              </div>

              <div class="q-mb-md">
                <q-select
                  label="Ambiente de formacion"
                  color="secondary"
                  v-model="ambienteFormacion"
                />
              </div>

              <div class="q-mb-md">
                <q-select
                  label="Materiales de Formacion"
                  color="secondary"
                  v-model="material"     
                  :options="
                materiales.map((material) => ({
                  label: material.nombre,
                  value: material._id,
                }))
              "
                />
              </div>

              <div class="q-mb-md">
                <q-select
                  label="Registro Calificado"
                  color="secondary"
                  v-model="registrocalificado"
                />
              </div> -->
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-if="bd === 1"
            label="Agregar"
            @click="agregarPrograma()"
            color="secondary"
            v-close-popup
          />
          <q-btn
            v-else
            label="Actualizar"
            @click="actualizarPrograma"
            color="secondary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js";
import { useNivelStore } from "../stores/Niveles.js";
// import { useRedStore } from "../stores/Redes";
// import { useMaterialStore } from "../stores/Materiales";

// const useMaterial = useMaterialStore();
// const useRed = useRedStore();
const useNiveles = useNivelStore();
const useProgramas = useProgramasFormacionStore();

// let material = ref();
// let materiales = ref([]);
// let red = ref();
// let redes = ref([]);
let nivelFormacion = ref("");
let niveles = ref([]);
let programas = ref([]);
let agregar = ref(false);
// let codigo = ref("");
let denominacion = ref("");
// let nivelFormacion = ref("");
let id = ref("");
// let version = ref("");
let bd = ref(0); // Cambiado a 0 en lugar de ""
let estado = ref(1); // Cambiado a 1 en lugar de ""
let separator = ref("cell");
let filter = ref("");

let codigo = ref("");
let denominacionPrograma = ref("");

let nivel = ref();
let version = ref("");
let RedConocimiento = ref("");
let disCurricular = ref("");
let desarrolloCurricular = ref("");
let instructores = ref("");
let ambienteFormacion = ref("");
let materialesformacion = ref("");
let registrocalificado = ref("");

buscarProgramas();

onMounted(() => {
  obtenerNiveles();
  buscarProgramas();
  // obtenerRedes();
  // obtenerMaterial();
});

const columns = [
  {
    name: "codigo",
    align: "center",
    label: "Código",
    field: "codigo",
    sortable: true,
  },
  {
    name: "denominacionPrograma",
    align: "center",
    label: "Denominación",
    field: "denominacionPrograma",
    sortable: true,
  },
  {
    align: "center",
    name: "nivelFormacion",
    label: "Nivel De Formación",
    field: "nivelFormacion",
    // (row) => row.nivelFormacion.denominacion,
  },
  { name: "version", label: "Versión", field: "version", align: "center" },
  {
    name: "estado",
    label: "Estado",
    field: "estado",
  },
  { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
];

async function buscarProgramas() {
  programas.value = await useProgramas.getProgramas();
}

function mostrarModal() {
  bd.value = 1;
  vaciarCampos();
  agregar.value = true;
}

function vaciarCampos() {
  codigo.value = "";
  denominacion.value = "";
  nivelFormacion.value = "";
  version.value = "";
  estado.value = "";
}

async function agregarPrograma() {
  try {
    await useProgramas.agregarProgramaFormacion({
      codigo: codigo.value,
      denominacionPrograma: denominacionPrograma.value,
      nivelFormacion: nivel.value,
      version: version.value,
      estado: estado.value,
      // RedConocimiento: RedConocimiento.value,
      // disCurricular: disCurricular.value,
      // desarrolloCurricular: desarrolloCurricular.value,
      // instructores: instructores.value,
      // ambienteFormacion: ambienteFormacion.value,
      // materialesformacion: materialesformacion.value,
      // registrocalificado: registrocalificado.value,

      // nivel formacio : 64f93f5256f533761a72e3fd
      // red de conocimiento :64f7eb5d44cc2c46e2524049
      // desarrolloC :  64f4e69da3786e1e96c2127f
      // usuario: 64f88a2744a97361f02bf07e
      // ambiente f 64f8d0326491d7b374df2983
      // materiales f : 64f8e2f844f2ecf3b3b83003
      // registros : 64ef82d648794a2161fedaed

      // codigo: "62",
      // denominacionPrograma: "2",
      // nivelFormacion: "64f93f5256f533761a72e3fd",
      // version: "4",
      // estado: "5",
      // RedConocimiento: "64f7eb5d44cc2c46e2524049",
      // disCurricular: "6",
      // desarrolloCurricular: "64f4e69da3786e1e96c2127f",
      // instructores: "64f88a2744a97361f02bf07e",
      // ambienteFormacion: "64f8d0326491d7b374df2983",
      // materialesformacion: "64f8e2f844f2ecf3b3b83003",
      // registrocalificado: "64ef82d648794a2161fedaed",
    });
    buscarProgramas();
    agregar.value = false;
  } catch (error) {
    console.error(error.response);
  }
}

async function actualizarPrograma() {
  await useProgramas.actualizarPrograma(id.value, {
    codigo: codigo.value,
    denominacionPrograma: denominacion.value,
    nivelFormacion: nivelFormacion.value,
    version: version.value,
    estado: estado.value,
  });
  buscarProgramas();
  agregar.value = false;
}

function editarPrograma(programa) {
  bd.value = 0;
  id.value = programa._id;
  codigo.value = programa.codigo;
  denominacion.value = programa.denominacionPrograma;
  nivelFormacion.value = programa.nivelFormacion;
  version.value = programa.version;
  estado.value = programa.estado;
  agregar.value = true;
}

async function cambiarEstadoPrograma(programa) {
  try {
    if (programa.estado === 1) {
      programa.estado = 0;
    } else {
      programa.estado = 1;
    }

    const res = await useProgramas.cambiarEstado(programa._id, programa.estado);
    buscarProgramas();
  } catch (error) {
    console.log(error);
  }
}

const obtenerNiveles = async () => {
  try {
    niveles.value = await useNiveles.buscarNiveles();
    console.log("niveles", niveles.value);
  } catch (error) {
    console.log(error);
  }
};

// const obtenerRedes = async () => {
//   try {
//     redes.value = await useRed.buscarRedes();
//     console.log("redes", redes.value);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const obtenerMaterial = async () => {
//   try {
//     materiales.value = await useMaterial.buscarMateriales();
//     console.log("materiales", materiales.value);
//   } catch (error) {
//     console.log(error);
//   }
// };
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  text-transform: capitalize;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}
</style>
