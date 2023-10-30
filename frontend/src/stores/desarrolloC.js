import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useDesarrolloCurricular = defineStore("DesarrolloC", () => {
//   let loading = ref(false)
//   let programa=ref({})

//   const getProgramas = async () => {
//     try {
//       loading.value = true
//       const buscar = await axios.get(`${LinkBD}/api/programasFormacion`);
//       return buscar.data.programas;
//     } catch (error) {
//       loading.value = true
//       console.log(error);
//     } finally {
//       loading.value = false
//     }
//   }

//   const agregarProgramaFormacion = async (info, disCurricular) => {
//     try {

//       const formData = new FormData()
//       for (const key in info){
//         formData.append(key,info[key])
//       }
//       formData.append('disCurricular', disCurricular)

//     const datos = await axios.post(`${LinkBD}/api/programasFormacion`, formData , {
//       headers :{
//         "Content-Type": "multipart/form-data"
//       }
//     });
//       return datos 

//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }

//   const informacionPrograma = async(codigo) =>{
//     try {
//       let r = await axios.get(`${LinkBD}/api/programasFormacion/traer/${codigo}`)
//       programa.value = r.data;
//       console.log(programa.value);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const addDesarrollo = async () => {
//     try {
//       const datos = await axios.post(`${LinkBD}/api/desarrollo`)
//       return datos
//     } catch (error) {
//       throw error
//         }
//   }

//   const updatedDesarrollo = async (id, desarrolloCurricular) => {
//     try {
//       console.log("entro a updated Desarrollo")
//       console.log(id, desarrolloCurricular)
//       const datos = await axios.put(`${LinkBD}/api/programasFormacion/editarDesarrollo/${id}`, {
//         desarrolloCurricular
//       });
//       return datos
//     } catch (error) {
//       throw error.data;
//     }
//   }


//   const actualizarProgramaFormacion = async (id, codigo, denominacionPrograma, nivelFormacion, version) => {
//     try {
//       const datos = await axios.put(`${LinkBD}/api/programasFormacion/${id}`, {
//         codigo,
//         denominacionPrograma,
//         nivelFormacion,
//         version
//       });
//       return datos
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   const cambiarEstado = async (id, estado) => {
//     try {
//       const res = await axios.patch(`${LinkBD}/api/programasFormacion/${id}`, {
//         estado: estado,
//       });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const asignarMateriales = async (id, materialesformacion) => {
//     try {
//       const res = await axios.post(`${LinkBD}/api/programasFormacion/asignarMateriales/${id}`, {
//         materialesformacion: materialesformacion
//       });
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const postMatriz = async (id, matrizcorrelacion) => {
    console.log("post matriz")
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

  return {
    postMatriz,
  }

},
{
  persist:true
}
);