import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useColorStore = defineStore("Color", () => {
    let loading = ref(false)

    const agregarConfiguracion = async (info) => {
        try {
            loading.value = true;
            let datos = await axios.post(`${LinkBD}/api/color`, info);
            return datos;
        } catch (error) {
            loading.value = true;
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const traerConfiguracion = async () => {
        try {
            loading.value = true
            const color = await axios.get(`${LinkBD}/api/color`)
            return color.data.colores
        } catch (error) {
            loading.value = true
            console.log("error");
            throw error
        } finally {
            loading.value = false
        }
    }


    const editarConfiguracion = async (id, colorletra, colormenu) => {
        try {
            loading.value = true;
            const response = await axios.put(`${LinkBD}/api/color/${id}`, {
                colorletra: colorletra, colormenu:colormenu
            });
            return response;
        } catch (error) {
            loading.value = true;
            throw error;
        } finally {
            loading.value = false;
        }
    };


    return {
        agregarConfiguracion,
        traerConfiguracion,
        editarConfiguracion,
        loading
    };


})