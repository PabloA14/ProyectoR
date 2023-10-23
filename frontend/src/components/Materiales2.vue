<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Materiales de Formación</div>

            <q-btn color="secondary" icon="add" label="Agregar" class="q-mb-md" @click="
                agregar = true" />

            <q-list bordered class="rounded-borders">

                <q-expansion-item expand-separator icon="perm_identity" label="Account settings" caption="John Doe">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                            corrupti
                            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                            eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-expansion-item expand-separator icon="perm_identity" label="Account settings" caption="John Doe">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                            corrupti
                            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                            eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-expansion-item expand-separator icon="perm_identity" label="Account settings" caption="John Doe">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                            corrupti
                            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                            eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>

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
                            <q-select use-chips multiple label="Seleccionar los materiales de formación" color="secondary"
                                v-model="materialesSeleccionados"
                                :options="material.map(mat => ({ label: mat.nombre, value: mat._id }))" emit-value
                                map-options>
                            </q-select>
                        </div>

                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                        <q-btn label="Agregar" @click="agregarN()" color="secondary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>


        </q-page>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useProgramasFormacionStore } from "../stores/ProgramasFormacion.js"
import { useMaterialStore } from "../stores/Materiales.js"

let materialesSeleccionados = ref([])
let material = ref([])
let agregar = ref(false)


const useMaterial = useMaterialStore()
const usePrograma = useProgramasFormacionStore()

buscarMateriales()

async function buscarMateriales() {
    material.value = await useMaterial.buscarMateriales();
    console.log(material.value);
}

async function agregarN() {
    console.log("entro a agregar");
    const id = "6532cbf02a6021177d311a34"
    await usePrograma.asignarMateriales(id, materialesSeleccionados.value)
    agregar.value = false
}
</script>