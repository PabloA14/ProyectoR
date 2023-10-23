import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    "programa",
    {
        state: () => ({
            nombre: "prueba",
            informacionPrograma: [],
            informacionToken: "",
        })
    },
    {persist:true}
)


