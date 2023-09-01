<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h6 text-center q-mb-md">Programas de Formación</div>

      <q-btn
        icon="add"
        style="background-color: rgb(57, 169, 0); color: white"
        label="Agregar Programa"
        class="q-mb-md"
        @click="nuevoPrograma(),agregar=true"
      />

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Denominación</th>
            <th>Nivel de Formación</th>
            <th>Versión</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(programa, index) in programas" :key="index">
            <td>{{ programa.codigo }}</td>
            <td>{{ programa.denominacionPrograma }}</td>
            <td>{{ programa.nivelFormacion }}</td>
            <td>{{ programa.version }}</td>
            <td :style="{ color: programa.estado === 1 ? 'green' : 'red' }">
              {{ programa.estado === 1 ? "Activo" : "Inactivo" }}
            </td>
            <td>
              <div>
                <q-icon
                  color="orange"
                  name="fa-solid fa-pen-to-square fa-xl"
                  size="20px"
                  style="margin-right: 10px; cursor: pointer"
                  @click="editarPrograma(programa)"
                />
                <q-icon
                  color="green"
                  name="fa-solid fa-check fa-xl"
                  size="20px"
                  style="margin-left: 10px; cursor: pointer"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </q-page>

    <q-dialog v-model="agregar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{
              bd === 0
                ? "Editar Programa de Formación"
                : "Nuevo Programa de Formación"
            }}
          </div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="
            height: 5px;
            margin-top: 5px;
            background-color: rgb(57, 169, 0);
          "
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Código" color="positive" v-model="codigo" />
          </div>

          <div class="q-mb-md">
            <q-input
              label="Denominación"
              color="positive"
              v-model="denominacion"
            />
          </div>

          <div class="q-mb-md">
            <q-input
              label="Nivel de Formación"
              color="positive"
              v-model="nivelFormacion"
            />
          </div>

          <div class="q-mb-md">
            <q-input
              label="Versión del Programa"
              color="positive"
              v-model="version"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-if="bd === 1"
            label="Agregar"
            icon="add"
            @click="agregarPrograma()"
            style="background-color: rgb(57, 169, 0); color: white"
            v-close-popup
          />

          <q-btn
            v-else
            label="Actualizar"
            @click="actualizarPrograma()"
            style="background-color: rgb(57, 169, 0); color: white"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UseProgramasFormacion } from "../stores/ProgramasFormacion.js";

const useProgramas = UseProgramasFormacion();
let programas = ref([]);
let agregar = ref(false);
let codigo = ref("");
let denominacion = ref("");
let nivelFormacion = ref("");
let id = ref("");
let version = ref("");
let bd = ref("");

buscarProgramas();

async function buscarProgramas() {
  programas.value = await useProgramas.getProgramas();
  programas.value.reverse();
  console.log(programas);
}

function nuevoPrograma() {
  bd.value = 1;
  vaciarCampos();
}

function vaciarCampos() {
  codigo.value = "";
  denominacion.value = "";
  nivelFormacion.value = "";
  version.value = "";
}

async function agregarPrograma() {
  console.log("Entro a agregar programa");
  await useProgramas.agregarProgramaFormacion({
    codigo: codigo.value,
    denominacionPrograma: denominacion.value,
    nivelFormacion: nivelFormacion.value,
    version: version.value,
  });
  buscarProgramas();
}

function editarPrograma(programa) {
  bd.value = 0;
  id.value = programa._id;
  codigo.value = programa.codigo;
  denominacion.value = programa.denominacionPrograma;
  nivelFormacion.value = programa.nivelFormacion;
  version.value = programa.version;
  agregar.value = true;
}

async function actualizarPrograma() {
  await useProgramas.actualizarProgramaFormacion(
    id.value,
    codigo.value,
    denominacion.value,
    nivelFormacion.value,
    version.value
  );
  buscarProgramas();
}
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
