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

  return {
    buscarRoles,
    
  };
});
