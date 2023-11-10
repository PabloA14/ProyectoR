import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";


export const useApoyo = defineStore("matApoyo", () => {
    let loading = ref(false)
    const buscarMatApoyo = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/materialesApoyo`);
            return buscar.data.mat;
        } catch (error) {
            loading.value = true
            console.log(error.response);
        } finally {
            loading.value = false
        }
    };

    const actualizarMatApoyo = async (id, nombre, enlace, documento) => {
        try {
            const formData = new FormData();

            //formData.append('codigo', codigo);
            formData.append('nombre', nombre);
            formData.append('enlace', enlace)

            if (documento) {
                formData.append('documento', documento);
            }

            let datos = await axios.put(`${LinkBD}/api/materialesApoyo/${id}`, formData, {
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

    const agregarMatApoyo = async (info, documento) => {
        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documento', documento)

            const newU = await axios.post(`${LinkBD}/api/materialesApoyo`, formData, {
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
        buscarMatApoyo,
        actualizarMatApoyo,
        agregarMatApoyo,
        loading
    }
});
