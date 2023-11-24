<template>
  <div>
    <h1>Recuperacion de contraseña</h1>
    <div>
      <span>Digite La nueva Contraseña</span>
      <input type="text" placeholder="Contraseña" v-model="contrasena1" />
      <input type="text" placeholder="Contraseña" v-model="contrasena2" />
    </div>
    <div>
      <button @click="cambioContrasena()">Cabiar Contraseña</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const useUsuario = useUsuarioStore();
const router = useRouter();

let contrasena1 = ref("");
let contrasena2 = ref("");
const $q = useQuasar();

async function cambioContrasena() {
  const recuperacion = router.currentRoute.value.query.reset;
  console.log(recuperacion);
  if (contrasena1.value === "" || contrasena2.value === "") {
    $q.notify({
      message: "Complete todos los campos",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: Math.random() * 3000,
    });
  }
  if (
    contrasena1.value !== contrasena2.value ||
    contrasena2.value !== contrasena1.value
  ) {
    $q.notify({
      message: "Las contraseñas no coinciden",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: Math.random() * 3000,
    });
  } else {
    try {
      if (!recuperacion) {
        $q.notify({
          message: "Token de restablecimiento no disponible",
          color: "negative",
          icon: "warning",
          position: "top",
          timeout: Math.random() * 3000,
        });
      }
      let envio = await useUsuario.nuevaContrasena(
        contrasena2.value,
        recuperacion
      );
      $q.notify({
        message: envio.data.msg,
        color: "green",
        icon: "check",
        position: "bottom",
        timeout: Math.random() * 3000,
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        message: error.response.data.msg,
        color: "negative",
        icon: "warning",
        position: "top",
        timeout: Math.random() * 3000,
      });
    }
  }
}
</script>

<style scoped></style>
