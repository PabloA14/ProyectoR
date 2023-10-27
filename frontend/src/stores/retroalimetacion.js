import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables";
import { ref } from "vue";

export const useRetroalimentacionStore = defineStore("Retroalimentacion", () => {

    const buscarRetroalimentacion = async () => {
        try {
            console.log("Haciendo la solicitud para buscar retoalimentacion de red...");
            const buscar = await axios.get(`${LinkBD}/api/retroalimentacion`);
            // return buscar.data
            console.log("Retroalimentacion recuperados:", buscar.data);
            return buscar.data;
        } catch (error) {
            console.log("Error al buscar proyectos:", error.response);
        }
    }

    return {
        buscarRetroalimentacion

    }
})