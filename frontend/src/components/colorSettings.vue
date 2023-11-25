<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Configuración de Interfaz</div><br>

        <div class="card-container">
            <q-card class="my-card" white bordered>
                <q-card-section class="q-gutter-md">
                    <p>Modificar el color de la interfaz de usuario:</p>
                    <q-color v-model="colorInterfaz" class="my-picker" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn :style="{ backgroundColor: colorInterfaz, color: color }" @click="editarColorInterfaz()"
                        label="editar interfaz" />
                </q-card-actions>
            </q-card>

            <q-card class="my-card" white bordered>
                <q-card-section class="q-gutter-md">
                    <p>Modificar el color de los textos:</p>
                    <q-color v-model="color" class="my-picker" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn :style="{ backgroundColor: colorInterfaz, color: color }" @click="editarColor"
                        label="Editar Color" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- <div>
                <div class="text-h4 text-center q-mb-md">Configuración de Interfaz</div>
                <div class="row q-mt-xs">
                    <div class="col"></div>
                    <div class="col">
                        <ul>
                            <li>
                                Modificar el color de la interfaz del usuario:
                                <p :style="{ color: interfaz }">Color Interfaz {{ interfaz }}</p>
                                <div class="q-pa-md row items-start q-gutter-md">
                                    <q-color v-model="colorInterfaz" class="my-picker" />
                                </div>
                                <q-btn @click="editarColorInterfaz()" label="editar int" />

                            </li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul>
                            <li>
                                Color de titulos y Subtitulos (LISTO)
                                <p :style="{ color: letra }">Color letra {{ letra }}</p>

                                <br>
                                <br>
                                <div class="q-pa-md row items-start q-gutter-md">
                                    <q-color v-model="color" class="my-picker" />
                                </div>
                                <q-btn @click="editarColor" label="Editar Color" />

                            </li>
                        </ul>
                    </div>
                    <div class="col"></div>

                </div>
                <div>


                </div>
            </div> -->

    </q-page>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let color = ref("");
let colorInterfaz = ref('')

onMounted(async () => {
    await colores.traerConfiguracion()
    colorInterfaz.value = colores.configuracion.colorMenu
    color.value = colores.configuracion.colorLetra
})

/* traer()

async function traer() {
    await colores.traerConfiguracion()
        .then((res) => {
            colorBD.value = res
            prueba.value = res[0].colorLetra
        })
} */

async function editarColor() {
    await colores.ColorLEtra(color.value)
        .then((res) => {
            console.log(res)
            //traer()
            window.location.reload();
        }).catch((error) => {
            console.log(error);

        })
}

async function editarColorInterfaz() {
    await colores.colorMenu(colorInterfaz.value)
        .then((res) => {
            console.log(res)
            //traer()
            window.location.reload();
        }).catch((error) => {
            console.log(error);

        })
}

</script>

<style scoped>
.my-card {
    text-align: center;
    width: 26.5%;
}

.card-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 5%;
}

@media screen and (max-width: 700px) {

    .my-card {
        text-align: center;
        width: auto;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    }
}
</style>
