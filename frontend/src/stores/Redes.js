import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";

export const useRedStore = defineStore("redes", () => {
    const buscarRedes = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/redes`);
            return buscar.data.redes;
        } catch (error) {
            console.log(error.response);
        }
    };

    return {
        buscarRedes,
    };
});
