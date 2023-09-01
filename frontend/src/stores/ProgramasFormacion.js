import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";

export const UseProgramasFormacion = defineStore("Programas", () => {

    const getProgramas = async () => {
        try {
            const programas = await axios.get(`${LinkBD}/api/programasFormacion/traer/todos`)
            // programas.reverse()
            return programas.data.programas

        } catch (error) {
            console.log(error);

        }
    }

    const agregarProgramaFormacion = async (info) => {
        try {
            let datos = await axios.post(`${LinkBD}/api/programasFormacion`, info)
            return datos

        } catch (error) {
            throw error;

        }
    }


    const actualizarProgramaFormacion = async (
        id,
        codigo,
        denominacionPrograma,
        nivelFormacion,
        version

    ) => {
        try {
            let datos = await axios.put(`${LinkBD}/api/programasFormacion/${id}`, {
                codigo,
                denominacionPrograma,
                nivelFormacion,
                version
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return {
        getProgramas,
        agregarProgramaFormacion,
        actualizarProgramaFormacion
    }
}) 