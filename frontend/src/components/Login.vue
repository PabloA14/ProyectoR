<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <img src="https://img.freepik.com/free-vector/creator-adding-information-website-flat-vector-illustration-back-view-man-publishing-content-data-online-developing-blog-internet-making-digital-content-technology-occupation-concept_74855-24061.jpg?w=2000"
                        style="height: 300px;">
                </div>
                <div class="col">
                    <q-form @submit="onSubmit" class="q-gutter-md">
                        <h2>Login</h2>
                        <q-input color="positive" filled v-model="form.email" label="Correo Electrónico" type="email"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input color="positive" filled type="password" v-model="form.password1" label="Contraseña"
                            lazy-rules :rules="[
                                val => val !== null && val !== '' || 'Este campo es obligatorio',

                            ]">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <!-- <router-link to="/header">
                            <q-btn class="full-width" label="Submit" type="submit" color="primary" />

                        </router-link> -->
                        <div class="row">
                            <q-btn class="full-width" label="Ingresar" type="submit" color="positive" />
                        </div>

                    </q-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const password1 = ref('');
const password2 = ref('');

const form = ref({
    email: '',
    password1: '',
    password2: '',
    conditions: false,
    error: false
})

function onSubmit() {
    console.log(form.value);
    email.value = '';
    password1.value = '';
    password2.value = '';
}

</script>

<style scoped>
.container{
    margin: 20px auto;
    padding: 10px;
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    text-align: center;
}
</style>