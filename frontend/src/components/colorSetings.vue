<template>
    <div>
        <q-page class="q-pa-md">

            <div>
                <div class="text-h4 text-center q-mb-md">Configuración de Interfaz</div>

                <div class="text-h5 text-left q-mb-md">Selector de color</div>
                <div>
                    <ul>
                        <li v-for="c in colorBD" :key="c">
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
import { useQuasar } from "quasar";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let color = ref("");
let colorBD = ref('')

traer()

async function traer() {
    colorBD.value = await colores.traerConfiguracion()
    console.log(colorBD.value);
}


async function editarColor() {
    let idMon = ''
    await colores.editarConfiguracion(idMon, color.value)
}

</script>

<style scoped>
#ok {
    width: 32%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #ok {
        width: 100%;
    }
}
</style>
