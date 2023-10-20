import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useCentroStore = defineStore("Centros", () => {
  let loading = ref(false)

  const buscarCentros = async () => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/centrosF/`);
      return buscar.data.centros
    } catch (error) {
      loading.value = true
      console.log(error.response);
    } finally {
      loading.value = false
    }
  };

  const actualizarCentros = async (id, codigo, nombre, direccion, ciudad) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/centrosF/${id}`, {
        codigo, nombre, direccion, ciudad
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const agregarCentro = async (info) => {
    try {
      const newU = await axios.post(`${LinkBD}/api/centrosF`, info);
      return newU;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`${LinkBD}/api/centrosF/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    buscarCentros,
    agregarCentro,
    actualizarCentros,
    cambiarEstado,
    loading
  }
});
