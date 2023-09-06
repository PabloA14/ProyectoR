import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useRolStore = defineStore("roles", () => {
  const buscarRoles = async () => {
    try {
      const buscar = await axios.get(`${LinkBD}/api/roles`);
      return buscar.data.roles;
    } catch (error) {
      console.log(error.response);
    }
  };

  const actualizarRoles = async (
    id, codigo, denominacion) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/roles/${id}`, {
        codigo, denominacion
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

  return {
    buscarRoles,
    actualizarRoles,
    agregarRoles

  };
});
