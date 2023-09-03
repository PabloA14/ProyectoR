<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h6 text-center q-mb-md">Usuarios</div>

      <q-btn color="secondary" icon="add" label="Agregar Usuario" class="q-mb-md" @click="
        agregar = true;
      nuevo();
      " />

      <q-separator />

      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Rol</th>
            <th>Red de Conocimiento</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in usuarios" :key="index">
            <td>{{ x.cedula }}</td>
            <td>{{ x.nombre }}</td>
            <td>{{ x.apellidos }}</td>
            <td>{{ x.rol }}</td>
            <td>{{ x.redConocimiento }}</td>
            <td :style="{ color: x.estado === 1 ? 'green' : 'red' }">
              {{ x.estado === 1 ? "Activo" : "Inactivo" }}
            </td>
            <td>
              <div>
                <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                  style="margin-right: 10px; cursor: pointer" @click="editarUsuario(x)" />
                <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                  style="margin-left: 10px; cursor: pointer" @click="editarEstado(x)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      x.estado = 2
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

<style>
#card span {
  font-weight: bold;
}
</style>
