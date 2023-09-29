import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useCiudadStore = defineStore("ciudades", () => {

    const buscarCiudad = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/ciudades`);
            return buscar.data.ciudades;
        } catch (error) {
            console.log(error.response);
        }
    };
    return {
        buscarCiudad
    };
});
