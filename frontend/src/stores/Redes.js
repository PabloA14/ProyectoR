import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useRedStore = defineStore("redes", () => {
    const buscarRedes = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/redes`);
            return buscar.data.redes;
        } catch (error) {
            console.log(error.response);
        }
    };
    const actualizarRedes = async (
        id, codigo, denominacion) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/redes/${id}`, {
                codigo, denominacion
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const agregarRedes = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/redes`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const cambiarEstado = async (id, estado) => {
        try {
            let res = await axios.patch(`${LinkBD}/api/redes/${id}`, {
                estado: estado
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        buscarRedes,
        actualizarRedes,
        agregarRedes,
        cambiarEstado
    };
});
