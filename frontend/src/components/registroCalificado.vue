<template>
    <q-page class="q-pa-md">
        <div id="agregar">
            <!-- <q-img id="img" src="../imagenes/formacion.png" /> -->
            <q-btn color="secondary" icon="add" label="Agregar Diseño curricular" class="q-mb-xl"
            @click="(bd = 0, agregar = true)"  
                

                />

        </div>

        <div class="row">
            <div class="centrada" id="card" v-if="card">

                <div class="text-h4 text-center q-mb-md">Registro calificado</div> <br>

                <q-card class="my-card" flat bordered id="csrd2">
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs" id="section">

                            <div class="text-h5 q-mt-sm q-mb-xs">Gestión contable</div> <br>

                            <div class="text-h6 q-mt-sm q-mb-xs">Titulo que otorga:</div>
                            <div class="text-caption text">
                                Tecnologo gestión contable
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Lugar de desarrollo de oferta:</div>
                            <div class="text-caption text">
                                Nombre del lugar
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Metodologia:</div>
                            <div class="text-caption text">
                                Metodilogia
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Numero de creditos:</div>
                            <div class="text-caption text">
                                80 creditos
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Codigo snies:</div>
                            <div class="text-caption text">
                                48596
                            </div>

                        </q-card-section>

                        <q-card-section class="col-5 flex flex-center">

                            aqui va la fecha

                        </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>

                        <q-btn style="float: ; margin: auto auto" color="secondary" icon="download" label="Descargar"
                            class="q-mb-md" />

                        <q-btn style="float: ; margin: auto auto" flat color="primary">
                            Editar
                        </q-btn>

                    </q-card-actions>
                </q-card>
            </div>
        </div>

        <q-dialog v-model="agregar">
            <q-card style="width: 32%; height: fit-content">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                  <!-- {{ bd === 0 ? "Editar Programa" : "Agregar Programa" }} -->
                  Agregar Registro Calificado
                </div>
                <q-space />
                <q-btn icon="close" color="negative" flat round dense v-close-popup />
              </q-card-section>
      
              <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />
      
              <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

                <div class="q-mb-md">
                    <q-input label="Titulo*" type="string" color="secondary" v-model="Titulo" />
                  </div>

                  <div class="q-mb-md">
                    <q-input label="Lugar De Desarrollo*" type="string" color="secondary" v-model="LugarDeDesarrollo" />
                  </div>

                  <div class="q-mb-md">
                    <q-input label="Creditos*" type="string" color="secondary" v-model="Creditos" />
                  </div>

                  <div class="q-mb-md">
                    <q-input label="codigosnies*" type="Number" color="secondary" v-model="codigosnies" />
                  </div>
                  <div class="q-mb-md">
                    <q-input label="Fecha *" type="Date" color="secondary" v-model="codigosnies" />
                  </div>
  
 
              </q-card-section>
      
              <q-separator />
      
              <q-card-actions align="right">
        <!--         <q-btn :disabled="loading" v-if="bd == 1" label="Agregar" @click="agregarP()" color="secondary" />
                <q-btn :disabled="loading" v-else label="Actualizar" @click="actualizar()" color="secondary" /> -->
                <q-btn :disabled="loading" label="Agregar" @click="agregar()" color="secondary" />
            </q-card-actions>
            </q-card>
          </q-dialog>
        


    </q-page>
</template>
    

<script setup>
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { ref } from 'vue'
const usePrograma = useProgramasFormacionStore();
let programaSeleccionado = usePrograma.programa
let registroCalificado = usePrograma.programa.registroCalificado
let card = ref(false)
let bd = ref('')
let agregar = ref(false)
console.log(registroCalificado);

if (registroCalificado == undefined) {
    card.value = false
} else {
    card.value = true

}
/* 
titulo: { type: String, required: true },
    lugadesarrollo: { type: String, required: true },
    metodologia: { type: String, required: true },
    creditos: { type: String, required: true },
    codigosnies: { type: String, required: true },
    fecha: { type: String, required: true },
    documento: { type: String, required: tru */


console.log(programaSeleccionado);



</script>

<style scoped>
#card {
    margin: 0 auto;
    margin-top: auto;
    width: 40%;
}

#csrd2 {
    border-radius: 4%;
}

#section {
    margin: 2% 5%;
}

.centrada {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.centrada2 {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%)
}

#agregar {
    justify-content: center;
    text-align: center;

}
</style>