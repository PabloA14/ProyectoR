import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useProyectosStore = defineStore("proyecto", () => {
    let loading = ref(false)

    const buscarProyectos = async () => {
        try {
            loading.value = true
            const buscar = await axios.get(`${LinkBD}/api/proyecto`);
            return buscar.data.proyecto;
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    const agregarProyecto = async (info, documento) => {
        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documento', documento)

            const newU = await axios.post(`${LinkBD}/api/proyecto`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            return newU
        } catch (error) {
            throw error
        }

    }

    const editarProyecto = async (id, nombre, descripcion, fecha, version, documento) => {
        try {
            const formData = new FormData();

            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('fecha', fecha);
            formData.append('version', version)
            formData.append('documento', documento);

            let datos = await axios.put(`${LinkBD}/api/proyecto/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return datos;
        } catch (error) {
            throw error;
        }
    }

    return {
        buscarProyectos,
        agregarProyecto,
        editarProyecto,
        loading
    }

})

