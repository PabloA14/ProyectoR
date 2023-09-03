<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Usuarios</div>
            <div class="q-pa-md" style="width: 100%;">
                <q-table :filter="filter" :rows="usuarios" :columns="columns" row-key="name" rowsPerPage="6">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarUsuario(x)" />
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(x)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(x)" />
                        </q-td>
                    </template>

                    <template v-slot:body-cell-estado="props">
                        <q-td :props="props">
                            <span class="text-green" v-if="props.row.estado == 1">Activo</span>
                            <span class="text-red" v-else>Inactivo</span>
                        </q-td>
                    </template>
                    <template v-slot:top-right>
                        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:top-left>
                        <q-btn color="secondary" icon="add" label="Agregar Usuario" class="q-mb-md" @click="
                            agregar = true;
                        nuevo();
                        " />
                    </template>
                </q-table>
            </div>

        </q-page>

        <q-dialog v-model="agregar">
            <q-card style="width: 32%; height: fit-content">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Usuario" : "Registrar Usuario" }}
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
                        <q-input label="Cédula" type="number" color="secondary" v-model="cedula" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Nombre" color="secondary" v-model="nombre" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Apellidos" color="secondary" v-model="apellido" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Teléfono" type="number" color="secondary" v-model="telefono" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Contraseña" type="password" color="secondary" v-model="clave" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Correo Electrónico" color="secondary" v-model="correo" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Red de Conocimiento" color="secondary" v-model="red" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Hoja de Vida" color="secondary" v-model="cv" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Rol de Usuario" color="secondary" v-model="rol" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Perfil Profesional" color="secondary" v-model="perfilProfesional" />
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-if="bd == 1" label="Agregar" @click="agregarU()" color="secondary" v-close-popup />
                    <q-btn v-else label="Actualizar" @click="actualizar()" color="secondary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useQuasar } from 'quasar'

let agregar = ref(false);
let cedula = ref("");
let nombre = ref("");
let apellido = ref("");
let telefono = ref("");
let clave = ref("");
let correo = ref("");
let red = ref("");
let cv = ref("");
let rol = ref("");
let usuarios = ref([]);
let id = ref("");
let perfilProfesional = ref("");
let bd = ref("");
const $q = useQuasar()
let filter = ref('')

const columns = [
    { name: 'cedula', label: 'Cédula', field: 'cedula', sortable: true },
    {
        name: 'nombre',
        label: 'Nombre',
        field: "nombre",
        format: val => `${val}`,
        sortable: true
    },
    { name: 'correo', label: 'Correo', field: 'correo', sortable: true },
    { name: 'telefono', label: 'Télefono', field: 'telefono', sortable: true },
    { name: 'estado', label: 'Estado', field: 'estado' },
    { name: 'opciones', label: "Opciones", field: 'opciones' },
]

const useUsuari = useUsuarioStore();

async function buscar() {
    usuarios.value = await useUsuari.buscarUsuarios();
    console.log(usuarios.value);
    // usuarioFiltrado.value = usuarios.filter(x => x.rol === 'Instructor')
}
buscar();

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    cedula.value = "";
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    correo.value = "";
    clave.value = "";
    red.value = "";
    cv.value = "";
    rol.value = "";
    perfilProfesional.value = "";
}

async function agregarU() {
    console.log("entro a agregar");
    await useUsuari.agregarUsuario({
        cedula: cedula.value,
        nombre: nombre.value,
        apellidos: apellido.value,
        telefono: telefono.value,
        correo: correo.value,
        clave: clave.value,
        redConocimiento: red.value,
        hojaDeVida: cv.value,
        rol: rol.value,
        perfilProfesional: perfilProfesional.value,
    });
    $q.notify({
        message: 'Usuario agregado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

function editarUsuario(x) {
    console.log("Entró a editar", x);
    bd.value = 0;
    id.value = x._id;
    cedula.value = x.cedula;
    nombre.value = x.nombre;
    apellido.value = x.apellidos;
    telefono.value = x.telefono;
    correo.value = x.correo;
    clave.value = x.clave;
    red.value = x.redConocimiento;
    cv.value = x.hojaDeVida;
    rol.value = x.rol;
    perfilProfesional.value = x.perfilProfesional;
    agregar.value = true;
}
async function actualizar() {
    await useUsuari.actualizarUsuario(
        id.value,
        cedula.value,
        nombre.value,
        apellido.value,
        telefono.value,
        correo.value,
        clave.value,
        red.value,
        cv.value,
        rol.value,
        perfilProfesional.value
    );
    $q.notify({
        message: 'Usuario editado exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

async function editarEstado(x) {
    console.log("entre a editar estado");
    try {
        if (x.estado === 1) {
            x.estado = 0
        } else {
            x.estado = 1
        }
        const res = await useUsuari.cambiarEstado(x._id, x.estado)
        buscar()
    } catch (error) {
        console.log(error);
    }
}
</script>
  
<style scoped></style>
  