<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
            <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
            <q-breadcrumbs-el label="Ambientes de Formación" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md">Ambientes de Formación</div><br>

        <div class="row">
            <div class="col-6">
                <q-input @input="programafiltrao"  style="width: fit-content;min-width: 40%;" 
                v-model="buscarCodigo"
                placeholder="Buscar por código..." 
                dense color="secondary" outlined>
                <template v-slot:prepend>
                        <q-icon name="search" />
                </template>
                </q-input >
            </div>
            
            <div class="col-6 text-right">
                <q-btn color="secondary" 
                icon="add" label="Agregar" 
                class="q-mb-md" 
                @click="
                agregar = true; nuevo()" />
            </div>

        </div>

        <span v-if="ambientesPrograma.length === 0">No se han agregado ambientes</span>

        <span v-if="error=true">{{errorD}}</span>
        <div style="overflow-y: auto;height: 60vh;">
            <q-list bordered class="rounded-borders">
                <q-expansion-item switch-toggle-side v-for="amb in ambientesPrograma" :key="amb"
                    :label="'Código: ' + amb.codigo" :caption="amb.nombre">
                    <q-card>
                        <q-card-section>
                            <div>
                                Tipo: {{ amb.tipo }}
                            </div><br>
                            <div>
                                Descripción: {{ amb.descripcion }}
                            </div>
                        </q-card-section>
                    </q-card>
                    <q-separator inset style="height: 5px;margin-top: 5px;" color="secondary" /><br>
                </q-expansion-item>
            </q-list>
        </div>

        <q-dialog v-model="agregar">
            <q-card style="width: 40%; height: fit-content">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        Agregar Ambientes de Formación
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />

                <q-card-section style="max-height: 65vh" class="scroll">

                    <div class="q-mb-md">
                        <q-select label="Seleccionar los ambientes de formación" color="secondary"
                            v-model="ambienteSeleccionado"
                            :options="ambiente.map(amb => ({ label: amb.nombre, value: amb._id }))" emit-value map-options>
                        </q-select>
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :disabled="loading" label="Agregar" @click="agregarN()" color="secondary" />
                </q-card-actions>
            </q-card>
        </q-dialog>


    </q-page>
</template>

<script setup>
import { ref , computed} from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useAmbienteStore } from "../stores/Ambientes.js"
import { useQuasar } from 'quasar'

let buscarCodigo = ref('')
let ambienteSeleccionado = ref("")
let ambiente = ref([])
let ambientesPrograma = ref([])
let agregar = ref(false)
const $q = useQuasar()
let error =ref(false)
let errorD =ref()
let prueba =ref([])
let loading = ref(false)
const useAmbiente = useAmbienteStore()
const usePrograma = useProgramasFormacionStore()

let programaSeleccionado = usePrograma.programa
console.log(programaSeleccionado);

buscarAmbientes()

ambientesPrograma.value = usePrograma.programa.ambienteFormacion

let idPrograma = usePrograma.programa._id

const programafiltrao = computed(() => {
  if (buscarCodigo.value === "" ) {
    ambientesPrograma.value = usePrograma.programa.ambienteFormacion
    console.log('**********');
    console.log(ambientesPrograma.value);
    error.value=false
    errorD.value =''
  } else{
    let filtrado= ambientesPrograma.value.filter(a=>a.codigo.includes(buscarCodigo.value))
    if(filtrado.length===0){
        error.value=true
        errorD.value ='no se encontro ningun resultado'
        ambientesPrograma.value =''
    }else {
        errorD.value =''
        error.value=false
        console.log(filtrado);
        ambientesPrograma.value =filtrado
    } ;

  }
    
}
)


async function buscarAmb() {
    await usePrograma.informacionPrograma(usePrograma.programa.codigo)
        .then(() => {
            ambientesPrograma.value = usePrograma.programa.ambienteFormacion
            ambientesPrograma.value.reverse()
        }).catch((error) => {
            console.log(error);
        })
}

console.log(usePrograma.programa);

async function buscarAmbientes() {
    const ambientesActivos = await useAmbiente.buscarAmbientes();
    ambiente.value = ambientesActivos.filter(amb => amb.estado === 1);
    console.log(ambiente.value);
}

function nuevo() {
    ambienteSeleccionado.value = ""
}

async function agregarN() {
    loading.value = true
    console.log("entro a agregar");
    await usePrograma.asignarAmbientes(idPrograma, ambienteSeleccionado.value)
        .then(() => {
            agregar.value = false
            $q.notify({
                message: 'Ambiente de formación agregado exitosamente',
                color: 'green',
                icon: 'check',
                position: 'bottom',
                timeout: Math.random() * 3000
            })
            buscarAmb()
        }).catch((error) => {
            if (ambienteSeleccionado.value === "") {
                $q.notify({
                    message: 'Debe seleccionar un ambiente',
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: Math.random() * 3000
                })
            } else if (error.response && error.response.data.msg) {
                const fallo = error.response.data.msg
                $q.notify({
                    message: fallo,
                    color: 'negative',
                    position: 'top',
                    icon: 'warning',
                    timeout: Math.random() * 3000
                })
            } else {
                console.log(error);
            }
        })
    loading.value = false
}

</script>