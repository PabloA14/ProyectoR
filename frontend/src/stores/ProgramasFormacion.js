import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";

export const UseProgramasFormacion = defineStore("Programas", () => {

    const getProgramas = async () => {
        try {
            const programas = await axios.get(`${LinkBD} /api/programasFormacion/traer/todos`)
            return programas.data.programas

        } catch (error) {
            console.log(error);

        }
    }

    const agregarProgramaFormacion = async (info) => {
        try {
            let datos = await axios.post(`${LinkBD} /api/programasFormacion`, info)
            return datos

        } catch (error) {
            throw error;

        }
    }


    return {
        getProgramas,
        agregarProgramaFormacion
    }
}) 