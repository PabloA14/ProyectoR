import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useProgramasFormacionStore = defineStore("ProgramasFormacion", () => {
  let loading = ref(false)

  const getProgramas = async () => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/programasFormacion`);
      return buscar.data.programas;
    } catch (error) {
      loading.value = true
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  const agregarProgramaFormacion = async (info) => {
    try {
      const datos = await axios.post(`${LinkBD}/api/programasFormacion`, info);
      return datos
    } catch (error) {
      console.log(error)
      throw error
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
      return datos
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

  const asignarMateriales = async (id, materialesformacion) => {
    try {
      const res = await axios.post(`${LinkBD}/api/programasFormacion/asignarMateriales/${id}`, {
        materialesformacion: materialesformacion
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProgramas,
    agregarProgramaFormacion,
    actualizarProgramaFormacion,
    cambiarEstado,
    asignarMateriales,
    loading
  }


});


