<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h6 text-center q-mb-md">Programas de Formación</div>

      <q-btn
        icon="add"
        style="background-color: rgb(57, 169, 0); color: white"
        label="Agregar Programa "
        class="q-mb-md"
        @click="agregar = true"
      />

      <table>
        <thead>
          <tr>
            <th>código</th>
            <th>denominación</th>
            <th>nivel de formación</th>
            <th>versión</th>
            <th>estado</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in programas" :key="index">
            <td>{{ x.codigo }}</td>
            <td>{{ x.denominacionPrograma }}</td>
            <td>{{ x.nivelFormacion }}</td>
            <td>{{ x.version }}</td>
            <td :style="{ color: x.estado === 1 ? 'green' : 'red' }">
              {{ x.estado === 1 ? "Activo" : "Inactivo" }}
            </td>
            <td>
              <div>
                <q-icon
                  color="orange"
                  name="fa-solid fa-pen-to-square fa-xl"
                  size="20px"
                  style="margin-right: 10px; cursor: pointer"
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
          <div class="text-h6">Nuevo Programa de Formación</div>
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
            label="Agregar"
            icon="add"
            @click="agregarPrograma()"
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
let version = ref("");

buscarProgramas();

async function buscarProgramas() {
  programas.value = await useProgramas.getProgramas();
  console.log(programas);
  programas.value.reverse();
}

async function agregarPrograma() {
  console.log("entro a agregar");
  await useProgramas.agregarProgramaFormacion({
    codigo: codigo.value,
    denominacionPrograma: denominacion.value,
    nivelFormacion: nivelFormacion.value,
    version: version.value,
  });
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