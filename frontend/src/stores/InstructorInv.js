import { defineStore } from "pinia";
import axios from 'axios';

export const useInstructorStore = defineStore("Instructor", () => {

    const buscarInstructores = async () =>{
        try{
            const buscar =await axios.get(`http://localhost:4508/api/instructor/todos`)
            return buscar.data.instructores
        }catch (error){
            console.log("error");
        }

    }

    return {
        buscarInstructores
    }

})
