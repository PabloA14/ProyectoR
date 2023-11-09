import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables";
import { ref } from "vue";

export const usegiasStore = defineStore("Guia", () => {

    const buscarguia = async () => {
        try {
            console.log("Haciendo la solicitud para buscar guia de red...");
            const buscar = await axios.get(`${LinkBD}/api/guia`);
            // return buscar.data
            console.log("Guia recuperados:", buscar.data.guia);
            return buscar.data.guia;
        } catch (error) {
            console.log("Error al buscar Gia:", error.response);
        }
    }

    const agregarGuia = async (info, documento) => {
        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documento', documento)

            const newU = await axios.post(`${LinkBD}/api/guia`, formData, {
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

    const actualizarGuia = async (id, codigo, nombre, documento) => {
        try {
            const formData = new FormData();

            formData.append('codigo', codigo);
            formData.append('nombre', nombre);
            formData.append('documento', documento);

            let datos = await axios.put(`${LinkBD}/api/guia/${id}`, formData, {
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

    return {
        buscarguia,
        agregarGuia,
        actualizarGuia

    }
})