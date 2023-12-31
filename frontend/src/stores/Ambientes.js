import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useAmbienteStore = defineStore("ambientes", () => {
    let loading = ref(false)

    const buscarAmbientes = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/ambientes`);
            return buscar.data.ambiente;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };
    const actualizarAmbientes = async (
        id, nombre, centroformacion, tipo, descripcion) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/ambientes/${id}`, {
                nombre, centroformacion, tipo, descripcion
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
        cambiarEstado,
        loading
    }
});
