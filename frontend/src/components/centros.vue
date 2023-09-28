<template>
  <div>
    <div class="text-h4 text-center q-mb-md q-mt-md">Centros De Formacion</div>

    <div class="q-pa-md">
      <q-table
        title="Centros"
        :rows="centros.centros"
        :columns="columns"
        row-key="codigo"
      >
        <template v-slot:body-cell-opciones="props">
      <q-td :props="props">
        <q-btn color="secondary" @click="editar(props.row), (editarF = true), (agregar = false)">Editar</q-btn>
      </q-td>
    </template>
        <template v-slot:top-left>
          <q-btn
            color="secondary"
            icon="add"
            label="Agregar"
            class="q-mb-md"
            @click="agregar = true"
          />
        </template>
      </q-table>
    </div>

    <!-- Agregar Centro -->
    <q-dialog v-model="agregar">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Agregar Centro</div>

          <q-separator style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />
          <q-input v-model="codigo" label="Codigo Centro" />
          <q-input v-model="nombre" label="Nombre" />
          <q-select
            v-model="ciudad"
            label="Ciudad"
            :options="city.ciudades"
            option-label="nombre"
            option-value="_id"
          />
          <q-input v-model="direccion" label="Dirección" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Agregar centro"
            @click="agregarCentro"
          />
          <q-btn color="negative" label="Cancelar" @click="agregar = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Editar Centro -->
    <q-dialog v-model="editarF">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Editar Centro</div>

          <q-separator style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />
          <q-input v-model="codigo" label="Codigo Centro" />
          <q-input v-model="nombre" label="Nombre" />
          <q-select
            v-model="ciudad2"
            label="Ciudad"
            :options="city.ciudades"
            option-label="nombre"
            option-value="_id"
          />
          <q-input v-model="direccion" label="Dirección" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Guardar" @click="guardarEdicion" />
          <q-btn color="negative" label="Cancelar" @click="editarF = false"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCentros } from "../stores/centros.js";
import { useQuasar } from 'quasar'

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
const $q = useQuasar();

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
    vaciar();
    traerCentros();
     // Muestra una alerta de éxito
     $q.notify({
      message: 'Centro agregado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'top',
      timeout: Math.random() * 3000
    });
    agregar.value = false;
    return agregar;
  } catch  (error) {
     // Muestra una alerta de error
     $q.notify({
      message: 'Error al agregar el centro',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: Math.random() * 3000
    });
    console.log(error);
  }
}

function vaciar() {
  codigo.value = "";
  nombre.value = "";
  ciudad.value = "";
  ciudad2.value = "";
  direccion.value = "";
}

function editar(x) {
  console.log(x, ".................");
  id.value = x._id;
  codigo.value = x.codigo;
  nombre.value = x.nombre;
  ciudad2.value = x.ciudad._id;
  console.log("ciudad que inicia", x.ciudad._id);
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
    vaciar();
    $q.notify({
      message: 'Editado correctamente',
      color: 'green',
      icon: 'check',
      position: 'top',
      timeout: Math.random() * 3000
    });

    console.log("--------------------------");
    console.log(guardar);
    traerCentros();
  } catch (error) {
    $q.notify({
      message: 'Error al editar',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: Math.random() * 3000
    });
    console.log(error);
  }
}
</script>
