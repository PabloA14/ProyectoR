import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables";
import { ref } from "vue";

export const useProyectosStore = defineStore("proyecto", () => {
    const buscarProyectos = async () => {
        try {
            console.log("Haciendo la solicitud para buscar proyectos...");
            const buscar = await axios.get(`${LinkBD}/api/proyecto`);
            // return buscar.data
            console.log("Proyectos recuperados:", buscar.data);
            return buscar.data;
        } catch (error) {
            console.log("Error al buscar proyectos:", error.response);
        }
    }

    const agregarProyecto = async (info) => {
        try {
            console.log("Haciendo la solicitud para agregar proyecto...");
            const agregar = await axios.post(`${LinkBD}/api/proyecto`, info);
            console.log("Proyecto agregado:", agregar.data);
            return agregar.data;
        } catch (error) {
            console.log("Error al agregar proyecto:", error.response);
            throw error;
        }
    }

    const editarProyecto = async (id, info) => {
        try {
            console.log(`Haciendo la solicitud para editar proyecto con ID ${id}...`);
            const editar = await axios.put(`${LinkBD}/api/proyecto/${id}`, info);
            console.log("Proyecto editado:", editar.data);
            return editar.data;
        } catch (error) {
            console.log(`Error al editar proyecto con ID ${id}:`, error.response);
            throw error;
        }
    }









    return {
        buscarProyectos,
        agregarProyecto,
        editarProyecto
    }

})


