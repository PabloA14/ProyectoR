import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useUsuarioStore = defineStore("usuario", () => {
  const buscarUsuarios = async () => {
    try {
      const buscar = await axios.get(`${LinkBD}/api/usuario/todos`);
      buscar.data.usuarios.reverse();
      return buscar.data.usuarios;
    } catch (error) {
      console.log(error.response);
    }
  };

  const actualizarUsuario = async (
    id,cedula,nombre,apellidos,telefono,clave,correo,redConocimiento,hojaDeVida,rol,perfilProfesional,estado) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/usuario/${id}`, {
        cedula,nombre,apellidos,telefono,clave,correo,redConocimiento,hojaDeVida,rol,perfilProfesional,estado
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
  const cambiarEstado = async (id, estado) => {
    console.log(id, estado);
    try {
      let res = await axios.patch(`${LinkBD}/api/usuario/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      throw new Error(
        `Error al cambiar el estado del usuario: ${error.message}`
      );
    }
  };

  return {
    buscarUsuarios,
    agregarUsuario,
    actualizarUsuario,
    cambiarEstado,
  };
});
