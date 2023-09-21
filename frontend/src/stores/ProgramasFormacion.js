import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";

export const useProgramasFormacionStore = defineStore("ProgramasFormacion", () => {

  const getProgramas = async () => {
    try {
      const programas = await axios.get(`${LinkBD}/api/programasFormacion/`);
      return programas.data.programas;
    } catch (error) {
      console.log(error);
    }
  }

  const agregarProgramaFormacion = async (info) => {
    console.log("asdasdad",info);
    try {
      const datos = await axios.post(`${LinkBD}/api/programasFormacion`, info,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return datos.data;
    } catch (error) {
      console.log(error);;
    }
  }

  const actualizarProgramaFormacion = async (id, codigo, denominacionPrograma, nivelFormacion, version) => {
    try {
      const datos = await axios.put(`${LinkBD}/api/programasFormacion/${id}`, {
        codigo,
        denominacionPrograma,
        nivelFormacion,
        version
      });
      return datos.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const cambiarEstado = async (id, estado) => {
    try {
      const res = await axios.patch(`${LinkBD}/api/programasFormacion/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProgramas,
    agregarProgramaFormacion,
    actualizarProgramaFormacion,
    cambiarEstado
  }
});


