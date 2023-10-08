<template>
  <q-page padding>
    <div class="text-h4 text-center q-mb-md">Desarrollo Curricular</div>
    <div>
      <div class="MatrizCorrelacion">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Matriz de Correlación
          </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />

              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" style="" id="opciones">
                        download
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" id="opciones">
                        border_color
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver matriz de Correlación</small>
      </div>

      <div class="MatrizCorrelacion">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Proyecto Formativo
          </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />

              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" style="" id="opciones">
                        download
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" id="opciones">
                        border_color
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver matriz de Proyecto Formativo</small>
      </div>

      <div class="MatrizCorrelacion">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Planeación Pedagógica
          </q-toolbar-title>

          <q-btn flat round dense>
            <q-btn color="secondary" label="">
              <q-icon name="more_vert" />

              <q-menu max-height="130px">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" style="" id="opciones">
                        download
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <span class="material-symbols-outlined" id="opciones">
                        border_color
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                </q-list>
              </q-menu>
            </q-btn>
          </q-btn>
        </div>
        <small>Ver matriz Planeación Pedagógica fffff</small>
      </div>
    </div>


    <div class="text-h4 text-center q-mb-md" style="margin-top: 3%;">Guías de Aprendizaje</div>
    <!-- guias de aprendizaje -->
    <div class="q-mt-md">
      <div class="MatrizCorrelacion">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Fase de Análisis
          </q-toolbar-title>

          <q-btn flat round dense>
            <router-link to="guiasAprendizaje">
              <span class="material-symbols-outlined" id="ir">bubble</span>
            </router-link>

          </q-btn>
        </div>
        <small>Ver Fase de Análisis</small>
      </div>

      <div class="MatrizCorrelacion">
        <div class="row" id="row">
          <q-toolbar-title class="title">
            Fase de Planeación

          </q-toolbar-title>

          <q-btn flat round dense class="ir">
            <router-link to="guiasAprendizaje">
              <span class="material-symbols-outlined" id="ir">bubble</span>
            </router-link>
          </q-btn>
        </div>
        <small>Ver Fase de Planeación</small>
      </div>
    </div>





  </q-page>
</template>
  
<script setup>
import { ref } from 'vue';
</script>
  
<style scoped>
.MatrizCorrelacion {
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
  