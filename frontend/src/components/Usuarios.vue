<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h4 text-center q-mb-md">Usuarios</div>
      <div class="q-pa-md" style="width: 100%">
        <div class="spinner-container" v-if="useUsuari.loading === true">
          <q-spinner style="margin-left: 10px" color="black" size="7em" :thickness="10" />
        </div>
        <q-table v-if="useUsuari.loading === false" class="my-sticky-header-table" :separator="separator" bordered
          :filter="filter" :rows="usuarios" :columns="columns" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon title="Detalle de Usuario" name="fa-solid fa-eye" color="primary" size="20px"
                style="margin-right: 25px; cursor: pointer" @click="informacionUsuario(props.row)">
                <q-tooltip>
                  Detalle de Usuario
                </q-tooltip>
              </q-icon>


              <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                style="margin-right: 10px; cursor: pointer" @click="editarUsuario(props.row)">
                <q-tooltip>
                  Editar Usuario
                </q-tooltip>
              </q-icon>
              <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                style="margin-left: 10px; cursor: pointer" v-if="props.row.estado == 0"
                @click="editarEstado(props.row)">
                <q-tooltip>
                  Activar Usuario
                </q-tooltip>
              </q-icon>

              <q-icon title="Cambiar Estado" color="red" name="fa-solid fa-x" size="20px"
                style="margin-left: 10px; cursor: pointer" v-else @click="editarEstado(props.row)">
                <q-tooltip>
                  Desactivar Usuario
                </q-tooltip>
              </q-icon>

            </q-td>
          </template>

          <template v-slot:body-cell-foto="props">
            <q-td :props="props" class="flex-center">
              <q-avatar size="45px">
                <img v-if="props.row.foto === undefined ||
                  props.row.foto === null ||
                  props.row.foto === ''
                " src="../imagenes/usuario.png" alt="imagenes" />
                <img :src="props.row.foto" />
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <span class="text-green" v-if="props.row.estado == 1">Activo</span>
              <span class="text-red" v-else>Inactivo</span>
            </q-td>
          </template>

          <template v-slot:top-right>
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
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
            {{ bd === 0 ? "Editar Usuario" : "Agregar Usuario" }}
          </div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator :style="{ backgroundColor: colorMenu, color: colorLetra }" inset id="separador"
          style="height: 5px; margin-top: 5px" />
        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Cédula*" type="number" v-model="cedula" />
          </div>

          <div class="q-mb-md">
            <q-input label="Nombre*" v-model="nombre" />
          </div>

          <div class="q-mb-md">
            <q-input label="Apellidos*" v-model="apellido" />
          </div>

          <div class="q-mb-md">
            <q-input label="Teléfono*" type="number" v-model="telefono" />
          </div>

          <div class="q-mb-md">
            <q-input label="Correo Electrónico*" v-model="correo" />
          </div>

          <div class="q-mb-md" v-if="bd === 1">
            <q-input label="Contraseña*" v-model="clave" :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>

          <div class="q-mb-md">
            <q-select clearable label="Red de Conocimiento*" v-model="red" :options="redes.map((red) => ({
              label: red.denominacion,
              value: red._id,
            }))
              " emit-value map-options>
            </q-select>
          </div>

          <div class="q-mb-md">
            <div class="q-mb-md">
              <q-file clearable v-model="cv" @update:cv-value="(val) => {
                cv = val[0];
              }
                " label="Hoja de Vida">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>

          <div class="q-mb-md">
            <q-select clearable label="Rol*" v-model="rol" :options="roles.map((rol) => ({
              label: rol.denominacion,
              value: rol._id,
            }))
              " emit-value map-options>
            </q-select>
          </div>

          <div class="q-mb-md">
            <q-input label="Perfil Profesional*" v-model="perfilProfesional" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :loading="loading" v-if="bd == 1"
            label="Agregar" @click="agregarU()" />
          <q-btn :style="{ backgroundColor: colorMenu, color: colorLetra }" :loading="loading" v-else label="Actualizar"
            @click="actualizar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- modal informacion -->
    <q-dialog v-model="infoU">
      <q-card style="width: 45%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar size="100px" class="q-mr-md">
            <img v-if="info.foto === undefined || info.foto == null || info.foto == ''
            " src="../imagenes/usuario.png" alt="imagenes" />
            <img v-else :src="info.foto" />
          </q-avatar>
          <div class="text-h5">{{ info.nombre }} {{ info.apellidos }}</div>

          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator :style="{ backgroundColor: colorMenu, color: colorLetra }" inset id="separador"
          style="height: 5px; margin-top: 5px" />
        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <p>
              <b>No. de documento:</b>
              {{ info.cedula }}
            </p>
          </div>

          <div class="q-mb-md">
            <p>
              <b>Teléfono:</b>
              {{ info.telefono }}
            </p>
          </div>

          <div class="q-mb-md">
            <p>
              <b>Correo electrónico:</b>
              {{ info.correo }}
            </p>
          </div>

          <div class="q-mb-md">
            <p>
              <b>Red de Conocimiento:</b>
              {{ info.redConocimiento.denominacion }}
            </p>
          </div>

          <div class="q-mb-md">
            <p>
              <b>Rol de usuario:</b>
              {{ info.rol.denominacion }}
            </p>
          </div>

          <div class="q-mb-md">
            <p>
              <b>Perfil Profesional:</b>
              {{ info.perfilProfesional }}
            </p>
          </div>

          <div class="q-mb-md"></div>

          <div class="q-mb-md"></div>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useRolStore } from "../stores/Roles.js";
import { useRedStore } from "../stores/Redes.js";
import { useQuasar } from "quasar";
import { useColorStore } from "../stores/colorSetings.js";
let colores = useColorStore();
let colorMenu = ref("");
let colorLetra = ref("");

onMounted(async () => {
  await colores.traerConfiguracion();
  colorMenu.value = colores.configuracion.colorMenu;
  colorLetra.value = colores.configuracion.colorLetra;
});

let infoU = ref(false);
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
let roles = ref([]);
let redes = ref([]);
let separator = ref("cell");
let id = ref("");
let info = ref([]);
let perfilProfesional = ref("");

let bd = ref("");
const useUsuari = useUsuarioStore();
const useRol = useRolStore();
const useRed = useRedStore();
const $q = useQuasar();
let filter = ref("");
let errores = ref([]);
let loading = ref(false);
let foto = ref("");
let isPwd = ref(true);

function informacionUsuario(x) {
  infoU.value = true;
  info.value = x;
}

const columns = [
  {
    name: "foto",
    align: "center",
    label: "Foto",
    field: "foto",
    sortable: false,
  },
  {
    name: "cedula",
    align: "center",
    label: "Cédula",
    field: "cedula",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellidos",
    align: "center",
    label: "Apellidos",
    field: "apellidos",
    sortable: true,
  },
  {
    name: "redConocimiento",
    align: "center",
    label: "Red de Conocimiento",
    field: (row) => row.redConocimiento.denominacion,
    sortable: true
  },
  { name: "rol", align: "center", label: "Rol", field: (row) => row.rol.denominacion, sortable: true },
  {
    name: "estado",
    align: "center",
    label: "Estado",
    field: "estado",
    sortable: true,
  },
  { name: "opciones", align: "center", label: "Acciones", field: "opciones" },
];

const pagination = ref({
  rowsPerPage: 6,
});

buscarRol();
buscarRed();
buscar();

async function buscar() {
  usuarios.value = await useUsuari.buscarUsuarios();
  usuarios.value.reverse();
}

async function buscarRol() {
  const rolesActivos = await useRol.buscarRoles();
  roles.value = rolesActivos.filter((rol) => rol.estado === 1);
}

async function buscarRed() {
  const redesActivas = await useRed.buscarRedes();
  redes.value = redesActivas.filter((red) => red.estado === 1);
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
  if (
    cedula.value === "" &&
    nombre.value === "" &&
    apellido.value === "" &&
    telefono.value === "" &&
    correo.value === "" &&
    clave.value === "" &&
    red.value === "" &&
    rol.value === "" &&
    perfilProfesional.value === ""
  ) {
    $q.notify({
      message: "Campos vacíos",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: 3000,
    });
  } else return true;
}

function validar() {
  $q.notify({
    message: errores,
    color: "negative",
    position: "top",
    icon: "warning",
    timeout: 3000,
  });
}

function validarFrontendAgregar() {
  const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  if (!cedula.value) {
    $q.notify({
      message: 'La cédula es obligatoria',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (cedula.value.length < 8 || cedula.value.length > 10) {
    $q.notify({
      message: 'La cédula debe tener máximo 10 dígitos',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!nombre.value.trim()) {
    $q.notify({
      message: 'El nombre es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!apellido.value.trim()) {
    $q.notify({
      message: 'Los apellidos son obligatorios',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!telefono.value) {
    $q.notify({
      message: 'El teléfono es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!correo.value.trim()) {
    $q.notify({
      message: 'El correo electrónico es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!emailValido.test(correo.value.trim())) {
    $q.notify({
      message: 'El correo electrónico no es válido',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!clave.value.trim()) {
    $q.notify({
      message: 'La contraseña es obligatoria',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (clave.value.trim().length < 8) {
    $q.notify({
      message: 'La contraseña debe tener al menos 8 caracteres',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!red.value) {
    $q.notify({
      message: 'La red de conocimiento es obligatoria',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!rol.value) {
    $q.notify({
      message: 'El rol de usuario es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!perfilProfesional.value.trim()) {
    $q.notify({
      message: 'El perfil profesional es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else return true
}

async function agregarU() {
  if (validarFrontendAgregar() === true) {
    loading.value = true;
    await useUsuari
      .agregarUsuario({
        foto: foto.value,
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
      })
      .then(() => {
        agregar.value = false;
        $q.notify({
          message: "Usuario agregado exitosamente",
          color: "green",
          icon: "check",
          position: "bottom",
          timeout: 3000,
        });
        buscar();
        vaciar();
      })
      .catch((error) => {
        if (error.response && error.response.data.msg) {
          const repetida = error.response.data.msg;
          $q.notify({
            message: repetida,
            color: "negative",
            position: "top",
            icon: "warning",
            timeout: 3000,
          });
        } else if (
          error.response &&
          error.response.data &&
          validarVacios() === true
        ) {
          errores.value = error.response.data.errors[0].msg;
          validar();
        } else {
          console.log(error);
        }
      });
    loading.value = false;
  }
}

function editarUsuario(x) {
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

function validarFrontendEditar() {
  const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  if (!cedula.value) {
    $q.notify({
      message: 'La cédula es obligatoria',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (cedula.value.length < 8 || cedula.value.length > 10) {
    $q.notify({
      message: 'La cédula debe tener máximo 10 dígitos',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!nombre.value.trim()) {
    $q.notify({
      message: 'El nombre es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!apellido.value.trim()) {
    $q.notify({
      message: 'Los apellidos son obligatorios',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!telefono.value) {
    $q.notify({
      message: 'El teléfono es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!correo.value.trim()) {
    $q.notify({
      message: 'El correo electrónico es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!emailValido.test(correo.value.trim())) {
    $q.notify({
      message: 'El correo electrónico no es válido',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!red.value) {
    $q.notify({
      message: 'La red de conocimiento es obligatoria',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!rol.value) {
    $q.notify({
      message: 'El rol de usuario es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else if (!perfilProfesional.value.trim()) {
    $q.notify({
      message: 'El perfil profesional es obligatorio',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  } else return true
}

async function actualizar() {
  if (validarFrontendEditar() === true) {
    loading.value = true;
    await useUsuari
      .actualizarUsuario(
        id.value,
        cedula.value,
        nombre.value,
        apellido.value,
        telefono.value,
        correo.value,
        red.value,
        cv.value,
        rol.value,
        perfilProfesional.value
      )
      .then(() => {
        agregar.value = false;
        $q.notify({
          message: "Usuario editado exitosamente",
          color: "green",
          icon: "check",
          position: "bottom",
          timeout: 3000,
        });
        buscar();
      })
      .catch((error) => {
        errores.value = "";
        if (error.response && error.response.data.msg) {
          const repetida = error.response.data.msg;
          $q.notify({
            message: repetida,
            color: "negative",
            position: "top",
            icon: "warning",
            timeout: 3000,
          });
        } else if (
          error.response &&
          error.response.data &&
          validarVacios() === true
        ) {
          errores.value = error.response.data.errors[0].msg;
          validar();
        } else {
          console.log(error);
        }
      });
    loading.value = false;
  }
}

async function editarEstado(x) {
  try {
    if (x.estado === 1) {
      x.estado = 0;
    } else {
      x.estado = 1;
    }
    const res = await useUsuari.cambiarEstado(x._id, x.estado);
    $q.notify({
      message: "Estado editado exitosamente",
      color: "green",
      icon: "check",
      position: "bottom",
      timeout: 3000,
    });
    buscar();
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="sass">
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

#card {
  width: 32%;
  height: fit-content;
}

@media screen and (max-width: 600px) {
  #card {
    width: 100%;
  }
}
</style>
