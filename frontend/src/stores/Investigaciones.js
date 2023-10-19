import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useInveStore = defineStore("investigacion", () => {
    let loading = ref(false)
    const buscarInvestigacion = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/investigaciones`);
            return buscar.data.investigacion;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };

    const actualizarInves = async (
        id, codigo, denominacion, descripcion, fecha, documentos) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/investigaciones/${id}`, {
                codigo, denominacion, descripcion, fecha, documentos
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const agregarInves = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/investigaciones`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    /* const cambiarEstado = async (id, estado) => {
        try {
            let res = await axios.patch(`${LinkBD}/api/roles/${id}`, {
                estado: estado,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }; */

    return {
        buscarInvestigacion,
        actualizarInves,
        agregarInves,
        loading

    },
    { persist: true };
});
