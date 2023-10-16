<template>
  <div>


    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mb-md">{{ redConocimiento }}
      </div>

      <div class="q-pa-md" style="width: 100%;">

        <div class="spinner-container" v-if="usePrograma.loading === true">
          <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
        </div>

        <q-table v-if="usePrograma.loading === false" class="my-sticky-header-table" :separator="separator" bordered
          :filter="filter" :rows="programas" :columns="columns" row-key="name" :pagination="pagination">
          <!-- opciones -->
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <!-- detalle del programa -->
              <!-- <router-link to="cards">
                <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" @click="informacionPrograma(props.row)" />
              </router-link> -->
              <router-link to="cards">
                <q-icon title="Detalle de Programa" name="fa-solid fa-eye" color="primary" size="20px"
                  style="margin-right: 25px;cursor: pointer;" @click="informacionPrograma(props.row)" />
              </router-link>
              <!-- editar programa -->
              <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                style="margin-right: 10px;cursor: pointer;" @click="editarPrograma(props.row)" />
              <!-- estado del programa -->
              <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px" style="margin-left: 10px;cursor: pointer;"
                v-if="props.row.estado == 0" @click="editarEstado(props.row)" />
              <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;" v-else
                @click="editarEstado(props.row)" />
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado == 1">Activo</span>
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template>

          <template v-slot:body-cell-nivel="props">
            <q-td :props="props">
              <span>{{ props.row.nivelFormacion.denominacion }}</span>
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

    <q-dialog v-model="agregar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ bd === 0 ? "Editar Programa" : "Agregar Programa" }}
          </div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Código*" color="secondary" v-model="codigo" />
          </div>

          <div class="q-mb-md">
            <q-input label="Denominación*" color="secondary" v-model="denominacion" />
          </div>

          <div class="q-mb-md">
            <q-select label="Nivel de Formación*" color="secondary" v-model="nivel"
              :options="niveles.map(nivel => ({ label: nivel.denominacion, value: nivel._id }))" emit-value map-options>
            </q-select>
          </div>

          <div class="q-mb-md">
            <q-input label="Versión*" color="secondary" v-model="version" />
          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-if="bd == 1" label="Agregar" @click="agregarP()" color="secondary" />
          <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import axios from 'axios'
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useNivelStore } from "../stores/Niveles.js"
import { useQuasar } from 'quasar'
import { useUserStore } from '../almacenaje/informacion.js'
import VueJwtDecode from 'vue-jwt-decode'

const dataProgram = useUserStore()
let agregar = ref(false)
let codigo = ref("")
let denominacion = ref("")
let nivel = ref("")
let version = ref("")
let programas = ref([])
let id = ref("")
let niveles = ref([])
let separator = ref('cell')
let redConocimiento = ref('')
let bd = ref("");
const usePrograma = useProgramasFormacionStore();
const useNivel = useNivelStore()
const $q = useQuasar()
let filter = ref('')
let errores = ref([])



function decodeJWT(token) {
  try {
    const decodedToken = VueJwtDecode.decode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}
const token = dataProgram.informacionToken
console.log(token);

const decodedToken = decodeJWT(token);

if (decodedToken) {
  console.log('Token decodificado:', decodedToken);
  redConocimiento.value = decodedToken.redConocimiento.denominacion;

} else {
  console.log('No se pudo decodificar el token.');
}

// ---------------------------------------------------------------------------------------CODIGO


const columns = [
  { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
  { name: 'denominacion', align: 'center', label: 'Denominación', field: "denominacionPrograma", sortable: true },
  { name: 'nivel', align: 'center', label: 'Nivel de Formación', field: 'nivelFormacion' },
  { name: 'version', align: 'center', label: 'Versión', field: 'version', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

const pagination = ref({
  rowsPerPage: 6
})

buscar()
buscarNiveles()

async function buscar() {
  programas.value = await usePrograma.getProgramas();
  // console.log(programas.value);
  programas.value.reverse()
}

async function buscarNiveles() {
  niveles.value = await useNivel.buscarNiveles();
  // console.log(niveles.value);
}

function nuevo() {
  bd.value = 1;
  vaciar();
}

function vaciar() {
  codigo.value = "";
  denominacion.value = "";
  nivel.value = "";
  version.value = ""

}

function validarVacios() {
  if (codigo.value === "" && denominacion.value === "" && nivel.value === "" && version.value === "") {
    $q.notify({
      message: 'Campos vacíos',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: Math.random() * 3000
    })
  } else return true
}

function validar() {
  $q.notify({
    message: errores,
    color: 'negative',
    position: 'top',
    icon: 'warning',
    timeout: Math.random() * 3000
  })
}

async function agregarP() {
  console.log("entro a agregar");
  await usePrograma.agregarProgramaFormacion({
    codigo: codigo.value,
    denominacionPrograma: denominacion.value,
    nivelFormacion: nivel.value,
    version: version.value
  }).then(() => {
    agregar.value = false
    $q.notify({
      message: 'Programa de formación agregado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscar();
  }).catch((error) => {
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
      })
    } else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  });
}

function editarPrograma(x) {
  console.log("Entró a editar", x);
  bd.value = 0;
  id.value = x._id;
  codigo.value = x.codigo;
  denominacion.value = x.denominacionPrograma;
  nivel.value = x.nivelFormacion._id;
  version.value = x.version;
  agregar.value = true;
}
async function actualizar() {
  await usePrograma.actualizarProgramaFormacion(
    id.value,
    codigo.value,
    denominacion.value,
    nivel.value,
    version.value
  ).then(() => {
    agregar.value = false
    $q.notify({
      message: 'Programa de formación editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscar();

  }).catch((error) => {
    errores.value = ''
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
      })
    }
    else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  })
}

async function editarEstado(x) {
  console.log("entre a editar estado", x.estado);
  try {
    if (x.estado === 1) {
      x.estado = 0
    } else {
      x.estado = 1
    }
    const res = await usePrograma.cambiarEstado(x._id, x.estado)
    $q.notify({
      message: 'Estado editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscar()

  } catch (error) {
    console.log(error);
  }
}

async function informacionPrograma(x) {
  dataProgram.informacionPrograma = [];
  let codigo = x.codigo;
  console.log(codigo);

  try {
    const response = await axios.get(`${LinkBD}/api/programasFormacion/traer/${codigo}`);

    if (response.data && response.data.denominacionPrograma) {
      dataProgram.informacionPrograma.push(response.data);
      console.log('informacion programa de formacion');
      console.log(dataProgram.informacionPrograma[0]);
      return dataProgram.informacionPrograma[0]; // Devolver los datos
    } else {
      console.error('El objeto recibido no tiene la estructura esperada.');
      return null; // Devolver null si no hay datos
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener la información');
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
</style>