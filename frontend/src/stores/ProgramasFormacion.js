import { defineStore } from "pinia";
import axios from 'axios';
import { LinkBD } from "../routes/variables.js";
import { ref } from "vue";

export const useProgramasFormacionStore = defineStore("ProgramasFormacion", () => {
  let loading = ref(false)
  let programa = ref({})
  let instructores = ref({})

  const getProgramas = async () => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/programasFormacion`);
      return buscar.data.programas;
    } catch (error) {
      loading.value = true
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  const agregarProgramaFormacion = async (info, disCurricular) => {
    try {

      const formData = new FormData()
      for (const key in info) {
        formData.append(key, info[key])
      }
      formData.append('disCurricular', disCurricular)

      const datos = await axios.post(`${LinkBD}/api/programasFormacion`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return datos

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const agregarInstructores = async (id, instructores) => {
    try {
      loading.value = true;
      const nuevoInstructor = axios.post(`${LinkBD}/api/programasFormacion/agregar/instructor/${id}`,
        { instructores: instructores })
      return nuevoInstructor;

    } catch (error) {
      loading.value = true
      console.log(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const informacionPrograma = async (codigo) => {
    try {
      loading.value = true
      let r = await axios.get(`${LinkBD}/api/programasFormacion/traer/${codigo}`)
      programa.value = r.data;
      instructores.value = r.data.instructores
      return r
    } catch (error) {
      loading.value = true
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  const addDesarrollo = async () => {
    try {
      const datos = await axios.post(`${LinkBD}/api/desarrollo`)
      return datos
    } catch (error) {
      throw error
    }
  }

  const updatedDesarrollo = async (id, desarrolloCurricular) => {
    try {
      const datos = await axios.put(`${LinkBD}/api/programasFormacion/editarDesarrollo/${id}`, {
        desarrolloCurricular
      });
      return datos
    } catch (error) {
      throw error.data;
    }
  }

  const actualizarProgramaFormacion = async (id, codigo, denominacionPrograma, nivelFormacion, version) => {
    try {
      const datos = await axios.put(`${LinkBD}/api/programasFormacion/${id}`, {
        codigo,
        denominacionPrograma,
        nivelFormacion,
        version
      });
      return datos
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const cambiarEstado = async (id, estado) => {
    try {
      const res = await axios.patch(`${LinkBD}/api/programasFormacion/${id}`, {
        estado: estado,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const asignarMateriales = async (id, materialesformacion) => {
    try {
      const res = await axios.post(`${LinkBD}/api/programasFormacion/asignarMateriales/${id}`, {
        materialesformacion
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error
    }
  };

  const getMaterialesPrograma = async (id) => {
    try {
      loading.value = true
      const buscar = await axios.get(`${LinkBD}/api/programasFormacion/materiales/${id}`);
      return buscar.data.materiales;
    } catch (error) {
      loading.value = true
      console.log(error);
    } finally {
      loading.value = false
    }
  };

  const asignarAmbientes = async (id, ambienteFormacion) => {
    try {
      const res = await axios.post(`${LinkBD}/api/programasFormacion/asignarAmbientes/${id}`, {
        ambienteFormacion
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error
    }
  };

  const putDiseno = async (id, disCurricular) => {
    try {
      const formData = new FormData()
      formData.append('disCurricular', disCurricular)
      const res = await axios.put(`${LinkBD}/api/programasFormacion/editarDiseno/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (error) {
      throw error
    }
  };

  return {
    getProgramas,
    agregarProgramaFormacion,
    actualizarProgramaFormacion,
    cambiarEstado,
    asignarMateriales,
    putDiseno,
    loading,
    programa,
    instructores,
    addDesarrollo,
    updatedDesarrollo,
    informacionPrograma,
    agregarInstructores,
    getMaterialesPrograma,
    asignarAmbientes
  }

},
  {
    persist: true
  }
);