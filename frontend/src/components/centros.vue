<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mb-md">Centros de Formación</div>

      <div class="q-pa-md" style="width: 100%;">
        <div class="spinner-container" v-if="useCentro.loading === true">
          <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
        </div>
        <q-table v-if="useCentro.loading === false" class="my-sticky-header-table" :separator="separator" bordered
          :filter="filter" :rows="centro" :columns="columns" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                style="margin-right: 10px;cursor: pointer;" @click="editarCentro(props.row)" />
              <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px" style="margin-left: 10px;cursor: pointer;"
                v-if="props.row.estado == 0" @click="editarEstado(props.row)" />
              <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;" v-else
                @click="editarEstado(props.row)" />
            </q-td>
          </template>

          <template v-slot:body-cell-ciudad="props">
            <q-td :props="props">
              {{ props.row.ciudad.nombre }}
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado == 1">Activo</span>
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template>

          <template v-slot:top-right>
            <q-input :style="{ color: colorLetra }" dense debounce="300" v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-left>
            <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" icon="add" label="Agregar" class="q-mb-md"
              @click="
                agregar = true;
              nuevo();
              " />
          </template>
        </q-table>
      </div>
    </q-page>

    <q-dialog v-model="agregar">
      <q-card id="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ bd === 0 ? "Editar Centro" : "Agregar Centro" }}
          </div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator :style="{ backgroundColor: colorMenu, color: colorLetra }" inset id="separador" style="
        height: 5px;
        margin-top: 5px;
      " />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

          <div class="q-mb-md">
            <q-input label="Código*" type="number" v-model="codigo" />
          </div>

          <div class="q-mb-md">
            <q-input label="Nombre*" v-model="nombre" />
          </div>

          <div class="q-mb-md">
            <q-input label="Dirección*" v-model="direccion" />
          </div>

          <div class="q-mb-md">
            <q-select label="Ciudad*" v-model="ciudad" :options="ciudades.map(c => ({ label: c.nombre, value: c._id }))"
              emit-value map-options>
            </q-select>
          </div>


        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :disabled="loading" v-if="bd == 1"
            label="Agregar" @click="agregarC()" />
          <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :disabled="loading" v-else
            label="Actualizar" @click="actualizar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useCentroStore } from "../stores/centros.js"
import { useCiudadStore } from "../stores/Ciudades.js"
import { useQuasar } from 'quasar'
import { useColorStore } from "../stores/colorSetings.js";
let colores = useColorStore();
let colorMenu = ref('')
let colorLetra = ref('')

onMounted(async () => {
  await colores.traerConfiguracion()
  colorMenu.value = colores.configuracion.colorMenu
  colorLetra.value = colores.configuracion.colorLetra
})

let centro = ref([])
let ciudades = ref([])
let agregar = ref(false)
let codigo = ref("")
let nombre = ref("")
let direccion = ref("")
let ciudad = ref("")
let id = ref("")

const useCentro = useCentroStore()
const useCiudad = useCiudadStore()
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let errores = ref([])
let separator = ref('cell')
let loading = ref(false)

const pagination = ref({
  rowsPerPage: 6
})

const columns = [
  { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
  { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
  { name: 'direccion', align: 'center', label: 'Dirección', field: "direccion" },
  { name: 'ciudad', align: 'center', label: 'Ciudad', field: "ciudad" },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

buscar()
buscarCiudad()

function nuevo() {
  bd.value = 1;
  vaciar();
}

function vaciar() {
  codigo.value = ""
  nombre.value = ""
  direccion.value = ""
  ciudad.value = ""
}

function validarVacios() {
  if (codigo.value === "" && nombre.value === "" && direccion.value === "" && ciudad.value == "") {
    $q.notify({
      message: 'Campos vacíos',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else return true
}

function validar() {
  $q.notify({
    message: errores,
    color: 'negative',
    position: 'top',
    icon: 'warning',
    timeout: 3000
  })
}

async function buscar() {
  centro.value = await useCentro.buscarCentros();
  console.log(centro.value);
  centro.value.reverse()
}

async function buscarCiudad() {
  ciudades.value = await useCiudad.buscarCiudad();
  console.log(ciudades.value);
}

async function agregarC() {
  loading.value = true
  console.log("entro a agregar");
  await useCentro.agregarCentro({
    codigo: codigo.value,
    nombre: nombre.value,
    direccion: direccion.value,
    ciudad: ciudad.value,
  }).then(() => {
    $q.notify({
      message: 'Centro de formación agregado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: 3000
    })
    agregar.value = false
    buscar();
  }).catch((error) => {
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: 3000
      })
    } else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  })
  loading.value = false
}

function editarCentro(c) {
  console.log("Entró a editar", c);
  bd.value = 0;
  id.value = c._id;
  codigo.value = c.codigo
  nombre.value = c.nombre
  direccion.value = c.direccion
  ciudad.value = c.ciudad._id
  agregar.value = true;
}

async function actualizar() {
  loading.value = true
  await useCentro.actualizarCentros(
    id.value,
    codigo.value,
    nombre.value,
    direccion.value,
    ciudad.value,
  ).then(() => {
    $q.notify({
      message: 'Centro de formación editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: 3000
    })
    agregar.value = false
    buscar();
  }).catch((error) => {
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: 3000
      })
    } else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  })
  loading.value = false
}

async function editarEstado(centro) {
  console.log("entre a editar estado", centro.estado);
  try {
    if (centro.estado === 1) {
      centro.estado = 0
    } else {
      centro.estado = 1
    }
    const res = await useCentro.cambiarEstado(centro._id, centro.estado)
    $q.notify({
      message: 'Estado editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: 3000
    })
    buscar()

  } catch (error) {
    console.log(error);
  }
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

#card {
  width: 32%;
  height: fit-content;
}

@media screen and (max-width: 600px) {
  #card {
    width: 100%;
  }
}</style>