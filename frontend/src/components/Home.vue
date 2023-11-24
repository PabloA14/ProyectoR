<template>
  <q-page class="pagina">
    <div>
      <img src="../imagenes/logoSenaGris.png" class="centrada">
      <h3 class="centrada2" style="font-weight: bold;">¡Bienvenid@ {{ nombre }}! </h3>
    </div>

  </q-page>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from "../stores/Usuarios.js"

let nombre = ref()
let useUsuario = useUsuarioStore()
let datos = useUsuario.usuario
nombre.value = datos.nombre

</script>


<style scoped>
.centrada {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.centrada2 {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>