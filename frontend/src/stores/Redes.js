import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useRedStore = defineStore("redes", () => {
    let loading = ref(false)

    const buscarRedes = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/redes`);
            return buscar.data.redes;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };
    const actualizarRedes = async (
        id, denominacion) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/redes/${id}`, {
                denominacion
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
        cambiarEstado,
        loading
    }

});
