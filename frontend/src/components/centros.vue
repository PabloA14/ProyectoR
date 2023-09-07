<template>

    <div>
        <h4>Centros jejej</h4>
        <button>agregar</button>

        <table>
            <thead>
                <th>Codigo</th>
                <th>Denominacion</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>Opciones</th>
            </thead>
            <tbody v-for="(x,i) in centros.centros " :key="i">
                <td>{{ x.codigo }}</td>
                <td>{{ x.nombre }}</td>
                <td>{{ x.ciudad.nombre }}</td>
                <td>{{ x.direccion }}</td>
                <td>
                    <button @click="editar(x) , editarF=true"> Editar</button>
                </td>
            </tbody>
        </table>
        <!-- FIN DE LA TABLA -->
             <div class="modalAgregar">
      <div v-if="agregar === true">
        <p>Agregar Centro</p>
        <span>Codigo Centro</span>
        <input type="text" v-model="codigo" />
        <span>Nombre</span>
        <input type="text" v-model="nombre" />
        <span>Ciudad</span>
        <select name="ciudad" id="ciudad" v-model="ciudad">
          <option v-for="(x, index) in city.ciudades" :key="index" :value="x._id">
            {{ x.nombre }}
          </option>
        </select>

        <span>Dirección</span>
        <input type="text" v-model="direccion" />
        <div>
            <button @click="agregarCentro()">Agregar centro</button>
        </div>
      </div>
    </div>


    <!-- MODAL EDITAR -->
    <div v-if="editarF ===true">
      <p>Editar centros</p>
      <span>Codigo Centro</span>
        <input type="text" v-model="codigo" />
        <span>Nombre</span>
        <input type="text" v-model="nombre" />

        <span>Ciudad </span>
        <select name="ciudad" id="ciudad" v-model="ciudad2" >
          <option v-for="(x, index) in city.ciudades" :key="index"  :value="x._id">
            {{ x.nombre }} 
          </option>
        </select>

        <span>Dirección</span>
        <input type="text" v-model="direccion" />

        <button @click="guardarEdicion()">guardar </button>


    </div>
  </div> 


  
</template>


<script setup> 
import { ref } from 'vue';
import {useCentros} from "../stores/centros.js"
const useCentro = useCentros()
let centros =ref([])
let codigo =ref('')
let nombre =ref('')
let ciudad =ref('')
let ciudad2=ref('')
let direccion=ref('')
let id =ref('')
let editarF=ref(false)
let agregar =ref(false)

let city=ref([])

traerCentros();
async function traerCentros() {
  try {
    centros.value = await useCentro.buscarCentros();
    city.value = await useCentro.buscarCiudad();
    // console.log(centros.value);
    // console.log(city.value);
  } catch (error) {
    console.log(error);
  }
}

traerCentros()

async function agregarCentro() {
    try{
    const agregar = await useCentro.agregarCentro(
    codigo.value,
    nombre.value,
    ciudad.value,
    direccion.value
  );
  traerCentros()
  return agregar

    }catch (error){
        console.log(error);
    }

}


function editar(x) {
    console.log(x);
    id.value= x._id
    codigo.value =x.codigo,
    nombre.value = x.nombre,
    ciudad2.value=x.ciudad._id,
    direccion.value= x.direccion  
}

async function guardarEdicion() {
    try{
        const guardar = await useCentro.actualizarCentros(id.value,codigo.value,nombre.value,ciudad2.value)
        console.log(guardar);
        traerCentros()

    }catch (error){
        console.log(error);
    }
    
}


</script>