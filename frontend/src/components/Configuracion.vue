<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Información Personal
            </div><br>

            <div class="row" style="display: grid; place-items: center;">
                <q-card class="my-card q-mt-xl" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs" id="section">
                            <div class="row" style="display: flex;justify-content: center;align-items: center;">
                                <q-avatar size="100px">
                                    <img v-if="datos.foto === undefined" src="../imagenes/usuario.png" alt="imagenes">
                                    <img :src="datos.foto" />
                                </q-avatar>
                            </div><br>
                            <div class="row">
                                <div class="col-4">
                                    <div class="text-h6 q-mt-sm q-mb-xs">Datos personales</div>
                                </div>

                                <div class="col-4">
                                    <div class="text-h6 q-mt-sm q-mb-xs">Contacto</div>
                                </div>

                                <div class="col-4">
                                    <div class="text-h6 q-mt-sm q-mb-xs">Educación</div>
                                </div>
                            </div>

                            <q-separator style="height: 5px;margin-top: 5px;" color="secondary" /><br>

                            <div class="row">
                                <div class="col-4">
                                    <div class="text-h7 text-left q-mb-md"><b>Número de identificación:</b> {{ datos.cedula
                                    }}</div>
                                    <div class="text-h7 text-left q-mb-md"><b>Nombres:</b> {{ datos.nombre }}</div>
                                    <div class="text-h7 text-left q-mb-md"><b>Apellidos:</b> {{ datos.apellidos }}</div>
                                </div>

                                <div class="col-4">
                                    <div class="text-h7 text-left q-mb-md"><b>Teléfono:</b> {{ datos.telefono }}</div>
                                    <div class="text-h7 text-left q-mb-md"><b>Correo electrónico:</b> {{ datos.correo }}
                                    </div>
                                </div>

                                <div class="col-4">
                                    <div class="text-h7 text-left q-mb-md"><b>Perfin profesional:</b> {{
                                        datos.perfilProfesional }}</div>
                                    <div class="text-h7 text-left q-mb-md"><b>Hoja de Vida:</b>
                                    </div>
                                    <a :href="datos.hojaDeVida" target="_blank">
                                        <q-icon title="Descargar" color="green" name="fa-solid fa-download" size="25px"
                                            style="cursor: pointer;" />
                                    </a>
                                </div>
                            </div>

                        </q-card-section>

                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-btn style="float: ; margin: auto auto" color="secondary" icon="edit" label="Editar"
                            class="q-mb-md" @click="agregar = true; editarUsuario(datos)" />
                    </q-card-actions>
                </q-card>
            </div><br><br>

            <div v-if="rol === 'administrador'">
                <div class="text-h4 text-center q-mb-md">Configuración de Interfaz</div>

                <div class="text-h5 text-left q-mb-md">Selector de color</div>
                <div>
                    <ul>
                        <li>Modificar el color de la interfaz del usuario:
                            <div class="q-pa-md row items-start q-gutter-md">
                                <q-color class="my-picker" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <q-dialog v-model="agregar" class="card">
                <q-card id="ok">
                    <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">
                            Editar datos personales
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
                            <q-input label="Cédula*" type="number" color="secondary" v-model="cedula" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Nombre*" color="secondary" v-model="nombre" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Apellidos*" color="secondary" v-model="apellido" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Teléfono*" type="number" color="secondary" v-model="telefono" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Correo Electrónico*" color="secondary" v-model="correo" />
                        </div>

                        <div style="text-align: left;" class="q-mb-md">
                            <p style="color: rgb(122, 122, 121)">Hoja de Vida</p>
                            <input type="file" @change="archivo" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Perfil Profesional*" color="secondary" v-model="perfilProfesional" />
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                        <q-btn :disable="loading" label="Actualizar" @click="actualizar()" color="secondary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>


        </q-page>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from "../stores/Usuarios.js"
import { useQuasar } from 'quasar'


let useUsuario = useUsuarioStore()
let rol = useUsuario.rol
let datos = useUsuario.usuario

let agregar = ref(false)
const $q = useQuasar()
let loading = ref(false)
let errores = ref([])

let cedula = ref("");
let nombre = ref("");
let apellido = ref("");
let telefono = ref("");
let correo = ref("");
let cv = ref("");
let id = ref("")
let perfilProfesional = ref("");


function validarVacios() {
    if (cedula.value === "" && nombre.value === "" && apellido.value === "" && telefono.value === ""
        && correo.value === "" && perfilProfesional.value === "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: Math.random() * 3000
        })
    } else return true
}

function validar() {
    $q.notify({
        message: errores,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
    })
}

function archivo(event) {
    cv.value = event.target.files[0];
    console.log(cv.value);
}

function editarUsuario(datos) {
    console.log("Entró a editar", datos);
    id.value = datos._id;
    cedula.value = datos.cedula;
    nombre.value = datos.nombre;
    apellido.value = datos.apellidos;
    telefono.value = datos.telefono;
    correo.value = datos.correo;
    cv.value = datos.hojaDeVida;
    perfilProfesional.value = datos.perfilProfesional;
    agregar.value = true;
}
async function actualizar() {
    loading.value = true
    await useUsuario.actualizarDatosPersonales(
        id.value,
        cedula.value,
        nombre.value,
        apellido.value,
        telefono.value,
        correo.value,
        cv.value,
        perfilProfesional.value

    ).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Datos personales editados exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })

    }).catch((error) => {
        errores.value = ''
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })
        }
        else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    loading.value = false
}


</script>

<style scoped>
.my-card {
    margin-top: -1%;
    color: rgb(0, 0, 0);
    border-radius: 1px;
    width: 60%;
}

.my-card .text-h6 {
    color: rgb(0, 0, 0);
    font-weight: 800;
    margin-bottom: 9%;
    font-size: 3vh;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 10%;

}

.my-card .text-caption {
    font-size: 2.5vh;
    color: rgb(63, 63, 63);
    text-align: center;
}

#section {
    margin: 2% 5%;
}

#agregar {
    justify-content: center;
    text-align: center;
}

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