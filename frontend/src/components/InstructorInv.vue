<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h6 text-center q-mb-md">Instructores</div>

      <q-btn color="secondary" icon="add" label="Agregar Instructor" class="q-mb-md" @click="agregar = true" />

      <q-separator />

      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Correo Electronico</th>
            <th>Telefono</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in usuarios" :key="index">
            <td>{{ x.nombre }}</td>
            <td>{{ x.correo }}</td>
            <td>{{ x.telefono }}</td>
            <td :style="{ color: x.estado === 1 ? 'green' : 'red' }">{{ x.estado === 1 ? 'Activo' : 'Inactivo'
            }}</td>
            <td>
              <div>
                <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                  style="margin-right: 10px;cursor: pointer;" />
                <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                  style="margin-left: 10px;cursor: pointer;" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </q-page>

    <q-dialog v-model="agregar">
      <q-card>
        <q-card-section>
          <div class="text-h6">Agregar Instructor</div>
        </q-card-section>

        <q-separator />
        <q-card-section style="max-height: 50vh ;" class="scroll" id="agregar">
          <div class="q-mb-md">
            <label for="cedula">Cédula</label>
            <q-input outlined v-model="cedula" id="cedula" />
          </div>

          <div class="q-mb-md">
            <label for="nombre">Nombre</label>
            <q-input outlined v-model="nombre" id="nombre" />
          </div>

          <div class="q-mb-md">
            <label for="apellido">Apellido</label>
            <q-input outlined v-model="apellido" id="apellido" />
          </div>

          <div class="q-mb-md">
            <label for="telefono">Teléfono</label>
            <q-input outlined v-model="telefono" id="telefono" />
          </div>

          <div class="q-mb-md">
            <label for="clave">Clave</label>
            <q-input outlined v-model="clave" id="clave" />
          </div>

          <div class="q-mb-md">
            <label for="correo">Correo</label>
            <q-input outlined v-model="correo" id="correo" />
          </div>



          <div class="q-mb-md">
            <label for="red">Red Conocimiento</label>
            <q-input outlined v-model="red" id="red" />
          </div>

          <div class="q-mb-md">
            <label for="cv">Hoja de vida</label>
            <q-input outlined v-model="cv" id="cv" />
          </div>

          <div class="q-mb-md">
            <label for="cv">Rol </label>
            <q-input outlined v-model="rol" id="cv" />
          </div>

          <div class="q-mb-md">
            <label for="perfilProfesional">Perfil Profesional</label>
            <q-input outlined v-model="perfilProfesional" id="perfilProfesional" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup @click="agregarU()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from "../stores/InstructorInv.js";
let agregar = ref(false);
let cedula = ref('')
let nombre = ref('')
let apellido = ref('')
let telefono = ref('')
let clave = ref('')
let correo = ref('')
let red = ref('')
let cv = ref('')
let rol = ref('')
let usuarios =ref([])
let perfilProfesional = ref('')
let usuarioFiltrado = ref([])
const useUsuari = useUsuarioStore();


async function buscar() {
   usuarios.value = await useUsuari.buscarUsuarios();
   console.log(usuarios.value);
  // usuarioFiltrado.value = usuarios.filter(x => x.rol === 'Instructor')
}
buscar();

async function agregarU() {
  console.log("entro a agregar");
  await useUsuari.agregarUsuario(
    {
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellido.value,
      telefono: telefono.value,
      correo: correo.value,
      clave: clave.value,
      redConocimiento: red.value,
      hojaDeVida: cv.value,
      rol: rol.value,
      perfilProfesional: perfilProfesional.value
    }
  )
  buscar()
}
</script>
  
<style>
#card span {
  font-weight: bold;
}
</style>



  