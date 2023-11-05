<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs separator=">">
            <q-breadcrumbs-el to="/programas" label="Programas de Formación" />
            <q-breadcrumbs-el to="/InformacionPrograma" :label="usePrograma.programa.denominacionPrograma" />
            <q-breadcrumbs-el to="/cards" label="Gestionar Programa" />
            <q-breadcrumbs-el label="Materiales de Formación" />
        </q-breadcrumbs><br>

        <div class="text-h4 text-center q-mb-md">Materiales de Formación</div>
        <br>

        <div class="row">
            <div class="col-6">
                <q-input style="width: fit-content;min-width: 40%;" v-model="buscarCodigo"
                    placeholder="Buscar por código..." dense color="secondary" outlined>
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <div class="col-6 text-right">
                <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="
                    agregar = true; nuevo()" />
            </div>
        </div>

        <span v-if="materialesPrograma.length === 0">No se han agregado materiales</span>


        <div style="overflow-y: auto;height: 60vh;">
            <q-list bordered class="rounded-borders">
                <q-expansion-item switch-toggle-side v-for="mat in materialesPrograma" :key="mat"
                    :label="'Código: ' + mat.codigo" :caption="mat.nombre">
                    <q-card>
                        <q-card-section>
                            <div>
                                Tipo: {{ mat.tipo }}
                            </div><br>
                            <div>
                                Descripción: {{ mat.descripcion }}
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
                        Agregar Materiales de Formación
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
                        <q-select label="Seleccionar los materiales de formación" color="secondary"
                            v-model="materialSeleccionado"
                            :options="material.map(mat => ({ label: mat.nombre, value: mat._id }))" emit-value map-options>
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
import { ref } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useMaterialStore } from "../stores/Materiales.js"
import { useQuasar } from 'quasar'

let materialSeleccionado = ref("")
let material = ref([])
let materialesPrograma = ref([])
let agregar = ref(false)
const $q = useQuasar()
let loading = ref(false)
const useMaterial = useMaterialStore()
const usePrograma = useProgramasFormacionStore()

buscarMateriales()

materialesPrograma.value = usePrograma.programa.materialesformacion

let idPrograma = usePrograma.programa._id

async function buscarMat() {
    await usePrograma.informacionPrograma(usePrograma.programa.codigo)
        .then(() => {
            materialesPrograma.value = usePrograma.programa.materialesformacion
            materialesPrograma.value.reverse()
        }).catch((error) => {
            console.log(error);
        })
}

console.log(usePrograma.programa);

async function buscarMateriales() {
    const materialesActivos = await useMaterial.buscarMateriales();
    material.value = materialesActivos.filter(mat => mat.estado === 1);
    console.log(material.value);
}

function nuevo() {
    materialSeleccionado.value = ""
}

async function agregarN() {
    loading.value = true
    console.log("entro a agregar");
    await usePrograma.asignarMateriales(idPrograma, materialSeleccionado.value)
        .then(() => {
            agregar.value = false
            $q.notify({
                message: 'Material de formación agregado exitosamente',
                color: 'green',
                icon: 'check',
                position: 'bottom',
                timeout: Math.random() * 3000
            })
            buscarMat()
        }).catch((error) => {
            if (materialSeleccionado.value === "") {
                $q.notify({
                    message: 'Debe seleccionar un material',
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