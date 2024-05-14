import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables";
import { ref } from "vue";

export const useRetroalimentacionStore = defineStore("Retroalimentacion", () => {
    let loading = ref(false)

    const buscarRetroalimentacion = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/retroalimentacion`);
            return buscar.data.retroalimentaciones;
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    };

    const agregarRetro = async (info, documentos) => {
        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documentos', documentos)

            const newU = await axios.post(`${LinkBD}/api/retroalimentacion`, formData, {
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

    const actualizarRetro = async (id, nombre, codigoFicha, descripcion, fecha, documentos) => {
        try {
            const formData = new FormData();

            formData.append('nombre', nombre);
            formData.append('codigoFicha', codigoFicha);
            formData.append('descripcion', descripcion);
            formData.append('fecha', fecha);
            formData.append('documentos', documentos);
            

            let datos = await axios.put(`${LinkBD}/api/retroalimentacion/${id}`, formData, {
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
        buscarRetroalimentacion,
        agregarRetro,
        actualizarRetro,
        loading
    }
})