<template>
  <div>
    <h4 style="text-align: center;">Recuperación de contraseña</h4>
    <div style="display: grid;place-items: center;" class="q-pa-md row items-start q-gutter-md">
      <q-card white bordered id="card">
        <q-card-section class="q-gutter-md">
          <p>Digite su nueva contraseña (debe contener mínimo 8 caracteres):</p>
          <q-input filled v-model="contrasena1" label="Nueva Contraseña*">
          </q-input>
          <q-input filled v-model="contrasena2" label="Confirmar Contraseña*">
          </q-input>
        </q-card-section>

        <q-card-actions align="center">
          <div class="row">
            <q-spinner style="margin: 0 auto;" color="black" size="2em" :thickness="10"
              v-if="useUsuario.loading === true" />
            <q-btn v-else @click="cambioContrasena()" label="Aceptar"
              :style="{ backgroundColor: colorMenu, color: colorLetra }" />
          </div>
        </q-card-actions>
      </q-card>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/Usuarios.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useColorStore } from "../stores/colorSetings.js";

let colores = useColorStore();
let colorMenu = ref("")
let colorLetra = ref("")
const useUsuario = useUsuarioStore();
const router = useRouter();

let contrasena1 = ref("");
let contrasena2 = ref("");
const $q = useQuasar();

onMounted(async () => {
  await colores.traerConfiguracion()
  colorMenu.value = colores.configuracion.colorMenu
  colorLetra.value = colores.configuracion.colorLetra
})

async function cambioContrasena() {
  const recuperacion = router.currentRoute.value.query.reset;
  if (contrasena1.value === "" || contrasena2.value === "") {
    $q.notify({
      message: "Complete todos los campos",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: 3000,
    });
  } else if (
    contrasena1.value !== contrasena2.value ||
    contrasena2.value !== contrasena1.value
  ) {
    $q.notify({
      message: "Las contraseñas no coinciden",
      color: "negative",
      icon: "warning",
      position: "top",
      timeout: 3000,
    });
  } else {
    try {
      if (!recuperacion) {
        $q.notify({
          message: "Token de restablecimiento no disponible",
          color: "negative",
          icon: "warning",
          position: "top",
          timeout: 3000,
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
        position: "top",
        timeout: 3000,
      });
      router.push("/")
    } catch (error) {
      if (error.response && error.response.data.errors) {

        const fallo = error.response.data.errors[0].msg

        $q.notify({
          message: fallo,
          color: 'negative',
          icon: 'warning',
          position: 'top',
          timeout: 3000
        })
      }
      else {
        $q.notify({
          message: error.response.data.msg,
          color: "negative",
          icon: "warning",
          position: "top",
          timeout: 3000,
        });
      }
      console.log(error);
    }
  }
}
</script>

<style scoped></style>
