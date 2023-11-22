<template>
    <div>
        <q-page class="q-pa-md">

            <div>
                <div class="text-h4 text-center q-mb-md">Configuración de Interfaz</div>

                <div class="text-h5 text-left q-mb-md">Selector de color</div>
                <div>
                    <ul>
                        <li>
                            Modificar el color de la interfaz del usuario:
                            <div class="q-pa-md row items-start q-gutter-md">
                                <q-color v-model="color" class="my-picker" />
                            </div>
                        </li>
                    </ul>
                </div>
                <q-btn @click="editarColor" label="editar" />
            </div>

        </q-page>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();

let prueba = ref()
let color = ref("");
let colorBD = ref('')

traer()
async function traer() {
    await colores.traerConfiguracion()
        .then((res) => {
            colorBD.value = res
            prueba.value = res[0].colorLetra
        })
}


async function editarColor() {
    await colores.ColorLEtra(color.value)
        .then((res) => {
            console.log(res)
            traer()
            window.location.reload();
        }).catch((error) => {
            console.log(error);

        })
}

</script>

