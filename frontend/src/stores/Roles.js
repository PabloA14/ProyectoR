import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useRolStore = defineStore("roles", () => {
  let loading = ref(false)
  const buscarRoles = async () => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/roles`);
      return buscar.data.roles;
    } catch (error) {
      loading.value = true
      console.log(error.response);
    } finally {
      loading.value = false
    }
  };

  const actualizarRoles = async (
    id, denominacion) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/roles/${id}`, {
        denominacion
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const agregarRoles = async (info) => {
    try {
      const newU = await axios.post(`${LinkBD}/api/roles`, info);
      return newU;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`${LinkBD}/api/roles/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    buscarRoles,
    actualizarRoles,
    agregarRoles,
    cambiarEstado,
    loading

  }
}
);
