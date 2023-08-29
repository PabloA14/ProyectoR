import { defineStore } from "pinia";
import axios from 'axios';

export const useUsuarioStore = defineStore("usuario", () => {

    const buscarUsuarios = async () => {
        try {
            const buscar = await axios.get(`http://localhost:4508/api/usuario/todos`)
            return buscar.data.usuarios
        } catch (error) {
            console.log(error.response);
        }

    }
    const agregarUsuario = async (info) => {
        try {
            const newU = await axios.post(`http://localhost:4508/api/usuario/`, info)
            return newU

        } catch (error) {
            throw error;

        }
    }

    return {
        buscarUsuarios,
        agregarUsuario
    }

})
