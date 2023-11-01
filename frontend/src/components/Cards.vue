<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-center q-mb-md">{{ nombre }}</div>

    <div class="card-container">

      <q-card class="my-card" id="cardP">
        <router-link to="instructores">
          <q-card-section>
            <div class="text-h6">Instructores</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/profesor.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="ambientesPrograma">
          <q-card-section>
            <div class="text-h6">Ambientes de Formación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/formacion.png" />

          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="materialesPrograma">
          <q-card-section>
            <div class="text-h6">Materiales de Formación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/productividad.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="proyecto">
          <q-card-section>
            <div class="text-h6">Proyectos</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/proyecto.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="retroalimentacion">
          <q-card-section>
            <div class="text-h6">Retroalimentación de Red</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/retroalimentacion.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card class="my-card" id="cardP">
        <router-link to="investigacion">
          <q-card-section>
            <div id="img" class="text-h6">Investigación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/analitica.png" />
          </q-card-section>
        </router-link>
      </q-card>

      <q-card v-if="programaSeleccionado.nivelFormacion.denominacion==='Tecnólogo'" class="my-card" id="cardP">
        <router-link to="registroCalificado">
          <q-card-section>
            <div id="img" class="text-h6">Registro Calificado</div>
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

const usePrograma = useProgramasFormacionStore();
let nombre = ref(usePrograma.programa.denominacionPrograma)
let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);

</script>

<style scoped>
#cardP {
  margin: 6%;
  background-color: #38a90063;
  text-align: center;
}

#cardP:hover {
  background-color: #38a90094;
  cursor: pointer;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
</style>
