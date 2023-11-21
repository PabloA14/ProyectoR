import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useProyectosStore = defineStore("proyecto", () => {
    let proyectoRecuperado = ref({})

    const buscarProyectos = async () => {
        try {
            console.log("Haciendo la solicitud para buscar proyectos...");
            const buscar = await axios.get(`${LinkBD}/api/proyecto`);
            proyectoRecuperado.value = buscar.data.guia
            console.log("Proyectos recuperados store : ------", proyectoRecuperado.value);
        } catch (error) {
            console.log("Error al buscar proyectos:", error.response);
        }
    }

    const agregarProyecto = async (info) => {
        console.log(info);
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
        editarProyecto,
        proyectoRecuperado
    }

},{persist: true})


