import {defineStore} from 'pinia'


export const useUserStore =defineStore(
    "pk",
    {
        state : () =>({
            nombre: "prueba como puso rosa",
            informacionPrograma:[],
            informacionToken:"",
        })
    }
)


