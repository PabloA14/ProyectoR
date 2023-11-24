import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useColorStore = defineStore("Color", () => {
    let loading = ref(false)
    let idMongo = ref('')
    let configuracion = ref([])


    const agregarConfiguracion = async (info) => {
        try {
            loading.value = true;
            let datos = await axios.post(`${LinkBD}/api/color`, info);
            configuracion.value = datos
            console.log(configuracion.value);
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
            idMongo.value = color.data.colores[0]._id
            configuracion.value = color.data.colores[0]
            return color.data.colores
        } catch (error) {
            loading.value = true
            console.log("error");
            throw error
        } finally {
            loading.value = false
        }
    }


    const ColorLEtra = async (colorletra) => {
        try {
            const id = idMongo.value
            console.log(id);
            console.log(colorletra);
            loading.value = true;
            const response = await axios.put(`${LinkBD}/api/color/${id}`, { colorLetra: colorletra });
            configuracion.value = response.data.red
            console.log(configuracion.value);
            return response.data.red;
        } catch (error) {
            loading.value = true;
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const colorMenu = async (colorMenu) => {
        try {
            const id = idMongo.value
            console.log(colorMenu);
            loading.value = true;
            const response = await axios.put(`${LinkBD}/api/color/${id}`, { colorMenu: colorMenu });
            configuracion.value = response.data.red
            console.log(configuracion.value);
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
        ColorLEtra,
        colorMenu,
        configuracion,
        loading
    };


}, { persist: true })