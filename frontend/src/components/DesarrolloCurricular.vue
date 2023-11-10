<template>
  <q-page padding>
    <div class="text-h4 text-center q-mb-md">Desarrollo Curricular</div>
    <div>
      <!-- matriz correlacion -->
      <div class="menus  q-mt-xl">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Matriz de Correlación
          </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />
              <!-- opciones -->
              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable v-if="matriz === undefined && rol === 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="font-size: 4vh;"
                        @click="agregarMatriz(); agregar = true">add</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="matriz === undefined && rol === 'instructor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" @click="matrizNull()" style="
                    font-size: 7vh;
                    color: rgb(0, 0, 0);
                  ">priority_high</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="matriz != undefined">
                    <q-item-section>
                      <a target="_blank" :href="matriz" style="text-align: center;font-size: 5vh;color: black;">
                        <span class="material-symbols-outlined">download</span>
                      </a>

                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="matriz != undefined && rol == 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="
                    font-size: 5vh;text-align: center;
                    color: rgb(0, 0, 0);

                  ">edit</span>
                    </q-item-section>
                  </q-item>


                  <q-separator />
                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver Matriz de Correlación</small>
      </div>
      <!-- proyecto formativo -->
      <div class="menus">
        <div class="row" id="row">
          <q-toolbar-title class="title">Proyecto Formativo </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />

              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable v-if="proyectoFormativo === undefined && rol === 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="font-size: 4vh;"
                        @click="addProyecto(); agregar = true">add</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo === undefined && rol === 'instructor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" @click="proyectoNull()" style="
                    font-size: 4vh;
                  ">priority_high</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo != undefined">
                    <q-item-section>
                      <a target="_blank" :href="proyectoFormativo"
                        style="text-align: center;font-size: 4vh">
                        <span class="material-symbols-outlined">download</span>
                      </a>

                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo != undefined && rol == 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="
                    font-size: 4vh;text-align: center;
                  ">edit</span>
                    </q-item-section>
                  </q-item>


                  <q-separator />
                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver Proyecto Formativo</small>
      </div>

      <!-- planeación pedagogica -->
      <div class="menus">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Planeación Pedagógica
          </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />
              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable v-if="proyectoFormativo === undefined && rol === 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="font-size: 4vh;"
                        @click="addProyecto(); agregar = true">add</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo === undefined && rol === 'instructor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" @click="proyectoNull()" style="
                    font-size: 4vh;
                  ">priority_high</span>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo != undefined">
                    <q-item-section>
                      <a target="_blank" :href="proyectoFormativo"
                        style="text-align: center;font-size: 4vh">
                        <span class="material-symbols-outlined">download</span>
                      </a>

                    </q-item-section>
                  </q-item>

                  <q-item clickable v-if="proyectoFormativo != undefined && rol == 'gestor'">
                    <q-item-section>
                      <span class="material-symbols-outlined" style="
                    font-size: 4vh;text-align: center;
                  ">edit</span>
                    </q-item-section>
                  </q-item>


                  <q-separator />
                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver Planeación Pedagógica</small>
      </div>
    </div>

    <div class="text-h4 text-center q-mb-md" style="margin-top: 9%">
      Guías de Aprendizaje
    </div>
    <!-- guias de aprendizaje -->
    <div class="q-mt-xl  ">
      <div class="menus">
        <div class="row" id="row">
          <q-toolbar-title class="title"> Fase de Análisis </q-toolbar-title>

          <q-btn flat round dense>
            <router-link to="guiasAprendizaje">
              <span class="material-symbols-outlined" id="ir">bubble</span>
            </router-link>
          </q-btn>
        </div>
        <small>Ver Fase de Análisis</small>
      </div>

      <div class="menus">
        <div class="row" id="row">
          <q-toolbar-title class="title"> Fase de Planeación </q-toolbar-title>

          <q-btn flat round dense class="ir">
            <router-link to="guiasAprendizaje">
              <span class="material-symbols-outlined" id="ir">bubble</span>
            </router-link>
          </q-btn>
        </div>
        <small>Ver Fase de Planeación</small>
      </div>

      <div class="menus">
        <div class="row" id="row">
          <q-toolbar-title class="title"> Fase de Ejecución </q-toolbar-title>

          <q-btn flat round dense class="ir">
            <router-link to="guiasAprendizaje">
              <span class="material-symbols-outlined" id="ir">bubble</span>
            </router-link>
          </q-btn>
        </div>
        <small>Ver Fase de ejecucion</small>
      </div>
    </div>

    <div class="menus">
      <div class="row" id="row">
        <q-toolbar-title class="title"> Fase de Evaluación </q-toolbar-title>

        <q-btn flat round dense class="ir">
          <router-link to="guiasAprendizaje">
            <span class="material-symbols-outlined" id="ir">bubble</span>
          </router-link>
        </q-btn>
      </div>
      <small>Ver Fase de evaluación</small>
    </div>

    <q-dialog v-model="agregar">
      <q-card style="width: 40%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{
              inf === 0
              ? "Agregar Matriz De Correlación"
              : inf === 1
                ? "Agregar Proyecto Formativo"
                : "Agregar Planeación Pedagógica"
            }}
          </div>

          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />
        <q-card-section style="max-height: 65vh" class="scroll">
          <div class="q-mb-md">
            <input type="file" @change="archivoM" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-if="inf === 0" label="Agregar M " @click="guardarMatriz()" color="secondary" />
          <q-btn v-if="inf === 1" label="Agregar P" @click="saveProyecto()" color="secondary" />
          <q-btn v-if="inf === 2" label="Agregar -" @click="savePlaneacionPedagogica()" color="secondary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js";
import { useDesarrolloCurricular } from "../stores/desarrolloC.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { ref } from "vue";
const useUsuario = useUsuarioStore();
let agregado = ref('')
let usePrograma = useProgramasFormacionStore();
let router = useRouter();
let agregar = ref();
const rol = useUsuario.rol;
console.log(rol)
const useDesarrollo = useDesarrolloCurricular();
let useInfoPrograma = useProgramasFormacionStore();
let inf = ref("");
const $q = useQuasar();
let archivo = ref("");
let matriz = ref(useInfoPrograma.programa.desarrolloCurricular.matrizcorrelacion);
console.log(matriz.value);
let proyectoFormativo = ref(useInfoPrograma.programa.desarrolloCurricular.proyectoFormativo);
console.log(proyectoFormativo.value);
let planeacionPedagogica = ref(useInfoPrograma.programa.desarrolloCurricular.planeacionPedagogica);
let _id = ref(useInfoPrograma.programa.desarrolloCurricular._id);
let codigo = ref(useInfoPrograma.programa.codigo);

console.log(usePrograma.programa);

function archivoM(event) {
  archivo.value = event.target.files[0];
  console.log(archivo.value);
}
function agregarMatriz() {
  agregar.value = true;
  inf.value = 0;
}

function addProyecto() {
  inf.value = 1
}

function addplaneacionPedagogica() {
  inf.value = 2

}

async function guardarMatriz() {
  try {
    const res = await useDesarrollo.postMatriz(_id.value, archivo.value);
    console.log(res);
    if (res.data.status === "ok") {
      console.log(res)
      agregado.value = "Matriz de Correlación"
      informacionPrograma(codigo.value);
      console.log(codigo.value);
    } else {
      console.log("no estuvo ok");
    }
  } catch (error) {
    console.error(error);
  }
}

async function saveProyecto() {
  try {
    const res = await useDesarrollo.putProyecto(_id.value, archivo.value);
    console.log(res);
    console.log("------------------------------");
    if (res.data.status === "ok") {
      agregado.value = 'Proyecto Formativo'
      informacionPrograma(codigo.value);
      console.log(codigo.value);
    } else {
      console.log("no estuvo ok");
    }
  } catch (error) {
    console.error(error);
  }
}

async function savePlaneacionPedagogica() {
  try {
    const res = await useDesarrollo.putplaneacionPedagogica(_id.value, archivo.value);
    console.log(res);
    if (res.data.status === "ok") {
      agregado.value = 'Planeación Pedagógica'
      informacionPrograma(codigo.value);
      console.log(codigo.value);
    } else {
      console.log("no estuvo ok");
    }
  } catch (error) {
    console.error(error);
  }
}

async function informacionPrograma(x) {
  codigo.value = x;
  console.log(codigo.value);
  const a = await usePrograma.informacionPrograma(codigo.value);
  agregar.value = false
  router.push("/InformacionPrograma")
  router.push("/desarrolloCurricular")
    .then(() => {
      $q.notify({
        message: ` ${agregado.value} Agregado Correctamente `,
        color: "green",
        icon: "check",
        position: "bottom",
        timeout: Math.random() * 3000,
      });
      console.log("..................................");
      console.log(a);
      console.log(a.data.desarrolloCurricular.matrizcorrelacion)

      if (a.data.desarrolloCurricular.matrizcorrelacion != undefined) {
        matriz.value = a.data.desarrolloCurricular.matrizcorrelacion
        console.log('----------- matriz correlacion-----')
        console.log(matriz.value)
      }
      if (a.data.desarrolloCurricular.planeacionPedagogica != undefined) {
        planeacionPedagogica.value = a.data.desarrolloCurricular.planeacionPedagogica
        console.log(planeacionPedagogica.value)
        console.log('------- desarrollo curricular---------')
      }
      if (a.data.desarrolloCurricular.proyectoFormativo != undefined) {
        console.log('-------proyecto formativo---------')
        proyectoFormativo.value = a.data.desarrolloCurricular.proyectoFormativo
      }

    })
    .catch((error) => {
      console.log(error);
    });
}


function matrizNull() {
  $q.notify({
    message: ` El programa aún no tiene matriz de correlación `,
    color: "negative",
    icon: "warning",
    position: "top",
    timeout: Math.random() * 3500,
  });
}

function proyectoNull() {
  $q.notify({
    message: ` El programa aún no tiene proyecto formativo `,
    color: "negative",
    icon: "warning",
    position: "top",
    timeout: Math.random() * 3500,
  });

}

function planeacionNull() {
  $q.notify({
    message: ` El programa aún no tiene planeación pedagógica `,
    color: "negative",
    icon: "warning",
    position: "top",
    timeout: Math.random() * 3500,
  });
}
</script>

<style scoped>
.menus {
  padding: 2vh;
  background-color: white;
}

#opciones {
  font-size: 4vh;
}

.title {
  border-bottom: solid 2px rgba(128, 128, 128, 0.174);
  font-weight: 800;
}

#ir {
  border: solid;
  padding: 2vh;
  border-radius: 5px;
  width: 8vh;
  height: 6vh;
  background-color: #39a900;
  color: white;
  font-size: 3.8vh;
}
</style>