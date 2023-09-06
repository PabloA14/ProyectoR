<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Redes de Conocimiento</div>
            <q-btn color="secondary" icon="add" label="Agregar Red" class="q-mb-md" @click="
                agregar = true;
            nuevo();
            " />
            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Denominación</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="red in redCon" :key="red">
                            <td>{{ red.codigo }}</td>
                            <td>{{ red.denominacion }}</td>
                            <td :style="{ color: red.estado === 1 ? 'green' : 'red' }">{{ red.estado === 1 ?
                                'Activo'
                                :
                                'Inactivo'
                            }}</td>
                            <td>
                                <div>
                                    <q-btn color="primary" style="margin-right: 5px;" @click="editarRed(red)">✏️</q-btn>
                                    <q-btn color="primary" style="margin-left: 5px;" @click="editarEstado(red)"
                                        v-if="red.estado === 1">❌</q-btn>
                                    <q-btn color="primary" style="margin-left: 5px;" @click="editarEstado(red)"
                                        v-else>✅</q-btn>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </q-page>

        <q-dialog v-model="agregar">
            <q-card style="width: 32%; height: fit-content">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Red" : "Agregar Red" }}
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />

                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
                    <div class="q-mb-md">
                        <q-input label="Código" color="secondary" v-model="codigo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Denominación" color="secondary" v-model="denominacion" />
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-if="bd == 1" label="Agregar" @click="agregarR()" color="secondary" v-close-popup />
                    <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRedStore } from "../stores/Redes.js"
import { useQuasar } from 'quasar'

let agregar = ref(false)
let codigo = ref("")
let denominacion = ref("")
let id = ref("")

const useRed = useRedStore()
let redCon = ref([])
let bd = ref("");
const $q = useQuasar()

buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    codigo.value = ""
    denominacion.value = ""
}

async function buscar() {
    redCon.value = await useRed.buscarRedes();
    console.log(redCon.value);
    redCon.value.reverse()
}

async function agregarR() {
    console.log("entro a agregar");
    await useRed.agregarRedes({
        codigo: codigo.value,
        denominacion: denominacion.value
    });
    $q.notify({
        message: 'Red agregada exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

function editarRed(red) {
    console.log("Entró a editar", red);
    bd.value = 0;
    id.value = red._id;
    codigo.value = red.codigo
    denominacion.value = red.denominacion
    agregar.value = true;
}

async function actualizar() {
    await useRed.actualizarRedes(
        id.value,
        codigo.value,
        denominacion.value
    );
    $q.notify({
        message: 'Red editada exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

async function editarEstado(red) {
    console.log("entre a editar estado", red.estado);
    try {
        if (red.estado === 1) {
            red.estado = 0
        } else {
            red.estado = 1
        }
        const res = await useRed.cambiarEstado(red._id, red.estado)
        buscar()

    } catch (error) {
        console.log(error);
    }
}
</script>