<template>
  <q-page padding>

    <q-breadcrumbs separator=">">
      <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
      <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
      <q-breadcrumbs-el to="/desarrolloCurricular" label="Desarrollo Curricular" />
      <q-breadcrumbs-el>Fase de {{ fase }}</q-breadcrumbs-el>
    </q-breadcrumbs><br>

    <div class="text-h4 text-center q-mb-md">Guías de Aprendizaje</div>
    <div class="q-pa-md" style="width: 100%">
      <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="dataGuias"
        :columns="columns" row-key="name" :pagination="pagination">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <div class="opciones">

              <q-icon title="Detalle de Guía" name="fa-solid fa-eye" color="primary" size="25px"
                style="margin-right: 25px;cursor: pointer;" @click="informacionGuia(props.row)" />

              <q-icon v-if="rol === 'gestor'" title="Editar Guía" color="orange" @click="editarGuia(props.row)"
                name="fa-solid fa-pen-to-square fa-xl" size="25px" style="margin-right: 10px;cursor: pointer;" />

              <a :href="props.row.documento" target="_blank">
                <q-icon title="Descargar guía" color="green" name="fa-solid fa-download" size="25px"
                  style="margin-left: 10px;cursor: pointer;" />
              </a>

            </div>
          </q-td>
        </template>

        <!-- ´boton search buscar -->

        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-left>

          <q-btn v-if="rol === 'gestor'" :style="{ backgroundColor: colorMenu, color: colorLetra }" icon="add"
            label="Agregar" class="q-mb-md" @click="mostrarModal = true; nuevo()" />
        </template>
      </q-table>

      <!-- Modal -->
      <q-dialog v-model="mostrarModal">
        <q-card id="card">
          <q-card-section class="row items-center q-pb-none">

            <div class="text-h6">
              {{ bd === 0 ? "Editar Guía" : "Agregar Guía" }}
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
              <q-input label="Nombre*" v-model="nombre" />
            </div>

            <div class="q-mb-md">
              <q-file v-model="archivo" @update:archivo-value="val => { archivo = val[0] }" label="Archivo*">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn :disabled="loading" :style="{ backgroundColor: colorMenu, color: colorLetra }" v-if="bd == 1"
              label="Guardar" @click="agregarN" />
            <q-btn :disabled="loading" :style="{ backgroundColor: colorMenu, color: colorLetra }" v-else
              label="Actualizar" @click="actualizar" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>
 
<style scoped></style>


<script setup>
import { ref, onMounted } from "vue";
import { usegiasStore } from "../stores/guias"
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useDesarrolloCurricular } from "../stores/desarrolloC";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let colorMenu = ref('')
let colorLetra = ref('')

onMounted(async () => {
  await colores.traerConfiguracion()
  colorMenu.value = colores.configuracion.colorMenu
  colorLetra.value = colores.configuracion.colorLetra
})

const useUsuario = useUsuarioStore();
const rol = useUsuario.rol;
const useDesarrollo = useDesarrolloCurricular();
const usePrograma = useProgramasFormacionStore()
let filter = ref('')
let separator = ref('cell')
let Program = ref(usePrograma.programa.desarrolloCurricular.idGuias)
const idPrograma = ref(usePrograma.programa.codigo)
const usegias = usegiasStore()
let dataGuias = ref([])
let bd = ref('')
let id = ref('')
let nombre = ref('')
let archivo = ref('')
const mostrarModal = ref(false);
let loading = ref(false)
const $q = useQuasar()
let router = useRouter()
let errores = ref([])
let fase = ref(usegias.fase);

filterGuias()

function filterGuias() {
  let filtrado = Program.value.filter(a => a.fase === fase.value)
  dataGuias.value = filtrado
}

const pagination = ref({
  rowsPerPage: 6
})

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
    field: 'nombre',
    align: 'center'
  },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

function nuevo() {
  bd.value = 1;
  vaciar();
}

function vaciar() {
  nombre.value = ""
  archivo.value = ""
}

async function agregarN() {
  loading.value = true
  await usegias.agregarGuia({
    nombre: nombre.value,
    documento: archivo.value,
    fase: fase.value

  }).then((res) => {
    useDesarrollo.postProyectoGuias(usePrograma.programa.desarrolloCurricular._id, res.data.guia._id)
    mostrarModal.value = false
    $q.notify({
      message: 'Guía de aprendizaje agregada exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: 3000
    })
    Program.value.push(res.data.guia)
    filterGuias()
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
    } else if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }

  })
  loading.value = false
}

/* async function buscar() {
  try {
    dataGuias.value = await usegias.buscarguia()
  } catch {
    console.error("Error al buscar Guias:");
  }
} */

function editarGuia(g) {
  console.log("Entró a editar", g);
  bd.value = 0;
  id.value = g._id;
  nombre.value = g.nombre;
  archivo.value = g.documento
  mostrarModal.value = true;
}

async function actualizar() {
  loading.value = true
  await usegias.actualizarGuia(
    id.value,
    nombre.value,
    archivo.value,
    idPrograma.value
  ).then((res) => {
    console.log(res);
    mostrarModal.value = false
    $q.notify({
      message: 'Guía de aprendizaje editada exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: 3000
    })
    usePrograma.programa = res.data
    Program.value = res.data.desarrolloCurricular.idGuias
    console.log(Program.value);
    filterGuias()
  }).catch((error) => {
    errores.value = ''
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: 3000
      })
    }
    else if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }

  })
  loading.value = false
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

const informacionGuia = async (x) => {
  id.value = x._id;
  await usegias.informacionGuia(id.value)
  router.push("/infoGuia")
}

</script>

<style scoped>
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
 