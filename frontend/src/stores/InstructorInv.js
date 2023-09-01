import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useUsuarioStore = defineStore("usuario", () => {
  const buscarUsuarios = async () => {
    try {
      const buscar = await axios.get(`${LinkBD}/api/usuario/todos`);
      return buscar.data.usuarios;
    } catch (error) {
      console.log(error.response);
    }
  };

  const actualizarUsuario = async (
    id,
    cedula,
    nombre,
    apellidos,
    telefono,
    correo,
    clave,
    redConocimiento,
    hojaDeVida,
    rol,
    perfilProfesional
  ) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/usuario/${id}`, {
        cedula,
        nombre,
        apellidos,
        telefono,
        correo,
        clave,
        redConocimiento,
        hojaDeVida,
        rol,
        perfilProfesional,
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const agregarUsuario = async (info) => {
    try {
      const newU = await axios.post(`${LinkBD}/api/usuario/`, info);
      return newU;
    } catch (error) {
      throw error;
    }
  };

  return {
    buscarUsuarios,
    agregarUsuario,
    actualizarUsuario,
  };
});
