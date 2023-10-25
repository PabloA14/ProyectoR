<template>
  <div>
    <div class="text-h4 text-center q-mt-md">Proyectos</div>
    <div class="spinner-container" v-if="loading">
      <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
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
      <div class="col-12">
        <q-expansion-item
          v-for="proyecto in proyectos.guia"
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
                  {{ proyecto.descripcion || "deberia salir la descripcion " }}
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
                    color="blue"
                    size="24px"
                    style="cursor: pointer"
                    @click="ModeditModal(proyecto)"
                  />
                  <q-icon
                    name="delete"
                    color="red"
                    size="24px"
                    style="cursor: pointer"
                    @click="Modeliminar"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-separator style="height: 5px; margin-top: 5px" color="secondary" />
        </q-expansion-item>
      </div>
      <div class="col-12"></div>
    </div>

    <q-dialog v-model="modalEliminar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Eliminar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="text-h5 text-center q-mt-md">
            ¿Esta seguro que desea eliminar el proyecto ... ?
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Confirmar" />
          <q-btn color="negative" label="Rechazar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalagregar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
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
          <!-- <div class="q-mb-md">
            <q-input label="fecha" type="date" color="secondary" v-model="fecha" />
          </div> -->
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
          <q-btn color="secondary " label="Guardar" @click="agregarProyecto" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modaleditar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Código" color="secondary" v-model="codigoEditar" />
          </div>
          <div class="q-mb-md">
            <q-input
              label="Versión"
              color="secondary"
              v-model="versionEditar"
            />
          </div>
          <div class="q-mb-md">
            <q-input label="Nombre" color="secondary" v-model="nombreEditar" />
          </div>
          <div class="q-mb-md">
            <q-input
              label="Descripción"
              color="secondary"
              v-model="descripcionEditar"
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
          <q-btn color="secondary " label="Guardar" @click="guardarEdicion" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useProyectosStore } from "../stores/proyectos";

const useProyectos = useProyectosStore();
let proyectos = ref([]);
let modaleditar = ref();
let modalagregar = ref();
let modalEliminar = ref();
let searchTerm = ref("");

let codigo = ref();
let version = ref();
let nombre = ref();
let descripcion = ref();
let loading = ref(false);



let codigoEditar = ref();
let versionEditar = ref();
let nombreEditar = ref();
let descripcionEditar = ref();

let documento = ref();

let proyectoSeleccionado = ref(null);
buscar();


async function buscar() {
  loading.value = true;
  try {
    proyectos.value = await useProyectos.buscarProyectos();
    console.log("Proyectos FRON:", proyectos.value);
  } catch (error) {
    console.error("Error al buscar proyectos:", error);
  } finally {
    loading.value = false; // Asegura que el spinner se oculte incluso si hay un error
  }
}




async function agregarProyecto() {
  console.log("entro a agregar");
  await useProyectos.agregarProyecto({
    codigo: codigo.value,
    version: version.value,
    nombre: nombre.value,
    descripcion: descripcion.value,
  });
  modalagregar.value = false;
  codigo.value = "";
  version.value = "";
  nombre.value = "";
  descripcion.value = "";
  buscar();
}

function ModeditModal(proyecto) {
  console.log(`estas en la funcion editar `);
  proyectoSeleccionado.value = proyecto;
  codigoEditar.value = proyecto.codigo;
  versionEditar.value = proyecto.version;
  nombreEditar.value = proyecto.nombre;
  descripcionEditar.value = proyecto.descripcion;
  modaleditar.value = true;
}

function guardarEdicion() {
  const idProyecto = proyectoSeleccionado.value._id;
  console.log("id priycto", idProyecto); // Obtén el ID del proyecto seleccionado
  const nuevosDatos = {
    codigo: codigoEditar.value,
    version: versionEditar.value,
    nombre: nombreEditar.value,
    descripcion: descripcionEditar.value,
  };

  useProyectos
    .editarProyecto(idProyecto, nuevosDatos) // Llama a la función de edición del store
    .then(() => {
      modaleditar.value = false; // Cierra el modal de edición
      buscar(); // Recarga la lista de proyectos
    })
    .catch((error) => {
      console.error("Error al editar proyecto:", error);
      // Manejo de errores, si es necesario
    });
}


function Modeliminar() {
  modalEliminar.value = true;
}

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
