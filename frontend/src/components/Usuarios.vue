<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mb-md">Usuarios</div>
      <div class="q-pa-md" style="width: 100%;">
        <div class="spinner-container" v-if="useUsuari.loading === true">
          <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
        </div>
        <q-table v-if="useUsuari.loading === false" class="my-sticky-header-table" :separator="separator" bordered
          :filter="filter" :rows="usuarios" :columns="columns" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon title="Detalle de Usuario" name="fa-solid fa-eye"
                color="primary" size="20px" style="margin-right: 25px;cursor: pointer;" />

              <q-icon title="Editar Usuario" color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                style="margin-right: 10px;cursor: pointer;" @click="editarUsuario(props.row)" />
              <q-icon title="Cambiar Estado" color="green" name="fa-solid fa-check fa-xl" size="20px"
                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                @click="editarEstado(props.row)" />
              <q-icon title="Cambiar Estado" color="red" name="fa-solid fa-x" size="20px"
                style="margin-left: 10px;cursor: pointer;" v-else @click="editarEstado(props.row)" />
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado == 1">Activo</span>
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template>

          <template v-slot:body-cell-redConocimiento="props">
            <q-td :props="props">
              <span>{{ props.row.redConocimiento.denominacion }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-rol="props">
            <q-td :props="props">
              <span>{{ props.row.rol.denominacion }}</span>
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
            {{ bd === 0 ? "Editar Usuario" : "Agregar Usuario" }}
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
            <q-input label="Cédula*" type="number" color="secondary" v-model="cedula" />
          </div>

          <div class="q-mb-md">
            <q-input label="Nombre*" color="secondary" v-model="nombre" />
          </div>

          <div class="q-mb-md">
            <q-input label="Apellidos*" color="secondary" v-model="apellido" />
          </div>

          <div class="q-mb-md">
            <q-input label="Teléfono*" type="number" color="secondary" v-model="telefono" />
          </div>

          <div class="q-mb-md">
            <q-input label="Correo Electrónico*" color="secondary" v-model="correo" />
          </div>

          <div class="q-mb-md" v-if="bd == 1">
            <q-input label="Contraseña*" type="password" color="secondary" v-model="clave" />
          </div>

          <div class="q-mb-md">
            <q-select label="Red de Conocimiento*" color="secondary" v-model="red"
              :options="redes.map(red => ({ label: red.denominacion, value: red._id }))" emit-value map-options>
            </q-select>
          </div>

          <div class="q-mb-md">
            <!-- <q-input type="file" @change="archivo" color="secondary" label="Hoja de Vida">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-input> -->
            <input type="file" @change="archivo" />
          </div>

          <div class="q-mb-md">
            <q-select label="Rol*" color="secondary" v-model="rol"
              :options="roles.map(rol => ({ label: rol.denominacion, value: rol._id }))" emit-value map-options>
            </q-select>
          </div>

          <div class="q-mb-md">
            <q-input label="Perfil Profesional*" color="secondary" v-model="perfilProfesional" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :disabled="loading" v-if="bd == 1" label="Agregar" @click="agregarU()" color="secondary" />
          <q-btn :disabled="loading" v-else label="Actualizar" @click="actualizar()" color="secondary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useRolStore } from "../stores/Roles.js"
import { useRedStore } from "../stores/Redes.js"
import { useQuasar } from 'quasar'

let agregar = ref(false);
let cedula = ref("");
let nombre = ref("");
let apellido = ref("");
let telefono = ref("");
let clave = ref("");
let correo = ref("");
let red = ref("");
let cv = ref("");
let rol = ref("");
let usuarios = ref([]);
let roles = ref([])
let redes = ref([])
let separator = ref('cell')
let id = ref("");
let perfilProfesional = ref("");

let bd = ref("");
const useUsuari = useUsuarioStore();
const useRol = useRolStore()
const useRed = useRedStore()
const $q = useQuasar()
let filter = ref('')
let errores = ref([])
let loading = ref(false)


const columns = [
  { name: 'cedula', align: 'center', label: 'Cédula', field: 'cedula', sortable: true },
  { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", format: val => `${val}`, sortable: true },
  { name: 'apellidos', align: 'center', label: 'Apellidos', field: 'apellidos', sortable: true },
  { name: 'redConocimiento', align: 'center', label: 'Red de Conocimiento', field: 'redConocimiento' },
  { name: 'rol', align: 'center', label: 'Rol', field: 'rol' },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

const pagination = ref({
  rowsPerPage: 6
})


buscarRol()
buscarRed()
buscar()


async function buscar() {
  usuarios.value = await useUsuari.buscarUsuarios();
  console.log(usuarios.value);
  usuarios.value.reverse()
}

async function buscarRol() {
  roles.value = await useRol.buscarRoles();
  console.log(roles.value);
}

async function buscarRed() {
  redes.value = await useRed.buscarRedes();
  console.log(redes.value);
}


function nuevo() {
  bd.value = 1;
  vaciar();
}

function vaciar() {
  cedula.value = "";
  nombre.value = "";
  apellido.value = "";
  telefono.value = "";
  correo.value = "";
  clave.value = "";
  red.value = "";
  cv.value = "";
  rol.value = "";
  perfilProfesional.value = "";
}

function validarVacios() {
  if (cedula.value === "" && nombre.value === "" && apellido.value === "" && telefono.value === ""
    && correo.value === "" && clave.value === "" && red.value === "" && rol.value === "" && perfilProfesional.value === "") {
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

function archivo(event) {
  cv.value = event.target.files[0]
  console.log(cv.value);
}

async function agregarU() {
  loading.value = true
  console.log("entro a agregar");
  console.log(cv.value);
  await useUsuari.agregarUsuario({
    cedula: cedula.value,
    nombre: nombre.value,
    apellidos: apellido.value,
    telefono: telefono.value,
    correo: correo.value,
    clave: clave.value,
    redConocimiento: red.value,
    hojaDeVida: cv.value,
    rol: rol.value,
    perfilProfesional: perfilProfesional.value,
  }).then(() => {
    agregar.value = false
    $q.notify({
      message: 'Usuario agregado exitosamente',
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
  loading.value = false
}

function editarUsuario(x) {
  console.log("Entró a editar", x);
  bd.value = 0;
  id.value = x._id;
  cedula.value = x.cedula;
  nombre.value = x.nombre;
  apellido.value = x.apellidos;
  telefono.value = x.telefono;
  correo.value = x.correo;
  red.value = x.redConocimiento._id;
  cv.value = x.hojaDeVida;
  rol.value = x.rol._id;
  perfilProfesional.value = x.perfilProfesional;
  agregar.value = true;
}

async function actualizar() {
  loading.value = true
  await useUsuari.actualizarUsuario(
    id.value,
    cedula.value,
    nombre.value,
    apellido.value,
    telefono.value,
    correo.value,
    red.value,
    //cv.value,
    rol.value,
    perfilProfesional.value

  ).then(() => {
    agregar.value = false
    $q.notify({
      message: 'Usuario editado exitosamente',
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
  loading.value = false
}

async function editarEstado(x) {
  console.log("entre a editar estado", x.estado);
  try {
    if (x.estado === 1) {
      x.estado = 0
    } else {
      x.estado = 1
    }
    const res = await useUsuari.cambiarEstado(x._id, x.estado)
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
</script>

<style lang="sass" >
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 73vh

  .q-table__top,
  .q-table__bottom,

  thead tr:first-child th
    /* bg color is important for th; just specify one */

  thead tr th
    position: sticky
    z-index: 1
    background-color: white
    font-weight: bold
    font-size: 13px /* Font size for table headers */
    text-align: center /* Center-align text in table headers */

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
    cursor: pointer

</style>

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