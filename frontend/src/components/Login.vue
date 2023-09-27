<template>
    <div class="container">
        <div class="izquierda"></div>
        <div class="derecha">
            <q-card white bordered class="my-card" style="width: 60%;height: auto;">
                <q-card-section>
                    <div class="row">
                        <div class="col-3">
                            <img id="img" src='../imagenes/logosena.png'>
                        </div>
                        <div class="col-9">
                            <div id="titulo" class="text-h6" style="text-align: center;">Iniciar Sesión</div>
                        </div>
                    </div>
                </q-card-section>
                <q-separator inset class="text-black" />
                <q-card-section>
                    <q-form class="q-gutter-md" style="margin: auto;">
                        <q-input color="secondary" filled v-model="documento" label="No. de Documento">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input color="secondary" filled :type="mostrarContrasena ? 'text' : 'password'"
                            v-model="contrasena" label="Contraseña">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <i @click="mostrarContrasena = !mostrarContrasena" style="cursor: pointer;" class="fa-solid"
                                    :class="mostrarContrasena ? 'fa-eye' : 'fa-eye-slash'"></i>
                            </template>


                        </q-input><br>
                        <!-- <p class="q-mt-sm">¿olvido su contraseña?</p> -->
                        <p @click="openModal" class="q-mt-sm" style="cursor: pointer; color: rgb(5, 13, 255);">
                            ¿Olvidó
                            su
                            contraseña?</p><br>

                        <div class="row">
                            <q-spinner style="margin: 0 auto;" color="black" size="2em" :thickness="10"
                                v-if="useUsuario.loading === true" />
                            <q-btn v-else color="secondary" class="full-width" label="Ingresar"
                                @click.prevent="iniciarSesion()" />
                        </div><br>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>

        <q-dialog v-model="modalVisible" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Restablecer Contraseña</div>
                    <q-separator style="
            height: 5px;
            margin-top: 5px;
          " color="secondary" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p>Ingrese su dirección de correo electrónico para
                        <br>
                        restablecer su contraseña:
                    </p>
                    <q-input color="secondary" dense v-model="address" autofocus @keyup.enter="prompt = false"
                        placeholder="Correo electrónico" />
                </q-card-section>

                <q-card-actions class="flex-center column ">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">

                            <q-btn class="full-width" color="secondary" label="Restablecer Contraseña" />

                            <q-btn class="q-mt-md full-width custom-border" color="negative" label="Cancelar"
                                v-close-popup />
                        </div>
                        <div class="col-1"></div>
                    </div>
                </q-card-actions>
                <br>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
import { useUsuarioStore } from "../stores/Usuarios.js"
import { useQuasar } from 'quasar'

let useUsuario = useUsuarioStore()
let router = useRouter();
let ruta = ref("")
const $q = useQuasar()


let documento = ref('');
let contrasena = ref('')
const modalVisible = ref(false);

let mostrarContrasena = ref(false);

function openModal() {
    modalVisible.value = true;
}

function validar() {
    if (documento.value === "" && contrasena.value === "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: Math.random() * 3000
        })
    } else return true
}

async function iniciarSesion() {
    useUsuario.logeo(documento.value, contrasena.value)
        .then((res) => {
            const token = res.data.token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            ruta.value = "/home";
            router.push(ruta.value);
            console.log(token);

        }).catch((error) => {
            if (error.response && error.response.data.errors && validar() === true) {

                const camposVacios = error.response.data.errors[0].msg

                $q.notify({
                    message: camposVacios,
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: Math.random() * 3000
                })
            } else if (error.response && error.response.data.msg) {
                const credencialesInvalidas = error.response.data.msg

                $q.notify({
                    message: credencialesInvalidas,
                    color: 'negative',
                    position: 'top',
                    icon: 'warning',
                    timeout: Math.random() * 3000
                })

            } else {
                console.log(error);
            }
        })
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
    background-image: url('../imagenes/login.jpg');
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
    height: 75px;
    width: 75px;
}

.text-black {
    color: black;
}

#titulo {
    margin-top: 26px;
    font-size: 30px;
}

.custom-border {
    border: 1px solid red;
}
</style>