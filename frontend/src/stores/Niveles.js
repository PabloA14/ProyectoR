import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useNivelStore = defineStore("niveles", () => {
    const buscarNiveles = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/nivelesFormacion`);
            return buscar.data.nivelFormacion;
        } catch (error) {
            console.log(error.response);
        }
    };
    const actualizarNiveles = async (
        id, codigo, denominacion) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/nivelesFormacion/${id}`, { codigo, denominacion });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };
    const agregarNiveles = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/nivelesFormacion`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const cambiarEstado = async (id, estado) => {
        try {
            let res = await axios.patch(`${LinkBD}/api/nivelesFormacion/${id}`, {
                estado: estado
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        buscarNiveles,
        actualizarNiveles,
        agregarNiveles,
        cambiarEstado
    };
});
