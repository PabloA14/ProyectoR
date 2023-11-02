import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const UsesRegistroCalificado = defineStore("RegistroCalificado", () => {
    let loading = ref(false)

    const agregarRegistroC = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/registroCalificado`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const buscarRegistros = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/registroCalificado`);
            return buscar.data.registroC;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };

    const buscarRegistrosCodigo = async (codigosnies) => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/registroCalificado/${codigosnies}`);
            return buscar.data;
        } catch (error) {
            console.log(error.response);
        }
    };

    const actualizarRegistro = async (
        id, titulo, lugardesarrollo, metodologia, creditos, codigosnies, fecha) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/registroCalificado/${id}`, {
                titulo, lugardesarrollo, metodologia, creditos, codigosnies, fecha
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    return {
        agregarRegistroC,
        buscarRegistros,
        actualizarRegistro,
        buscarRegistrosCodigo,
        loading
    }

});