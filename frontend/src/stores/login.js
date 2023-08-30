import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables.js";
//import { ref } from "vue"

export const useLoginStore = defineStore("login", () => {
    //let loading = ref(false)

    const logeo = async (cedula, clave) => {
        try {
            //loading.value = true
            let datos = await axios.post(`${LinkBD} /api/login`,
                { cedula: cedula, clave: clave });
            //console.log(datos);
            return datos;
        } catch (error) {
            //loading.value = true
            console.log(error);
            throw error
        } finally {
            //loading.value = false
        }
    };
    return {
        logeo,
        //loading
    };
});