<template>
  <div>
    <h4>Centros jejej</h4>
    <button @click="(agregar = true), (editarF = false)">agregar</button>

    <table>
      <thead>
        <th>Codigo</th>
        <th>Denominacion</th>
        <th>Ciudad</th>
        <th>Direccion</th>
        <th>Opciones</th>
      </thead>
      <tbody v-for="(x, i) in centros.centros" :key="i">
        <td>{{ x.codigo }}</td>
        <td>{{ x.nombre }}</td>
        <td>{{ x.ciudad.nombre }}</td>
        <td>{{ x.direccion }}</td>
        <td>
          <button @click="editar(x), (editarF = true), (agregar = false)">
            Editar
          </button>
        </td>
      </tbody>
    </table>

    <div class="modalAgregar">
      <div v-if="agregar === true">
        <p>Agregar Centro</p>
        <span>Codigo Centro</span>
        <input type="text" v-model="codigo" />
        <span>Nombre</span>
        <input type="text" v-model="nombre" />
        <span>Ciudad</span>
        <select name="ciudad" id="ciudad" v-model="ciudad">
          <option
            v-for="(x, index) in city.ciudades"
            :key="index"
            :value="x._id"
          >
            {{ x.nombre }}
          </option>
        </select>

        <span>Dirección</span>
        <input type="text" v-model="direccion" />
        <div>
          <button @click="agregarCentro()">Agregar centro</button>
        </div>
      </div>

      <div class="q-pa-md">
        <q-table
          title="Centros"
          :rows="centros.centros"
          :columns="columns"
          row-key="codigo"
        >
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn
                color="secondary"
                
              >
                Editar
              </q-btn>

              <!-- <q-icon  color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                style="margin-right: 10px;cursor: pointer;" /> -->
            </q-td>
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
    </div>

    <!-- MODAL EDITAR -->
    <div v-if="editarF === true">
      <p>Editar centros</p>
      <span>Codigo Centro</span>
      <input type="text" v-model="codigo" />
      <span>Nombre</span>
      <input type="text" v-model="nombre" />

      <span>Ciudad </span>
      <select name="ciudad" id="ciudad" v-model="ciudad2">
        <option v-for="(x, index) in city.ciudades" :key="index" :value="x._id">
          {{ x.nombre }}
        </option>
      </select>

      <span>Dirección</span>
      <input type="text" v-model="direccion" />

      <button @click="guardarEdicion()">guardar</button>
    </div>

    <!-- Dentro de tu componente Vue -->
    <!-- <template>
   

  <q-dialog v-model="agregar">
    <q-card style="width: 32%; height: fit-content">
      
      
      <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
        
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

          
          </div>
          <div class="col-6">
          
          </div>
        </div>
      </q-card-section>

     

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
</template> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCentros } from "../stores/centros.js";
const useCentro = useCentros();
let centros = ref([]);
let codigo = ref("");
let nombre = ref("");
let ciudad = ref("");
let ciudad2 = ref("");
let direccion = ref("");
let id = ref("");
let editarF = ref(false);
let agregar = ref(false);

let city = ref([]);

const columns = [
  {
    name: "codigo",
    align: "center",
    label: "Codigo",
    field: "codigo",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Denominacion",
    field: "nombre",
    sortable: true,
  },
  {
    name: "ciudad",
    label: "ciudad",
    field: (row) => row.ciudad.nombre,
    sortable: true,
  },
  { name: "direccion", label: "Direccion", field: "direccion" },
  { name: "opciones", label: "opciones", field: "opciones" },
];

traerCentros();
async function traerCentros() {
  try {
    centros.value = await useCentro.buscarCentros();
    city.value = await useCentro.buscarCiudad();
  } catch (error) {
    console.log(error);
  }
}

traerCentros();

async function agregarCentro() {
  try {
    const agregar = await useCentro.agregarCentro(
      codigo.value,
      nombre.value,
      ciudad.value,
      direccion.value
    );
    traerCentros();
    return agregar;
  } catch (error) {
    console.log(error);
  }
}

function editar(x) {
  console.log(x, ".................");
  id.value = x._id;
  (codigo.value = x.codigo),
    (nombre.value = x.nombre),
    (ciudad2.value = x.ciudad._id),
    console.log("ciudad que inciia", x.ciudad._id);
  direccion.value = x.direccion;
  console.log(x.direccion, "direccion");
}

async function guardarEdicion() {
  console.log("ciudad que se elige");
  console.log(ciudad2.value);

  try {
    const guardar = await useCentro.actualizarCentros(
      id.value,
      codigo.value,
      nombre.value,
      direccion.value,
      ciudad2.value
    );
    console.log("--------------------------");
    console.log(guardar);
    traerCentros();
  } catch (error) {
    console.log(error);
  }
}
</script>
