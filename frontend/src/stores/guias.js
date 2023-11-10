import { defineStore } from "pinia";
import axios from "axios";
import { LinkBD } from "../routes/variables";
import { ref } from "vue";

export const usegiasStore = defineStore("Guia", () => {
    let loading = ref(false)
    let guia = ref({})
    let fase = ref('')
    const buscarguia = async () => {
        try {
            const buscar = await axios.get(`${LinkBD}/api/guia`);
            console.log("Guia recuperados:", buscar.data.guia);
            return buscar.data.guia;
        } catch (error) {
            console.log(error);
        }
    }
    

    const agregarGuia = async (info, documento) => {

        try {
            const formData = new FormData()
            for (const key in info) {
                formData.append(key, info[key])
            }
            formData.append('documento', documento)

            const newU = await axios.post(`${LinkBD}/api/guia`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            return newU;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const actualizarGuia = async (id, codigo, nombre, documento) => {
        try {
            const formData = new FormData();

            formData.append('codigo', codigo);
            formData.append('nombre', nombre);
            formData.append('documento', documento);

            let datos = await axios.put(`${LinkBD}/api/guia/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return datos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const informacionGuia = async (id) => {
        try {
            loading.value = true
            let r = await axios.get(`${LinkBD}/api/guia/${id}`)
            guia.value = r.data;
            return r
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    return {
        buscarguia,
        agregarGuia,
        actualizarGuia,
        informacionGuia,
        loading,
        guia,
        fase
    }
},
{ persist: true }
)