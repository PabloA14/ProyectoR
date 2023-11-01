import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const UsesRegistroCalificado = defineStore("RegistroCalificado", () => {
    let loading = ref(false)


    const agregarRegistroC = async (info) => {
        try {
            const newU = await axios.post(`${LinkBD}/api/registroCalificado`, info);
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };


    return {
        agregarRegistroC,
  
    }
    
});