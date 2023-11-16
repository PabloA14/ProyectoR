<template>
  <q-page padding>

    <q-breadcrumbs separator=">">
      <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
      <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
      <q-breadcrumbs-el to="/desarrolloCurricular" label="Desarrollo Curricular" />
      <q-breadcrumbs-el to="/guiasAprendizaje">Fase de {{ useGuia.guia.fase }}</q-breadcrumbs-el>
      <q-breadcrumbs-el :label="useGuia.guia.nombre" />
    </q-breadcrumbs><br>

    <div class="spinner-container" v-if="instrumento === true && useInst.loading === true">
      <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
    </div>

    <div class="spinner-container" v-if="material === true && useMatApoyo.loading === true">
      <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
    </div>
    <div class="row q-mt-md">
      <div class="col"></div>
      <div class="col">
        <q-btn flat outlined color="secondary" label="Instrumentos de Evaluación" class="btn"
          @click="instrumento = true, material = false" />
      </div>
      <div class="col"></div>
      <div class="col">
        <q-btn flat outlined color="secondary" label="Materiales de Apoyo " class="btn"
          @click="instrumento = false, material = true" />

      </div>
      <div class="col"></div>
    </div>

    <!-- TABLA INSTRUMENTOS -->
    <div v-if="instrumento === true && useInst.loading === false">
      <div class="text-h4 text-center q-mb-md q-mt-xl">Instrumentos de Evaluación</div>
      <div class="q-pa-md  q-mt-xl" style="width: 100%">
        <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="instrumentos"
          :columns="columnsInstrumento" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <div class="opciones">

                <q-icon title="Editar Instrumento" color="orange" @click="editarIns(props.row)"
                  name="fa-solid fa-pen-to-square fa-xl" size="25px" style="margin-right: 10px;cursor: pointer;" />

                <a :href="props.row.documento" target="_blank" :class="{ 'disabled-mat': props.row.documento === null }">
                  <q-icon title="Descargar instrumento" color="green" name="fa-solid fa-download" size="25px"
                    style="margin-left: 10px;cursor: pointer;" />
                </a>

              </div>
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
              agregarInst = true;
            nuevoInstrumento();
            " />
          </template>
        </q-table>
      </div>
    </div>


    <!-- TABLA MATERIALES -->
    <div v-if="material === true && useMatApoyo.loading === false">
      <div class="text-h4 text-center q-mb-md q-mt-xl">Materiales de Apoyo</div>

      <div class="q-pa-md  q-mt-xl" style="width: 100%">
        <q-table class="my-sticky-header-table" :separator="separator" bordered :filter="filter" :rows="materiales"
          :columns="columnsMaterial" row-key="name" :pagination="pagination">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <div class="opciones">

                <a :href="props.row.enlace" target="_blank" :class="{ 'disabled-link': props.row.enlace === '' }">
                  <q-icon title="Visitar Link" color="blue" name="fa-solid fa-share" size="25px"
                    style="margin-right: 25px;cursor: pointer;" />
                </a>

                <q-icon title="Editar Material" color="orange" @click="editarMat(props.row)"
                  name="fa-solid fa-pen-to-square fa-xl" size="25px" style="margin-right: 10px;cursor: pointer;" />

                <a :href="props.row.documento" target="_blank" :class="{ 'disabled-mat': props.row.documento === null }">
                  <q-icon title="Descargar material" color="green" name="fa-solid fa-download" size="25px"
                    style="margin-left: 10px;cursor: pointer;" />
                </a>

              </div>
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
              agregarMaterial = true;
            nuevoMaterial();
            " />
          </template>
        </q-table>
      </div>
    </div>

    <!-- Modal MATERIALES -->
    <q-dialog v-model="agregarMaterial">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">

          <div class="text-h6">
            {{ bd === 0 ? "Editar Material" : "Agregar Material" }}
          </div>

          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />

        </q-card-section>

        <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />
        <small style="padding: 4%;">Campos obligatorios*</small>

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

          <!-- <div class="q-mb-md">
            <q-input label="Código*" color="secondary" v-model="codigo" />
          </div> -->

          <div class="q-mb-md">
            <q-input label="Nombre*" color="secondary" v-model="nombre" />
          </div>

          <div class="q-mb-md">
            <q-input label="Enlace" type="url" pattern="https://.*" color="secondary" v-model="enlace" />
          </div>

          <div class="q-mb-md">
            <b>
              <p>Archivo</p>
            </b>
            <input type="file" @change="docMat">
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disabled="loading" color="secondary" v-if="bd == 1" label="Guardar" @click="agregarMat" />
          <q-btn :disabled="loading" color="secondary" v-else label="Actualizar" @click="actualizarMaterial" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal INSTRUMENTOS -->
    <q-dialog v-model="agregarInst">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">

          <div class="text-h6">
            {{ bd === 0 ? "Editar Instrumento" : "Agregar Instrumento" }}
          </div>

          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />

        </q-card-section>

        <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />
        <small style="padding: 4%;">Campos obligatorios*</small>

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

          <!-- <div class="q-mb-md">
            <q-input label="Código*" color="secondary" v-model="codigo" />
          </div> -->

          <div class="q-mb-md">
            <q-input label="Nombre*" color="secondary" v-model="nombreInst" />
          </div>

          <div class="q-mb-md">
            <b>
              <p>Archivo</p>
            </b>
            <input type="file" @change="docInst">
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disabled="loading" color="secondary" v-if="bd == 1" label="Guardar" @click="agregarI" />
          <q-btn :disabled="loading" color="secondary" v-else label="Actualizar" @click="actualizarInstrumento" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInstrumento } from "../stores/Instrumentos.js"
import { usegiasStore } from "../stores/guias"
import { useApoyo } from "../stores/MaterialesApoyo.js"
import { useQuasar } from 'quasar'
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"

const usePrograma = useProgramasFormacionStore()
let material = ref('')
let instrumento = ref('')
let instrumentos = ref([])
let materiales = ref([])
let filter = ref('')
let separator = ref('cell')
let useInst = useInstrumento()
let useMatApoyo = useApoyo()
let useGuia = usegiasStore()

onMounted(() => {
  instrumento.value = true
})

console.log(useGuia.guia);

const agregarMaterial = ref(false)
let loading = ref(false)
const $q = useQuasar()
let errores = ref([])
let bd = ref('')

//variables materiales

let idMat = ref('')
//let codigo = ref('')
let nombre = ref('')
let enlace = ref('')
let documentoMat = ref('')

//variables instrumentos
let nombreInst = ref('')
let idIns = ref('')
let documentoIns = ref('')
let agregarInst = ref(false)

const columnsInstrumento = [
  { name: "nombre", label: "Nombre", sortable: true, field: 'nombre', align: 'center' },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

const columnsMaterial = [
  { name: "nombre", label: "Nombre", sortable: true, field: 'nombre', align: 'center' },
  { name: "opciones", label: "Opciones", field: "opciones", sortable: false, align: 'center' },
];

const pagination = ref({
  rowsPerPage: 6
})

buscarMaterialesApoyo()
buscarInstrumentos()

function vaciarInst() {
  //codigo.value = ""
  nombreInst.value = ""
  documentoIns.value = ""
}

function nuevoInstrumento() {
  bd.value = 1;
  vaciarInst();
}

let instrumentosFiltrados = computed(() => {
  return instrumentos.value.filter(
    (x) => x.guia._id === useGuia.guia._id
  );
});

let materialesFiltrados = computed(() => {
  return materiales.value.filter(
    (x) => x.guia._id === useGuia.guia._id
  );
})

async function buscarInstrumentos() {
  try {
    instrumentos.value = await useInst.buscarInstrumentos()
    instrumentos.value.reverse()
    console.log(instrumentos.value);
  } catch (error) {
    console.log(error);
  }
}

function docInst(event) {
  documentoIns.value = event.target.files[0]
  console.log(documentoIns.value);
}

async function agregarI() {
  console.log("entro a agregar");
  loading.value = true
  await useInst.agregarInstrumento({
    //codigo: codigo.value,
    nombre: nombreInst.value,
    documento: documentoIns.value,
    guia: useGuia.guia._id
  }).then(() => {
    agregarInst.value = false
    $q.notify({
      message: 'Instrumento de evaluación agregado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscarInstrumentos();
  }).catch((error) => {
    console.log(error);
    if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else if (error.response.data.error) {
      $q.notify({
        message: 'falta archivo',
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
      })
    } else {
      console.log(error);
    }
  })
  loading.value = false
}

function editarIns(i) {
  console.log("Entró a editar", i);
  bd.value = 0;
  idIns.value = i._id;
  //codigo.value = i.codigo
  nombreInst.value = i.nombre
  documentoIns.value = i.documento
  agregarInst.value = true;
}

async function actualizarInstrumento() {
  loading.value = true
  await useInst.actualizarInstrumento(
    idIns.value,
    //codigo.value,
    nombreInst.value,
    documentoIns.value
  ).then(() => {
    agregarInst.value = false
    $q.notify({
      message: 'Instrumento de evaluación editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscarInstrumentos();

  }).catch((error) => {
    errores.value = ''
    if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  })
  loading.value = false
}

//MATERIALES

function vaciarMat() {
  //codigo.value = ""
  nombre.value = ""
  enlace.value = ""
  documentoMat.value = ""
}

function nuevoMaterial() {
  bd.value = 1;
  vaciarMat();
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

async function buscarMaterialesApoyo() {
  try {
    materiales.value = await useMatApoyo.buscarMatApoyo()
    materiales.value.reverse()
    console.log(materiales.value);
  } catch (error) {
    console.log(error);
  }
}

function docMat(event) {
  documentoMat.value = event.target.files[0]
  console.log(documentoMat.value);
}

async function agregarMat() {
  console.log("entro a agregar");
  loading.value = true
  await useMatApoyo.agregarMatApoyo({
    //codigo: codigo.value,
    nombre: nombre.value,
    enlace: enlace.value,
    documento: documentoMat.value,
    guia: useGuia.guia._id
  }).then(() => {
    agregarMaterial.value = false
    $q.notify({
      message: 'Material de Apoyo agregado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscarMaterialesApoyo();
  }).catch((error) => {
    console.log(error);
    if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else if (error.response.data.error) {
      $q.notify({
        message: 'falta archivo',
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
      })
    } else {
      console.log(error);
    }
  })
  loading.value = false
}

function editarMat(i) {
  console.log("Entró a editar", i);
  bd.value = 0;
  idMat.value = i._id;
  //codigo.value = i.codigo
  nombre.value = i.nombre
  enlace.value = i.enlace
  documentoMat.value = i.documento
  agregarMaterial.value = true;
}

async function actualizarMaterial() {
  loading.value = true
  await useMatApoyo.actualizarMatApoyo(
    idMat.value,
    //codigo.value,
    nombre.value,
    enlace.value,
    documentoMat.value
  ).then(() => {
    agregarMaterial.value = false
    $q.notify({
      message: 'Material de apoyo editado exitosamente',
      color: 'green',
      icon: 'check',
      position: 'bottom',
      timeout: Math.random() * 3000
    })
    buscarMaterialesApoyo();

  }).catch((error) => {
    errores.value = ''
    if (error.response && error.response.data) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  })
  loading.value = false
}


</script>


<style scoped>
.disabled-link {
  pointer-events: none;
  /* Desactiva eventos de puntero (clic, hover, etc.) */
  opacity: 0.5;
  /* Puedes ajustar la opacidad según tus preferencias */
  cursor: not-allowed;
}

.disabled-mat {
  pointer-events: none;
  /* Desactiva eventos de puntero (clic, hover, etc.) */
  opacity: 0.5;
  /* Puedes ajustar la opacidad según tus preferencias */
  cursor: not-allowed;
}

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

.card {
  width: 32%;
  height: fit-content;
}

@media screen and (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>