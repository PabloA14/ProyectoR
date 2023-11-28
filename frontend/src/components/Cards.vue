<template>
  <q-page class="q-pa-md">
    <q-breadcrumbs separator=">">
      <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
      <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
      <q-breadcrumbs-el label="Gestionar Programa" />
    </q-breadcrumbs><br>

    <div class="text-h4 text-center q-mb-md">
      <b style="text-transform:capitalize;">{{ nombre }}</b>
    </div>

    <div class="card-container q-mt-xl">

      <q-card class="my-card" id="cardP">
        <router-link to="instructores" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Instructores</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/profesor.png" />
          </q-card-section>
        </router-link>
      </q-card>


      <q-card class="my-card" id="cardP">
        <router-link to="ambientesPrograma" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name" style="text-decoration: none;">Ambientes de Formación</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/formacion.png" />
          </q-card-section>
        </router-link>
      </q-card>


      <q-card class="my-card" id="cardP">
        <router-link to="materialesPrograma" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Materiales de Formación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/productividad.png" />
          </q-card-section>
        </router-link>
      </q-card>


      <q-card class="my-card" id="cardP">
        <router-link to="proyecto" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Proyectos</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/proyecto.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="investigacion" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Investigación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/analitica.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="retroalimentacion" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Retroalimentación de Red</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/evaluacion.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card v-if="programaSeleccionado.nivelFormacion.denominacion === 'Tecnólogo'" class="my-card" id="cardP">
        <router-link to="registroCalificado" class="cardP">
          <q-card-section>
            <div class="text-h6" id="name">Registro Calificado</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/certificado.png" />
          </q-card-section>
        </router-link>
      </q-card>


    </div><br>
  </q-page>
</template>


<script setup>
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { ref } from 'vue'
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let colorMenu = ref('')
let colorLetra = ref('')

onMounted(async () => {
  await colores.traerConfiguracion()
  colorMenu.value = colores.configuracion.colorMenu
  colorLetra.value = colores.configuracion.colorLetra
})

const usePrograma = useProgramasFormacionStore();
let nombre = ref(usePrograma.programa.denominacionPrograma)
let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);


</script>

<style scoped>
.cardP {
  text-decoration: none;
  font-size: 15%;
}

#name {
  font-weight: 800;
  color: black;

}

#cardP {
  margin: 6%;
  background-color: #38a90063;
  text-align: center;
}

#cardP:hover {
  background-color: v-bind(colorMenu);
  cursor: pointer;
  box-shadow: 0px 0px 20px 5px #38a900d5;

}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
</style>
