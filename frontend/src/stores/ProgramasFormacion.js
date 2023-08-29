import { defineStore } from "pinia";
import axios from 'axios';

export const UseProgramasFormacion = defineStore("Programas", () => {

    const getProgramas = async () => {
        try {
            const programas = await axios.get(`http://localhost:4508/api/programasFormacion/traer/todos`)
            return programas.data.programas

        } catch (error) {
            console.log(error);

        }
    }

    const agregarProgramaFormacion = async (info) => {
        try {
            let datos = await axios.post(`http://localhost:4508/api/programasFormacion`, info)
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