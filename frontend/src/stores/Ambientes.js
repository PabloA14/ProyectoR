import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useAmbienteStore = defineStore("ambientes", () => {
    const buscarAmbientes = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/ambientes`);
            return buscar.data.ambiente;
        } catch (error) {
            console.log(error.response);
        }
    };
    const actualizarAmbientes = async (
        id, codigo, nombre, centroformacion, descripcion, archivo) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/ambientes/${id}`, {
                codigo, nombre, centroformacion, descripcion, archivo
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const agregarAmbientes = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/ambientes`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const cambiarEstado = async (id, estado) => {
        try {
            let res = await axios.patch(`${LinkBD}/api/ambientes/${id}`, {
                estado: estado
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        buscarAmbientes,
        actualizarAmbientes,
        agregarAmbientes,
        cambiarEstado
    };
});
