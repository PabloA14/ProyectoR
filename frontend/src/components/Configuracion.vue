<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Información Personal</div>

            <div class="text-h5 text-left q-mb-md">Datos personales</div>
            <div class="text-h7 text-left q-mb-md">Nombres:</div>
            <div class="text-h7 text-left q-mb-md">Apellidos:</div>
            <div class="text-h7 text-left q-mb-md">Número de identificación:</div>

            <q-separator /><br>

            <div class="text-h5 text-left q-mb-md">Contacto</div>
            <div class="text-h7 text-left q-mb-md">Teléfono:</div>
            <div class="text-h7 text-left q-mb-md">Correo electrónico:</div>

            <q-separator /><br>

            <div class="text-h5 text-left q-mb-md">Educación</div>
            <div class="text-h7 text-left q-mb-md">Perfil profesional:</div>
            <div class="text-h7 text-left q-mb-md">Hoja de vida:</div>

            <q-separator /><br>

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
        </q-page>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from "../stores/Usuarios.js"

let useUsuario = useUsuarioStore()



</script>