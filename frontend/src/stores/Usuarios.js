import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useUsuarioStore = defineStore("usuario", () => {
  let loading = ref(false)
  let rol = ref('')
  let token = ref('')

  const buscarUsuarios = async () => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/usuario`);
      return buscar.data.usuarios;
    } catch (error) {
      loading.value = true
      console.log(error.response);
    } finally {
      loading.value = false
    }
  };

  const actualizarUsuario = async (
    id, cedula, nombre, apellidos, telefono, correo, redConocimiento, hojaDeVida, rol, perfilProfesional) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/usuario/${id}`, {
        cedula, nombre, apellidos, telefono, correo, redConocimiento, hojaDeVida, rol, perfilProfesional
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const agregarUsuario = async (info) => {
    try {
      const newU = await axios.post(`${LinkBD}/api/usuario`, info);
      return newU;
    } catch (error) {
      throw error;
    }
  };
  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`${LinkBD}/api/usuario/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const logeo = async (cedula, clave) => {

    try {
      loading.value = true
      let datos = await axios.post(`${LinkBD}/api/usuario/login`,
        { cedula: cedula, clave: clave })
      rol.value = datos.data.user.rol.denominacion
      token.value = datos.data.token

      console.log(datos);
      return datos;
    } catch (error) {
      loading.value = true
      console.log(error);
      throw error
    } finally {
      loading.value = false
    }
  };

  return {
    buscarUsuarios,
    agregarUsuario,
    actualizarUsuario,
    cambiarEstado,
    token,
    rol,
    logeo,
    loading
  };
});