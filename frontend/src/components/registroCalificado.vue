<template>
    <q-page class="q-pa-md">
        
        <div class="row">
            <div class="centrada" id="card">

                <div class="text-h4 text-center q-mb-md">Registro Calificado</div> <br>
                
                <q-card class="my-card" flat bordered id="csrd2">
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs" id="section">

                            <div class="text-h5 q-mt-sm q-mb-xs">Gestión contable</div> <br>

                            <div class="text-h6 q-mt-sm q-mb-xs">Titulo que otorga:</div>
                            <div class="text-caption text">
                                {{ prueba.titulo }}
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Lugar de desarrollo de oferta:</div>
                            <div class="text-caption text">
                                {{ prueba.lugardesarrollo}}
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Metodologia:</div>
                            <div class="text-caption text">
                                {{ prueba.metodologia }}
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Numero de creditos:</div>
                            <div class="text-caption text">
                                {{ prueba.creditos }}
                            </div>

                            <div class="text-h6 q-mt-sm q-mb-xs">Codigo snies:</div>
                            <div class="text-caption text">
                                {{  prueba.codigosnies }}
                            </div>

                        </q-card-section>

                        <q-card-section class="col-5 flex flex-center">

                         

                        </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>


                        <q-btn style="float: ; margin: auto auto" color="secondary" icon="add" label="Agregar"
                            class="q-mb-md" @click="
                                agregar = true; nuevo();" />

                        <q-btn style="float: ; margin: auto auto" flat color="primary" @click="editarRegistro(registro)">
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
                        {{ bd === 0 ? "Editar Registro Calificado" : "Agregar Registro Calificado" }} 
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

                    <div class="q-mb-md">
                        <q-input label="Titulo*" color="secondary" v-model="titulo" />
                    </div>

                    
                    <div class="q-mb-md">
                        <q-input label="Lugar De Desarrollo*" color="secondary" v-model="lugardesarrollo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Metodología*" color="secondary" v-model="metodologia" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Creditos*" color="secondary" v-model="creditos" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Código SNIES*" type="Number" color="secondary" v-model="codigosnies" />
                    </div>
                    <div class="q-mb-md">
                        <q-input label="Fecha *" type="Date" color="secondary" v-model="fecha" />
                    </div>


                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <!--         <q-btn :disabled="loading" v-if="bd == 1" label="Agregar" @click="agregarP()" color="secondary" />
                <q-btn :disabled="loading" v-else label="Actualizar" @click="actualizar()" color="secondary" /> -->
                    <q-btn :disabled="loading" v-if="bd== 1" label="Agregar" @click="agregarN()" color="secondary" />
                    <q-btn :disabled="loading" v-else label="Actualizar" @click="actualizar()" color="secondary" />

                </q-card-actions>
            </q-card>
        </q-dialog>



    </q-page>
</template>
    

<script setup>

import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import {UsesRegistroCalificado} from "../stores/registroCalificado.js"
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const usePrograma = useProgramasFormacionStore();
const useRegistro = UsesRegistroCalificado()
let programaSeleccionado = usePrograma.programa
let idPrograma = programaSeleccionado._id
let registroCalificado = ref([])
let bd = ref('')
const $q = useQuasar()
let agregar = ref(false)
let errores = ref([])
let loading = ref(false)
let titulo = ref("")
let metodologia = ref("")
let lugardesarrollo = ref("")
let creditos = ref("")
let codigosnies = ref("")
let fecha = ref("")
let prueba = ref('')
let infoReg = ref('')
buscar()
let registroFiltrado = computed(() => {
    return registroCalificado.value.filter(
        (x) => x.programa._id === idPrograma
    );
});


function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    titulo.value = ""
    metodologia.value = ""
    lugardesarrollo.value = ""
    creditos.value = ""
    codigosnies.value = ""
    fecha.value = ""
}

async function buscar() {
    registroCalificado.value = await useRegistro.buscarRegistros();
    registroCalificado.value.reverse()
    infoReg.value = registroCalificado.value
    console.log(registroCalificado.value);
    console.log("-----------------");
    console.log(infoReg.value);

    for (let i = 0; i < infoReg.value.length; i++) {

       let a = infoReg.value[i].programa
       let b =infoReg.value[i]
      
        if (b.programa._id === idPrograma) {
            prueba.value = b
            console.log(b)
        }
    }
}

async function buscarRegistroCodigo() {
   
    console.log(codigosnies.value);
    const res = await useRegistro.buscarRegistrosCodigo(codigosnies.value) 
    prueba.value = res
    console.log(prueba.value);
}

function validarVacios() {
    if (titulo.value === "" && metodologia.value === "" && lugardesarrollo.value == "" && creditos.value == "" && codigosnies.value == ""
    && fecha.value === "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: Math.random() * 3000
        })
    } else return true
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


async function agregarN() {
    console.log("entro a agregar");
    loading.value = true
    await useRegistro.agregarRegistroC({
        titulo: titulo.value,
        lugardesarrollo: lugardesarrollo.value,
        metodologia: metodologia.value,
        creditos: creditos.value,
        codigosnies: codigosnies.value,
        fecha: fecha.value,
        programa: idPrograma
    }).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Registro Calificado agregado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        buscar();
        buscarRegistroCodigo()
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })

        } else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}

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