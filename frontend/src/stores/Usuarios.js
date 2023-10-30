import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuario", () => {
  let loading = ref(false)
  let rol = ref('')
  let token = ref('')
  let usuario = ref({})

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
    id, cedula, nombre, apellidos, telefono, correo, redConocimiento, rol, perfilProfesional) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/usuario/${id}`, {
        cedula, nombre, apellidos, telefono, correo, redConocimiento, rol, perfilProfesional
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const actualizarDatosPersonales = async (
    id, cedula, nombre, apellidos, telefono, correo, perfilProfesional) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/usuario/datosPersonales/${id}`, {
        cedula, nombre, apellidos, telefono, correo, perfilProfesional
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const agregarUsuario = async (info, hojaDeVida) => {
    try {
      console.log(hojaDeVida)
      const formData = new FormData()
      for (const key in info) {
        formData.append(key, info[key])
      }
      formData.append('hojaDeVida', hojaDeVida)
      const newU = await axios.post(`${LinkBD}/api/usuario`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
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
      usuario.value = datos.data.user

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
    actualizarDatosPersonales,
    token,
    rol,
    logeo,
    loading,
    usuario
  }
},
  { persist: true }
);