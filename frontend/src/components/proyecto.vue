<template>
  <div class="q-mt-md">
    <q-breadcrumbs separator=">" >
      <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
      <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
      <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
      <q-breadcrumbs-el to="/proyecto" label="Proyectos del programa" />
  </q-breadcrumbs><br>

    <div class="text-h4 text-center q-mt-md">Proyectos</div>
    <div class="spinner-container" v-if="loading">
      <q-spinner
        style="margin-left: 10px"
        color="black"
        size="7em"
        :thickness="10"
      />
    </div>
    <div v-else>
      <div class="row q-ma-lg"></div>
      <div class="row" id="pro">
        <div class="col-6">
          <q-input
            v-model="searchTerm"
            debounce="300"
            placeholder="Buscar..."
            dense
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-4"></div>
        <div class="col-2 text-right">
          <q-btn
            class="text-right"
            color="secondary"
            label="Agregar"
            icon="add"
            @click="Modagg"
          />
        </div>
      </div>

      <div class="row" id="pro">
        <div class="col-12 q-mt-xl">
          <q-expansion-item
            v-for="proyecto in invesFiltradas"
            :key="proyecto._id"
            style="max-width: 100%"
            expand-separator
            icon="perm_identity"
            :label="`Código: ${proyecto.codigo || 'deberia salir el codigo'}`"
            :caption="`Proyecto: ${
              proyecto.nombre || 'deberia salir el nombre del proyecto'
            }`"
          >
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-11">
                    <b>Descripcion: </b>
                    {{
                      proyecto.descripcion || "deberia salir la descripcion "
                    }}
                    <br />
                    <b>version:</b>
                    {{ proyecto.version }}
                    <br />
                    <b>fecha:</b>
                    {{ proyecto.fecha }}
                    <br />
                    <b>documento:</b>
                    {{ proyecto.documento }}
                  </div>
                  <div class="col-1 text-right">
                    <q-icon
                      name="edit"
                      color="red"
                      size="24px"
                      style="cursor: pointer"
                      @click="ModeditModal(proyecto)"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-separator
              style="height: 5px; margin-top: 5px"
              color="secondary"
            />
          </q-expansion-item>
        </div>
        <div class="col-12"></div>
      </div>

      <q-dialog v-model="modalagregar">
        <q-card style="width: 32%; height: fit-content">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Agregar Proyecto</div>
            <q-space />
            <q-btn
              icon="close"
              color="negative"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>

          <q-separator
            inset
            style="height: 5px; margin-top: 5px"
            color="secondary"
          />

          <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
            <div class="q-mb-md">
              <q-input
                label="Código"
                type="number"
                color="secondary"
                v-model="codigo"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                label="Versión"
                type="number"
                color="secondary"
                v-model="version"
              />
            </div>
            <div class="q-mb-md">
              <q-input label="Nombre" color="secondary" v-model="nombre" />
            </div>
            <div class="q-mb-md">
              <q-input
                label="Descripción"
                color="secondary"
                v-model="descripcion"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                label="fecha"
                type="date"
                color="secondary"
                v-model="fecha"
              />
            </div>
            <!-- <div class="q-mb-md">
              <q-file
                label="Archivo"
                type="file"
                color="secondary"
                v-model="documento"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div> -->
          </q-card-section>

          <q-separator />

          <q-card-actions class="flex-center" align="right">
            <q-btn
              color="secondary "
              label="Guardar"
              @click="agregarProyecto"
            />
            <q-btn color="negative" label="Cancelar" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="modaleditar">
        <q-card style="width: 32%; height: fit-content">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Editar Proyecto</div>
            <q-space />
            <q-btn
              icon="close"
              color="negative"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>

          <q-separator
            inset
            style="height: 5px; margin-top: 5px"
            color="secondary"
          />

          <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
            <div class="q-mb-md">
              <q-input
                label="Código"
                color="secondary"
                v-model="codigoEditar"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                label="Versión"
                color="secondary"
                v-model="versionEditar"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                label="Nombre"
                color="secondary"
                v-model="nombreEditar"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                label="Descripción"
                color="secondary"
                v-model="descripcionEditar"
              />
            </div>

            <div class="q-mb-md">
              <q-input
                label="Fecha De Creacion"
                color="secondary"
                type="date"
                v-model="fechaEditar"
              />
            </div>
            <!-- <div class="q-mb-md">
              <q-file label="Archivo" type="file" color="secondary">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div> -->
          </q-card-section>

          <q-separator />

          <q-card-actions class="flex-center" align="right">
            <q-btn
              color="secondary"
              label="Guardar"
              @click="guardarEdicion"
            />

            <q-btn color="negative" label="Cancelar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useProyectosStore } from "../stores/proyectos";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js";
import { useQuasar } from "quasar";


const $q = useQuasar();
const usePrograma = useProgramasFormacionStore();
let programaId = usePrograma.programa._id;

const useProyectos = useProyectosStore();
let proyectos = ref([]);
let modaleditar = ref();
let modalagregar = ref();

let searchTerm = ref("");

let codigo = ref();
let version = ref();
let fecha = ref();
let nombre = ref();
let descripcion = ref();
let loading = ref(false);
let errores =ref([])

let codigoEditar = ref();
let versionEditar = ref();
let nombreEditar = ref();
let fechaEditar = ref();
let descripcionEditar = ref();

// let documento = ref();

let proyectoSeleccionado = ref(null);
buscar();

let invesFiltradas = computed(() => {
  return proyectos.value.filter((x) => x.programa._id === programaId);
});

async function buscar() {
  loading.value = true;
  try {
    await useProyectos.buscarProyectos();
    proyectos.value = useProyectos.proyectoRecuperado;
    console.log("Proyectos  recuperados frontend:", proyectos.value);
  } catch (error) {
    console.error("Error al buscar proyectos:", error);
  } finally {
    loading.value = false; // Asegura que el spinner se oculte incluso si hay un error
  }
}

async function agregarProyecto() {
  loading.value = true;
  console.log("entro a agregar");

  // Agrega tus validaciones personalizadas aquí antes de hacer la llamada a la API
  if (!codigo.value || !version.value || !fecha.value || !nombre.value || !descripcion.value) {
    $q.notify({
      message: "Todos los campos son obligatorios.",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: Math.random() * 3000,
    });
    loading.value = false;
    return;
  }

  await useProyectos
    .agregarProyecto({
      codigo: codigo.value,
      nombre: nombre.value,
      version: version.value,
      descripcion: descripcion.value,
      fecha: fecha.value,
      version: version.value,
      documento: "documento prueba",
      programa: programaId,
    })
    .then(() => {
      modalagregar.value = false;
      codigo.value = "";
      version.value = "";
      nombre.value = "";
      descripcion.value = "";
      $q.notify({
        message: "Proyecto de formación agregado exitosamente",
        color: "green",
        icon: "check",
        position: "bottom",
        timeout: Math.random() * 3100,
      });
      buscar();
    })
    .catch((error) => {
      if (error.response && error.response.data.msg) {
        const repetida = error.response.data.msg;
        $q.notify({
          message: repetida,
          color: "negative",
          position: "top",
          icon: "warning",
          timeout: Math.random() * 3000,
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const errorMsgs = error.response.data.errors.map((err) => err.msg);
        errorMsgs.forEach((errorMsg) => {
          $q.notify({
            message: errorMsg,
            color: "negative",
            position: "top",
            icon: "warning",
            timeout: Math.random() * 3000,
          });
        });
      } else {
        console.log(error);
      }
    });
  loading.value = false;
}



// async function agregarProyecto() {
//   console.log("entro a agregar");
//   await useProyectos.agregarProyecto({
//     codigo: codigo.value,
//     nombre: nombre.value,
//     version: version.value,
//     descripcion: descripcion.value,
//     fecha: fecha.value,
//     version: version.value,
//     documento: "documento prueba",
//     programa: programaId,
//   });
//   modalagregar.value = false;
//   codigo.value = "";
//   version.value = "";
//   nombre.value = "";
//   descripcion.value = "";
//   $q.notify({
//       message: "proyecto agregado correctamente ",
//       color: "positive",
//       icon: "warning",
//       position: "bottom",
//       timeout: Math.random() * 3100,
//     }); 
//   buscar();
// }

function ModeditModal(proyecto) {
  console.log(`estas en la funcion editar `);
  console.log(proyecto);
  proyectoSeleccionado.value = proyecto;
  codigoEditar.value = proyecto.codigo;
  versionEditar.value = proyecto.version;
  nombreEditar.value = proyecto.nombre;
  descripcionEditar.value = proyecto.descripcion;
  fechaEditar.value = proyecto.fecha;
  modaleditar.value = true;
}

async function guardarEdicion() {
  loading.value = true;
  const idProyecto = proyectoSeleccionado.value._id;
  const nuevosDatos = {
    codigo: codigoEditar.value,
    version: versionEditar.value,
    nombre: nombreEditar.value,
    descripcion: descripcionEditar.value,
    fecha: fechaEditar.value,
  };

  if (!nuevosDatos.codigo || !nuevosDatos.version || !nuevosDatos.fecha || !nuevosDatos.nombre || !nuevosDatos.descripcion) {
    $q.notify({
      message: "Todos los campos son obligatorios.",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: Math.random() * 3000,
    });
    loading.value = false;
    return;
  }
 // mira si el código ya está en uso
 const codigoEnUso = proyectos.value.some((proyecto) => proyecto.codigo === nuevosDatos.codigo && proyecto._id !== idProyecto);
  if (codigoEnUso) {
    $q.notify({
      message: "Este código ya está en uso. Por favor, elija otro.",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: Math.random() * 3000,
    });
    loading.value = false;
    return;
  }

  try {
    await useProyectos.editarProyecto(idProyecto, nuevosDatos);
    const proyectoIndex = proyectos.value.findIndex((proyecto) => proyecto._id === idProyecto);
    if (proyectoIndex !== -1) {
      proyectos.value[proyectoIndex] = { ...proyectos.value[proyectoIndex], ...nuevosDatos };
    }
    modaleditar.value = false;
    $q.notify({
      message: "Proyecto editado correctamente",
      color: "positive",
      icon: "check",
      position: "bottom",
      timeout: Math.random() * 3100,
    });
  } catch (error) {
    console.error("Error al editar proyecto:", error);

    if (error.response && error.response.data && error.response.data.errors) {
      const errorMsgs = error.response.data.errors.map((err) => err.msg);
      errorMsgs.forEach((errorMsg) => {
        $q.notify({
          message: errorMsg,
          color: "negative",
          icon: "warning",
          position: "top",
          timeout: Math.random() * 3000,
        });
      });
    } else {
      errores.value.push("Error al editar el proyecto. Por favor, inténtelo de nuevo.");
    }
  }
  loading.value = false;
}



// function guardarEdicion() {
//   const idProyecto = proyectoSeleccionado.value._id;
//   const nuevosDatos = {
//     codigo: codigoEditar.value,
//     version: versionEditar.value,
//     nombre: nombreEditar.value,
//     descripcion: descripcionEditar.value,
//     fecha: fechaEditar.value,
//   };

//   useProyectos
//     .editarProyecto(idProyecto, nuevosDatos)
//     // .then(() => {
//     //   modaleditar.value = false; // Cierra el diálogo de edición
//     //   // Actualiza los datos en la lista de proyectos
//     //   proyectos.value = proyectos.value.map((proyecto) => {
//     //     if (proyecto._id === idProyecto) {
//     //       return { ...proyecto, ...nuevosDatos };
//     //     }
//     //     return proyecto;
//     //   });
//     // })
//     .then(() => {
//       modaleditar.value = false;
//       buscar();
//     })
//     .catch((error) => {
//       console.error("Error al editar proyecto:", error);
//     });
// }

function Modagg() {
  modalagregar.value = true;
}
</script>
<style scoped>
#pro {
  margin: 0 50px;
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
</style>
