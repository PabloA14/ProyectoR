<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Información Personal
                <q-btn style="margin: 0 auto; float: right;" color="secondary" icon="edit" label="Editar" class="q-mb-md"
                    @click="agregar = true; editarUsuario(datos)" />
            </div>

            <div class="text-h5 text-left q-mb-md">Datos personales</div>
            <div class="text-h7 text-left q-mb-md"><b>Nombres:</b> {{ datos.nombre }}</div>
            <div class="text-h7 text-left q-mb-md"><b>Apellidos:</b> {{ datos.apellidos }}</div>
            <div class="text-h7 text-left q-mb-md"><b>Número de identificación:</b> {{ datos.cedula }}</div>

            <q-separator /><br>

            <div class="text-h5 text-left q-mb-md">Contacto</div>
            <div class="text-h7 text-left q-mb-md"><b>Teléfono:</b> {{ datos.telefono }}</div>
            <div class="text-h7 text-left q-mb-md"><b>Correo electrónico:</b> {{ datos.correo }}</div>

            <q-separator /><br>

            <div class="text-h5 text-left q-mb-md">Educación</div>
            <div class="text-h7 text-left q-mb-md"><b>Perfil Profesional:</b> {{ datos.perfilProfesional }}</div>
            <div class="text-h7 text-left q-mb-md"><b>Hoja de vida</b></div>

            <q-separator /><br>

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

            <q-dialog v-model="agregar">
                <q-card style="width: 32%; height: fit-content">
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

                        <div class="q-mb-md">
                            <q-file label="Hoja de Vida" type="file" color="secondary" v-model="cv">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Perfil Profesional*" color="secondary" v-model="perfilProfesional" />
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                        <q-btn label="Actualizar" @click="actualizar()" color="secondary" />
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

function editarUsuario(datos) {
    console.log("Entró a editar", datos);
    id.value = datos._id;
    cedula.value = datos.cedula;
    nombre.value = datos.nombre;
    apellido.value = datos.apellidos;
    telefono.value = datos.telefono;
    correo.value = datos.correo;
    //cv.value = x.hojaDeVida;
    perfilProfesional.value = datos.perfilProfesional;
    agregar.value = true;
}
async function actualizar() {
    await useUsuario.actualizarDatosPersonales(
        id.value,
        cedula.value,
        nombre.value,
        apellido.value,
        telefono.value,
        correo.value,
        //cv.value,
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
}


</script>