import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useMaterialStore = defineStore("materiales", () => {
    const buscarMateriales = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/materiales`);
            return buscar.data.material;
        } catch (error) {
            console.log(error.response);
        }
    };
    const actualizarMateriales = async (
        id, codigo, nombre, tipo, descripcion, documentacion) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/materiales/${id}`, {
                codigo, nombre, tipo, descripcion, documentacion
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const agregarMateriales = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/materiales`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const cambiarEstado = async (id, estado) => {
        try {
            let res = await axios.patch(`${LinkBD}/api/materiales/${id}`, {
                estado: estado,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        buscarMateriales,
        actualizarMateriales,
        agregarMateriales,
        cambiarEstado
    };
});
