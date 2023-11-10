<template>
  <div>
    <div class="text-h4 text-center q-mt-md">Instructores</div>
    <div class="spinner-container" v-if="loading">
      <q-spinner style="margin-left: 10px" color="black" size="7em" :thickness="10" />
    </div>
    <q-page v-else class="q-pa-md">
      <div class="q-pa-md" style="width: 100%">
        <q-table title="Treats" :rows="usuarios" :columns="columns" row-key="cedula">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                style="margin-left: 10px; cursor: pointer" />
              <q-icon color="red" name="fa-solid fa-trash-alt fa-xl" size="20px"
                style="margin-left: 10px; cursor: pointer" @click="Modeliminar" />
            </q-td>
          </template>

          <!--
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <span class="text-green" v-if="props.row.estado == 1"
                  >Activo</span
                >
                <span class="text-red" v-else>Inactivo</span>
              </q-td>
            </template> -->

          <template v-slot:top-right>
            <q-input color="secondary" dense debounce="300" v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-left>
            <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="Modagregar" />
          </template>
        </q-table>
      </div>
    </q-page>

    <q-dialog v-model="modalAgg">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar Instructor</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <div class="q-mb-md">


              <select name="" id="" v-model="instructor">

                <option  :value="a._id" v-for="a in instructores" :key="a"  >
                  <small> 
                    <b>
                      {{a.nombre}} 
                      {{a.apellidos}} 

                    </b>

                  </small>

                </option>

                <option v-if="instructores.length === 0" value="" disabled>
                  No hay instructores dispnibles en este momento
                </option>
              </select>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn @click="agregarInstructor()" color="secondary" label="Agregar" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalEliminar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Eliminar Instructor</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="text-h5 text-center q-mt-md">
            ¿Esta seguro que desea eliminar a '**+** ' de la lista de
            instructores ?
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Confirmar" />
          <q-btn color="negative" label="Rechazar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import VueJwtDecode from "vue-jwt-decode";
import { useUserStore } from "../almacenaje/informacion.js";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const $q = useQuasar();
let router = useRouter()
let modalAgg = ref();
let filter = ref();
let modalEliminar = ref();
let instructor = ref('');
let loading = ref(false);
const dataProgram = useUserStore();
let usuarios = ref([]);
let redConocimiento = ref('')
let instructores = ref([]);
let arrayInstructores =[]
const useUsuari = useUsuarioStore();
const usePrograma = useProgramasFormacionStore();
let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);
let instructoresBd = usePrograma.instructores




const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Instructor",
    field: "nombre",
    sortable: true,
  },
  { name: "Apellidos", label: "Apellidos ", field: "apellidos", sortable: true },
  { name: "correo", label: "Email", field: "correo" },
  { name: "telefono", label: "Telefono", field: "telefono" },
  { name: "estado", label: "Estado ", field: "estado", sortable: true },

  // { name: "opciones", label: "Opciones", field: "opciones" },
];

async function buscar() {
  await usePrograma.informacionPrograma(usePrograma.programa.codigo)
  usuarios.value = usePrograma.programa.instructores
  //console.log(usuarios.value);
}



 async function obtenerInstructores() {
  await useUsuari.buscarUsuarios().then((res) => {
    const nuevosInstructores = res.filter(
      (user) =>
        user.rol.denominacion === "instructor" &&
        user.redConocimiento._id === decodedToken.redConocimiento._id &&
        user.estado === 1
    );

    nuevosInstructores.forEach((nuevoInstructor) => {
      // Comprueba si el nuevo instructor está en instructoresBd
      const encontrado = instructoresBd.find((i) => i._id === nuevoInstructor._id);
      if (encontrado) {
        encontrado.split = true;
      } else {
        instructores.value.push(nuevoInstructor);
      }
    });

    console.log("Nuevos instructores:", instructores.value);
  });
  instructor.value = null; 
}



async function agregarInstructor() {
  console.log('agregar instructor');
  await usePrograma.agregarInstructores( usePrograma.programa._id, instructor.value)
    .then((res) => {
      console.log(res);
      console.log('todo bien');
      informacionPrograma(programaSeleccionado.codigo)
      console.log(instructores.value);

    }).catch((error) => {
      console.log(error);
    })
}

function decodeJWT(token) {
  try {
    const decodedToken = VueJwtDecode.decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}
const token = dataProgram.informacionToken;
const decodedToken = decodeJWT(token);

if (decodedToken) {
  //console.log("Token decodificado:", decodedToken);
  redConocimiento.value = decodedToken.redConocimiento.denominacion;
} else {
  console.log("No se pudo decodificar el token.");
}

async function cargarUsuarios() {
  loading.value = true;
  buscar();
  obtenerInstructores();
  loading.value = false;
}
cargarUsuarios();


function Modagregar() {
  modalAgg.value = true;
}

function Modeliminar() {
  modalEliminar.value = true;
}

const informacionPrograma = async (x) => {
  console.log("--------------- ninformacion programa-");
  console.log(x);
  const res = await usePrograma.informacionPrograma(x).then((res) => {
    router.push("/instructores")
    console.log(res);
    usuarios.value = res.data.instructores
    modalAgg.value = false
    $q.notify({
      message: "instructor agregado correctamente al programa de formacion",
      color: "positive",
      icon: "warning",
      position: "bottom",
      timeout: Math.random() * 3100,
    });
    arrayInstructores.push(instructor.value)
    let objetoAEliminar = instructor.value;

instructores.value.forEach((element, index) => {
  if (element._id === objetoAEliminar) {
    console.log('Elemento encontrado y eliminado:', element);
    instructores.value.splice(index, 1); 
  }

});
  })
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