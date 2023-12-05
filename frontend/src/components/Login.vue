<template>
    <div class="container">
        <div class="izquierda"></div>
        <div class="derecha">
            <q-card white bordered id="card">
                <q-card-section>
                    <div class="row">
                        <div class="col-3">
                            <!-- <img id="img" src='../imagenes/logosena.png'> -->
                            <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <image href="../imagenes/logo_nuevo.svg" width="100%" height="100%" />
                            </svg>
                        </div>
                        <div class="col-9">
                            <div id="titulo" class="text-h6" style="text-align: center;">Iniciar Sesión</div>
                        </div>
                    </div>
                </q-card-section>
                <q-separator inset class="text-black" />
                <q-card-section>
                    <q-form class="q-gutter-md" style="margin: auto;">
                        <q-input filled v-model="documento" label="No. de Documento">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input filled :type="mostrarContrasena ? 'text' : 'password'" v-model="contrasena"
                            label="Contraseña">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <i @click="mostrarContrasena = !mostrarContrasena" style="cursor: pointer;" class="fa-solid"
                                    :class="mostrarContrasena ? 'fa-eye' : 'fa-eye-slash'"></i>
                            </template>
                        </q-input><br>

                        <!-- <p class="q-mt-sm">¿olvido su contraseña?</p> -->
                        <p @click="openModal" class="q-mt-sm"
                            style="cursor: pointer; color: rgb(5, 13, 255);text-align: center;">
                            ¿OLVIDÓ
                            SU
                            CONTRASEÑA?</p><br>

                        <div class="row">
                            <q-spinner style="margin: 0 auto;" color="black" size="2em" :thickness="10"
                                v-if="useUsuario.loading === true" />
                            <q-btn v-else :style="{ backgroundColor: colorMenu, color: colorLetra }" class="full-width"
                                label="Ingresar" type="submit" @click.prevent="iniciarSesion()" />
                        </div><br>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>

        <q-dialog v-model="modalVisible" persistent>
            <q-card id="cardContra">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Restablecer Contraseña</div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="height: 5px;margin-top: 5px;" :style="{ backgroundColor: colorMenu }" /><br>

                <q-card-section class="q-pt-none">
                    Ingrese su dirección de correo electrónico para
                    restablecer su contraseña:

                    <q-input style="margin-top: 5%;" filled dense v-model="correo" autofocus @keyup.enter="prompt = false"
                        placeholder="Correo electrónico" />
                </q-card-section>

                <q-card-actions align="center">

                    <div class="row">
                        <q-spinner style="margin: 0 auto;" color="black" size="2em" :thickness="10"
                            v-if="useUsuario.cargando === true" />

                        <q-btn v-else @click="envioCorreo()" :style="{ backgroundColor: colorMenu, color: colorLetra }"
                            label="Restablecer Contraseña" />
                    </div>

                </q-card-actions>
                <br>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";
import { useUsuarioStore } from "../stores/Usuarios.js"
import { useQuasar } from 'quasar'
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let colorMenu = ref("")
let colorLetra = ref("")

let useUsuario = useUsuarioStore()
let router = useRouter();
let ruta = ref("")
const $q = useQuasar();

let documento = ref('')
let contrasena = ref('')
const modalVisible = ref(false);

let mostrarContrasena = ref(false);

let correo = ref('');

onBeforeMount(async () => {
    await colores.traerConfiguracion()
    colorMenu.value = colores.configuracion.colorMenu
    colorLetra.value = colores.configuracion.colorLetra
})

function openModal() {
    modalVisible.value = true;
}

function validarFrontend() {
    if (documento.value.trim() == "" && contrasena.value.trim() == "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    }
    else if (!documento.value.trim()) {
        $q.notify({
            message: 'Ingrese la cédula',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    } else if (!contrasena.value.trim()) {
        $q.notify({
            message: 'Ingrese la contraseña',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    } else return true
}

async function iniciarSesion() {
    if (validarFrontend() === true) {
        await useUsuario.logeo(documento.value, contrasena.value)
            .then((res) => {
                const token = res.data.token;
                sessionStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                ruta.value = "/home";
                router.push(ruta.value);
            }).catch((error) => {
                if (error.response && error.response.data.errors) {

                    const camposVacios = error.response.data.errors[0].msg

                    $q.notify({
                        message: camposVacios,
                        color: 'negative',
                        icon: 'warning',
                        position: 'top',
                        timeout: 3000
                    })
                } else if (error.response && error.response.data.msg) {
                    const credencialesInvalidas = error.response.data.msg

                    $q.notify({
                        message: credencialesInvalidas,
                        color: 'negative',
                        position: 'top',
                        icon: 'warning',
                        timeout: 3000
                    })

                }
            })
    }
};


function validarHayCorreo() {
    if (correo.value.trim() === "") {
        $q.notify({
            message: 'Debe proporcionar el correo',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    } else {
        return true
    }
}

async function envioCorreo() {
    if (validarHayCorreo() === true) {
        try {
            let envio = await useUsuario.envioCorreo(correo.value)
            $q.notify({
                message: envio.data.msg,
                color: 'green',
                icon: 'check',
                position: 'top',
                timeout: 3000
            })
            modalVisible.value = false
            correo.value = ''
        } catch (error) {
            if (error.response && error.response.data.errors) {

                const faltaCorreo = error.response.data.errors[0].msg

                $q.notify({
                    message: faltaCorreo,
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: 3000
                })
            } else {
                $q.notify({
                    message: error.response.data,
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: 3000
                })
            }
        }
    }
}


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: flex;
    height: 100vh;
}

.izquierda {
    flex: 1;
    background-image: url('../imagenes/login2.jpg');
    background-size: cover;
    background-position: center;
}

.derecha {
    flex: 1;
    background-color: #f0f0f0;
    display: grid;
    place-items: center;
}

#img {
    height: 100%;
    width: 100%;
}


.text-black {
    color: black;
}

#titulo {
    margin-top: 26px;
    font-size: 30px;
}

#card {
    width: 65%;
    height: auto;
}

#cardContra {
    width: 35%;
}

@media screen and (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    .izquierda {
        display: none;
    }

    #card {
        width: 90%;
    }

    #cardContra {
        width: 100%;
    }
}
</style>