import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    "guardar",
    {
        state: () => ({
            nombre: "prueba",
            informacionToken: ""
        })
    },
    {persist:true}
)


