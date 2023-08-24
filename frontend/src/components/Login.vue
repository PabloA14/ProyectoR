<template>
    <div>
<<<<<<< HEAD
        <h2>Login</h2>
        <router-link to="/header">
            <button>Header</button>
        </router-link>
=======
        <div class="container">
            <q-card white bordered class="my-card" style="width: 430px">
                <q-img :src="url" :ratio="16 / 8" />
                <q-card-section>
                    <div class="row">
                        <div class="col-3">
                            <img id="img"
                                src='https://senasofiapluss.com/wp-content/uploads/2022/10/logo-del-sena-verde-1024x1024.jpg'>
                        </div>
                        <div class="col-9">
                            <div id="titulo" class="text-h6" style="text-align: center;">Login</div>
                        </div>
                    </div>
                </q-card-section>
                <q-separator inset class="text-black" />
                <q-card-section>
                    <q-form @submit="onSubmit" class="q-gutter-md">

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

                        <div class="row">
                            <router-link class="full-width" to="/header">
                                <q-btn style="color: white;" color="positive" class="full-width" label="Ingresar"
                                    type="submit" />

                            </router-link>
                            <!-- type="submit"  -->
                            <!-- <q-btn style="background-color: green; color: white;" class="full-width" label="Ingresar" /> -->
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
>>>>>>> 4dd565d0a46db7d82c95c2ea5fa0bfe277754b8b
    </div>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const url = 'https://static.vecteezy.com/system/resources/previews/002/744/896/non_2x/file-management-illustration-vector.jpg'

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
#img {
    height: 80px;
    width: 80px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.text-black {
    color: black;
}

#titulo {
    margin-top: 26px;
    font-size: 30px;
}
</style>