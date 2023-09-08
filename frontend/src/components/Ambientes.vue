<template>
    <div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAmbienteStore } from "../stores/Ambientes.js"
import { useQuasar } from 'quasar'

let ambiente = ref([])
let agregar = ref(false)
let codigo = ref("")
let nombre = ref("")
let centro = ref("")
let descripcion = ref("")
let archivo = ref("")

const useAmbiente = useAmbienteStore()
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let separator = ref('cell')

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'codigo', align: 'center', label: 'Código', field: 'codigo', sortable: true },
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'centro', align: 'center', label: 'Centro de Formaciónn', field: "centroformacion" },
    { name: 'archivo', align: 'center', label: 'Archivo', field: "archivo" },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    codigo.value = ""
    nombre.value = ""
    centro.value = ""
    descripcion.value = ""
    archivo.value = ""
}

async function buscar() {
    ambiente.value = await useAmbiente.buscarAmbientes();
    console.log(ambiente.value);
    ambiente.value.reverse()
}

async function agregarR() {
    console.log("entro a agregar");
    await useAmbiente.agregarAmbientes({
        codigo: codigo.value,
        nombre: nombre.value
    });
    $q.notify({
        message: 'Red agregada exitosamente',
        color: 'green',
        icon: 'check',
        position: 'top',
        timeout: Math.random() * 3000
    })
    buscar();
}

</script>