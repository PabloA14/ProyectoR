<template>
  <div>
    <q-page class="q-pa-md">
      <div class="text-h6 text-center q-mb-md">Instructores</div>

      <q-btn color="secondary" icon="add" label="Agregar Instructor" class="q-mb-md" @click="agregar = true" />

      <q-separator />
      <q-card v-for="(x, index) in instructores" :key="index" class="q-mb-md" style="width: 100%;" id="card">
        <q-card-section>
          <span>Nombre :</span>
          <q-item-label lines="1" class="text-small">{{ x.nombre }}</q-item-label>
          <span>Apellidos:</span>
          <q-item-label lines="1" class="text-small">{{ x.apellidos }}</q-item-label>
          <span>Estado:</span>
          <q-item-label lines="1" class="text-small">{{ x.estado }}</q-item-label>
          <span>Correo:</span>
          <q-item-label lines="1" class="text-small">{{ x.correo }}</q-item-label>
        </q-card-section>
      </q-card>
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
            <label for="fecNa">Fecha de nacimiento</label>
            <q-input outlined v-model="fecNa" id="fecNa" />
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
            <label for="perfilProfesional">Perfil Profesional</label>
            <q-input outlined v-model="perfilProfesional" id="perfilProfesional" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useInstructorStore } from "../stores/InstructorInv.js";
const useInstructor = useInstructorStore();
let agregar = ref(false);

let instructores = ref([]);

async function Registrar() {

}

async function buscar() {
  instructores.value = await useInstructor.buscarInstructores();
}

buscar();
</script>
  
<style>
#card span {
  font-weight: bold;
}
</style>
  