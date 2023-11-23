<template>
    <div>
        <q-page class="q-pa-md">

            <div>
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
                                <p :style="{ color: letra }">Color letra  {{ letra }}</p>

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
let colorInterfaz =ref('')
let letra = ref(colores.configuracion.colorLetra)
let interfaz = ref(colores.configuracion.colorMenu)
console.log(interfaz.value);


console.log(letra.value);
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

async function editarColorInterfaz() {
    console.log('interfaz usuario');
     await colores.colorMenu(colorInterfaz.value)
        .then((res) => {
            console.log(res)
            traer()
            window.location.reload();
        }).catch((error) => {
            console.log(error);

        }) 
}

</script>

