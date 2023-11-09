import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useInstrumento = defineStore("instrumento", () => {
    let loading = ref(false)
    const buscarInstrumentos = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/instrumentos`);
            return buscar.data.inst;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };

    const actualizarInstrumento = async (id, codigo, nombre, documento) => {
        try {
            const formData = new FormData();

            formData.append('codigo', codigo);
            formData.append('nombre', nombre);

            if (documento) {
                formData.append('documento', documento);
            }

            let datos = await axios.put(`${LinkBD}/api/instrumentos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const agregarInstrumento = async (info, documento) => {
        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documento', documento)

            const newU = await axios.post(`${LinkBD}/api/instrumentos`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
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
        buscarInstrumentos,
        actualizarInstrumento,
        agregarInstrumento,
        loading

    }
});
