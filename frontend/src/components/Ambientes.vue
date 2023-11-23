<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Ambientes de Formación</div>
            <div class="q-pa-md" style="width: 100%;">
                <div class="spinner-container" v-if="useAmbiente.loading === true">
                    <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
                </div>

                <q-table v-if="useAmbiente.loading === false" class="my-sticky-header-table" :separator="separator" bordered
                    :filter="filter" :rows="ambiente" :columns="columns" row-key="name" :pagination="pagination">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarAmbiente(props.row)" />
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(props.row)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(props.row)" />
                        </q-td>
                    </template>

                    <template v-slot:body-cell-centro="props">
                        <q-td :props="props">
                            {{ props.row.centroformacion.nombre }}
                        </q-td>
                    </template>

                    <template v-slot:body-cell-descripcion="props">
                        <q-td :props="props" style="white-space: pre-line;">
                            {{ props.row.descripcion }}
                        </q-td>
                    </template>

                    <template v-slot:body-cell-estado="props">
                        <q-td :props="props">
                            <span class="text-green" v-if="props.row.estado == 1">Activo</span>
                            <span class="text-red" v-else>Inactivo</span>
                        </q-td>
                    </template>

                    <template v-slot:top-right>
                        <q-input   dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:top-left>
                        <q-btn   :style="{ backgroundColor: colorMenu , color : colorLetra }" icon="add" label="Agregar" class="q-mb-md" @click="
                            agregar = true;
                        nuevo();
                        " />
                    </template>
                </q-table>
            </div>
        </q-page>

        <q-dialog v-model="agregar">
            <q-card id="card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ bd === 0 ? "Editar Ambiente" : "Agregar Ambiente" }}
                    </div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator :style="{ backgroundColor: colorMenu , color : colorLetra }"  inset id="separador"  style="
                height: 5px;
                margin-top: 5px;
              " />

                <q-card-section style="max-height: 65vh" class="scroll" id="agregar">

                    <div class="q-mb-md">
                        <q-input label="Nombre*"  :style="{  color : colorMenu }" v-model="nombre" />
                    </div>

                    <div class="q-mb-md">
                        <q-select label="Centro de Formación*"  :style="{  color : colorMenu }" v-model="centro"
                            :options="centros.map(centro => ({ label: centro.nombre, value: centro._id }))" emit-value
                            map-options>
                        </q-select>
                    </div>

                    <div class="q-mb-md">
                        <q-select label="Tipo*"  :style="{  color : colorMenu }" v-model="tipo" :options="options" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Descripción*" type="textarea"  :style="{  color : colorMenu }" v-model="descripcion" />
                    </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn :style="{ backgroundColor: colorMenu , color : colorLetra }" :disabled="cargando" v-if="bd == 1" label="Agregar" @click="agregarR()"  />
                    <q-btn :style="{ backgroundColor: colorMenu , color : colorLetra }" :disabled="cargando" v-else label="Actualizar" @click="actualizar()"  />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAmbienteStore } from "../stores/Ambientes.js"
import { useCentroStore } from "../stores/centros.js"
import { useQuasar } from 'quasar'
import { useColorStore } from "../stores/colorSetings.js";
let colores = useColorStore();
let colorMenu = ref(colores.configuracion.colorMenu)
let colorLetra = ref(colores.configuracion.colorLetra)


let ambiente = ref([])
let agregar = ref(false)
let centros = ref([])
let nombre = ref("")
let centro = ref("")
let tipo = ref("")
let options = ref(['Ideal', 'Disponible'])
let id = ref("")
let descripcion = ref("")
const useAmbiente = useAmbienteStore()
const useCentro = useCentroStore()
let bd = ref("");
const $q = useQuasar()
let filter = ref('')
let errores = ref([])
let separator = ref('cell')
let cargando = ref(false)

const pagination = ref({
    rowsPerPage: 6
})

const columns = [
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'centro', align: 'center', label: 'Centro de Formación', field: "centroformacion" },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: false },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]

buscar()
buscarCentro()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    nombre.value = ""
    centro.value = ""
    tipo.value = ""
    descripcion.value = ""
}

function validarVacios() {
    if (nombre.value === "" && centro.value === "" && tipo.value == "" && descripcion.value == "") {
        $q.notify({
            message: 'Campos vacíos',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: Math.random() * 3000
        })
    } else return true
}

function validar() {
    $q.notify({
        message: errores,
        color: 'negative',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
    })
}

async function buscar() {
    ambiente.value = await useAmbiente.buscarAmbientes();
    console.log(ambiente.value);
    ambiente.value.reverse()
}

async function buscarCentro() {
    const centrosActivos = await useCentro.buscarCentros();
    centros.value = centrosActivos.filter(c => c.estado === 1);
    console.log(centros.value);
}

async function agregarR() {
    cargando.value = true
    console.log("entro a agregar");
    await useAmbiente.agregarAmbientes({
        nombre: nombre.value,
        centroformacion: centro.value,
        tipo: tipo.value,
        descripcion: descripcion.value
    }).then(() => {
        $q.notify({
            message: 'Ambiente agregado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        agregar.value = false
        buscar();
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })
        } else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    cargando.value = false
}

function editarAmbiente(ambientes) {
    console.log("Entró a editar", ambientes);
    bd.value = 0;
    id.value = ambientes._id;
    nombre.value = ambientes.nombre
    centro.value = ambientes.centroformacion._id
    tipo.value = ambientes.tipo
    descripcion.value = ambientes.descripcion
    agregar.value = true;
}

async function actualizar() {
    cargando.value = true
    await useAmbiente.actualizarAmbientes(
        id.value,
        nombre.value,
        centro.value,
        tipo.value,
        descripcion.value
    ).then(() => {
        $q.notify({
            message: 'Ambiente editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        agregar.value = false
        buscar();
    }).catch((error) => {
        if (error.response && error.response.data.msg) {
            const repetida = error.response.data.msg
            $q.notify({
                message: repetida,
                color: 'negative',
                position: 'top',
                icon: 'warning',
                timeout: Math.random() * 3000
            })
        } else if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
    cargando.value = false
}

async function editarEstado(ambientes) {
    console.log("entre a editar estado", ambientes.estado);
    try {
        if (ambientes.estado === 1) {
            ambientes.estado = 0
        } else {
            ambientes.estado = 1
        }
        const res = await useAmbiente.cambiarEstado(ambientes._id, ambientes.estado)
        $q.notify({
            message: 'Estado editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
        buscar()

    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
.spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
}

#card {
    width: 32%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #card {
        width: 100%;
    }
}
</style>