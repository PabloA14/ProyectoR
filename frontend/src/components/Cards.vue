<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-center q-mb-md">{{ nombre }}</div>

    <div class="q-pa-md q-gutter-md">
      <div class="row justify-center">
        <!-- Agregué la clase justify-center para centrar horizontalmente -->
        <q-card class="my-card" id="cardP">
          <router-link to="desarrolloCurricular">

            <q-card-section>
              <div class="text-h6">Desarrollo Curricular</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-img id="img" src="../imagenes/carpeta.png" />
            </q-card-section>
          </router-link>

        </q-card>

        <q-card class="my-card" id="cardP">
          <router-link to="instructores">
            <q-card-section>
              <div class="text-h6">Instructores</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-img id="img" src="../imagenes/carpeta.png" />
            </q-card-section>
          </router-link>
        </q-card>

        <q-card class="my-card" id="cardP">
          <router-link to="ambientesPrograma">
            <q-card-section>
              <div class="text-h6">Ambientes de Formación</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-img id="img" src="../imagenes/carpeta.png" />

            </q-card-section>
          </router-link>
        </q-card>

        <q-card class="my-card" id="cardP">
          <q-card-section>
            <div class="text-h6">Materiales de Formación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/carpeta.png" />
          </q-card-section>
        </q-card>
      </div>

      <div class="row justify-center">
        <!-- Agregué la clase justify-center para centrar horizontalmente -->
        <q-card class="my-card" id="cardP">
          <router-link to="proyecto">
            <q-card-section>
              <div class="text-h6">Proyectos</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-img id="img" src="../imagenes/carpeta.png" />
            </q-card-section>
          </router-link>
        </q-card>

        <q-card class="my-card" id="cardP">
          <router-link to="retroalimetacion">
            <q-card-section>
              <div class="text-h6">Retroalimentación de Red</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-img id="img" src="../imagenes/carpeta.png" />
            </q-card-section>
          </router-link>
        </q-card>

        <q-card class="my-card" id="cardP">
          <q-card-section>
            <div id="img" class="text-h6">Investigación</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/carpeta.png" />
          </q-card-section>
        </q-card>

        <q-card class="my-card" id="cardP">
          <q-card-section>
            <div id="img" class="text-h6">Registro Calificado</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-img id="img" src="../imagenes/carpeta.png" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { useUserStore } from "../almacenaje/informacion.js"
import { ref } from 'vue'
import { watch } from 'vue';
let nombre = ref()

const dataProgram = useUserStore()


function info() {
  console.log('entro a info');

  watch(dataProgram.informacionPrograma, (newValue) => {
    if (newValue && newValue[0]) {
      console.log(newValue[0]);
      nombre.value = newValue[0].denominacionPrograma
    } else {
      console.log('No hay información disponible aún.');
    }
  });
}

info();


// console.log(dataProgram.informacionPrograma[0].cod.denominacionPrograma);
// console.log(dataProgram.informacionPrograma[0].cod.denominacionPrograma);
// console.log(dataProgram.informacionPrograma[0].cod.denominacionPrograma);

</script>

<style scoped>
#cardP {
  margin: 1%;
  background-color: #38a90063;
  text-align: center;
}

#cardP:hover {
  background-color: #38a90094;
  cursor: pointer;
}

#img {
  width: 100%;
  height: 100%;
}
</style>
