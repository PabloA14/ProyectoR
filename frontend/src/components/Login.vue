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
                        <q-input color="positive" filled type="text" v-model="documento" label="No. de Documento">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input color="positive" filled type="password" v-model="contrasena" label="Contraseña">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input><br>
                        <!-- <p class="q-mt-sm">¿olvido su contraseña?</p> -->
                        <p @click="openModal" class="q-mt-sm" style="cursor: pointer; color: rgb(5, 13, 255);">
                            ¿Olvidó
                            su
                            contraseña?</p><br>

                        <div class="row">
                            <router-link class="full-width" to="/Opciones">
                                <q-btn id="verde" class="full-width" label="Ingresar" type="submit" />
                            </router-link>
                        </div><br>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>

        <q-dialog v-model="modalVisible" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Restablecer Contraseña</div>
                    <hr class="green-line">
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p>Ingrese su direccion de correo electronico para
                        <br>
                        restablecer su cotraseña
                    </p>
                    <q-input dense v-model="address" autofocus @keyup.enter="prompt = false"
                        placeholder="Correo electrónico." />
                </q-card-section>

                <q-card-actions class="flex-center column ">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">

                            <q-btn class="full-width" id="verde" label="Restablecer Contraseña" />

                            <q-btn class="q-mt-md full-width custom-border" color="negative" label="Cancelar"
                                v-close-popup />

                        </div>
                        <div class="col-1"></div>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const documento = ref('');
const contrasena = ref('')
const modalVisible = ref(false);

function openModal() {
    modalVisible.value = true;
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
    height: 80px;
    width: 80px;
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
    /* Cambia "red" al color de borde que desees */
}

#verde {
    background-color: rgb(57, 169, 0);
    color: white;
}

.green-line {
    border: none;
    border-top: 5px solid rgb(57, 169, 0);
    /* Cambia el valor de 4px al grosor que desees */
    width: 100%;
}
</style>