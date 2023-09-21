import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";


export const useCentros = defineStore("Centros", () => {
  const buscarCentros = async () => {
    try {
      const buscar = await axios.get(`${LinkBD}/api/centrosF/`);
      return buscar.data;
    } catch (error) {
      console.log(error.response);
    }
  };
  const buscarCiudad = async () => {
    try {
      const buscar = await axios.get(`${LinkBD}/api/ciudades`);
      return buscar.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const actualizarCentros = async (id,codigo,nombre,direccion,ciudad) => {
    try {
      let datos = await axios.put(`${LinkBD}/api/centrosF/${id}`, {
        codigo: codigo,
        nombre:nombre,
        direccion: direccion,
        ciudad: ciudad
      });
      return datos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const agregarCentro = async (codigo,nombre,ciudad,direccion) => {
    const info = {codigo,nombre,ciudad,direccion}
    try {
      console.log(info);
      const newU = await axios.post(`${LinkBD}/api/centrosF`, info);
      return newU;
    } catch (error) {
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
    buscarCiudad
  };
});
