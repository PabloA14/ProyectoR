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

              <q-icon title="Editar Guía" color="orange" @click="editarGuia(props.row)"
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
          <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-left>

          <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="mostrarModal = true; nuevo()" />
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

          <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

          <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

            <div class="q-mb-md">
              <q-input label="Código*" color="secondary" v-model="codigo" />
            </div>

            <div class="q-mb-md">
              <q-input label="Nombre*" color="secondary" v-model="nombre" />
            </div>

            <div class="q-mb-md">
              <b>
                <p>Archivo*</p>
              </b>
              <input type="file" @change="doc">
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn :disabled="loading" color="secondary" v-if="bd == 1" label="Guardar" @click="agregarN" />
            <q-btn :disabled="loading" color="secondary" v-else label="Actualizar" @click="actualizar" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>
 
<style scoped></style>


<script setup>
import { ref } from "vue";
import { usegiasStore } from "../stores/guias"
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useDesarrolloCurricular } from "../stores/desarrolloC";
const useUsuario = useUsuarioStore();
const rol = useUsuario.rol;
const useDesarrollo = useDesarrolloCurricular();
const usePrograma = useProgramasFormacionStore()
let IdDesarrollo = ref('')

let filter = ref('')
let separator = ref('cell')

const usegias = usegiasStore()
let dataGuias = ref([])
let bd = ref('')
let id = ref('')
let codigo = ref('')
let nombre = ref('')
let archivo = ref('')
const mostrarModal = ref(false);
let loading = ref(false)
const $q = useQuasar()
let router = useRouter()
let errores = ref([])
let fase = ref(usegias.fase);

const pagination = ref({
  rowsPerPage: 6
})

const columns = [
  {
    name: "codigo",
    label: "Código",
    sortable: true,
    field: 'codigo',
    align: 'center',
    sortable: true
  },
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
    field: 'nombre',
    align: 'center'
  },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

buscar()

async function buscar() {
  try {
    dataGuias.value = await usegias.buscarguia()
    dataGuias.value.reverse()
    console.log("Guias FRON:", dataGuias.value);
    let filtrado = dataGuias.value.filter(a => a.fase === fase.value)
    dataGuias.value = filtrado
  } catch {
    console.error("Error al buscar Guias:");
  }
}

function nuevo() {
  bd.value = 1;
  vaciar();
}

function vaciar() {
  codigo.value = ""
  nombre.value = ""
  archivo.value = ""
}

function doc(event) {
  archivo.value = event.target.files[0]
  console.log(archivo.value);
}

async function agregarN() {
  console.log("entro a agregar");

  loading.value = true
  await usegias.agregarGuia({
    codigo: codigo.value,
    nombre: nombre.value,
    documento: archivo.value,
    fase: fase.value

  }).then((res) => {
    console.log(res);
    let des = useDesarrollo.postProyectoGuias(usePrograma.programa.desarrolloCurricular._id, res.data.guia._id)
    console.log(des);
    mostrarModal.value = false
    $q.notify({
      message: 'Guía de aprendizaje agregada exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscar()
  }).catch((error) => {
    // Para trae las validaciones
    if (error.response && error.response.data.msg) {
      const repetida = error.response.data.msg
      $q.notify({
        message: repetida,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
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

function editarGuia(g) {
  console.log("Entró a editar", g);
  bd.value = 0;
  id.value = g._id;
  codigo.value = g.codigo
  nombre.value = g.nombre,
    archivo.value = g.documento
  mostrarModal.value = true;
}

async function actualizar() {
  loading.value = true
  await usegias.actualizarGuia(
    id.value,
    codigo.value,
    nombre.value,
    archivo.value
  ).then(() => {
    mostrarModal.value = false
    $q.notify({
      message: 'Guía de aprendizaje editada exitosamente',
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
    timeout: Math.random() * 3000
  })
}

const informacionGuia = async (x) => {
  console.log("----------------");
  id.value = x._id;
  console.log(id.value)
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
 