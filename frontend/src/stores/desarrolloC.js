import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useDesarrolloCurricular = defineStore("DesarrolloC", () => {
  
  const postMatriz = async (id, matrizcorrelacion) => {
    try {
      const formData = new FormData()
      formData.append('matrizcorrelacion', matrizcorrelacion)
      const res = await axios.put(`${LinkBD}/api/desarrollo/putMatriz/D/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const putProyecto = async (id, proyectoFormativo) => {
    console.log(id, proyectoFormativo)

     try {
      const formData = new FormData()
      formData.append('proyectoFormativo', proyectoFormativo)
      const res = await axios.put(`${LinkBD}/api/desarrollo/proyectoFormativo/updated/D/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    } 
  };

  const putplaneacionPedagogica = async (id, planeacionPedagogica) => {
     try {
      const formData = new FormData()
      formData.append('planeacionPedagogica', planeacionPedagogica)
      const res = await axios.put(`${LinkBD}/api/desarrollo/planecion/updated/Pedagogica/D/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }  
  };

  return {
    postMatriz,
    putProyecto,
    putplaneacionPedagogica
  }

},
{
  persist:true
}
);

