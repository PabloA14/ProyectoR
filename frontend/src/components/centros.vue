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
                    <button> Editar</button>
                </td>
            </tbody>
        </table>
        <!-- FIN DE LA TABLA -->

        <div class="modalAgregar" >
            <div>
                <span>Codigo Centro</span>
                <input type="text" v-model="codigo">
                <span>Nombre</span>
                <input type="text" v-model="nombre">
                <span>Ciudad</span>
                <input type="text" v-model="ciudad">
                <span>Dirección</span>
                <input type="text" v-model="direccion">
            </div>

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
let direccion=ref('')
async function traerCentros() {
    try{
        centros.value = await useCentro.buscarCentros()

        console.log(centros.value);


    }catch (error){
        console.log(error);
    }
    
}


traerCentros()

async function editarCampos(params) {
    
}

</script>