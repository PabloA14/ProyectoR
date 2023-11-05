<template>
  <q-page class="pagina">
    <div>
      <img src="../imagenes/logoSenaGris.png" class="centrada">
      <h3 class="centrada2" style="font-weight: bold;">¡Bienvenid@ {{nombe}}! </h3>
      
    </div>
    
  </q-page>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from "../stores/Usuarios.js"
import { useQuasar } from 'quasar'

let nombe = ref()
let useUsuario = useUsuarioStore()
let rol = useUsuario.rol
let datos = useUsuario.usuario
console.log(datos);
nombe.value = datos.nombre
console.log(nombe);

</script>


<style scoped>
.centrada {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centrada2{
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>