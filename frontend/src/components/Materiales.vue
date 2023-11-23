<template>
    <div>
        <q-page class="q-pa-md">
            <div class="text-h4 text-center q-mb-md">Materiales de Formación</div>
            <div class="q-pa-md" style="width: 100%;">
                <div class="spinner-container" v-if="useMaterial.loading === true">
                    <q-spinner style="margin-left: 10px;" color="black" size="7em" :thickness="10" />
                </div>

                <q-table v-if="useMaterial.loading === false" class="my-sticky-header-table" :separator="separator" bordered
                    :filter="filter" :rows="material" :columns="columns" row-key="name" :pagination="pagination">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px;cursor: pointer;" @click="editarMaterial(props.row)" />
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px;cursor: pointer;" v-if="props.row.estado == 0"
                                @click="editarEstado(props.row)" />
                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px;cursor: pointer;"
                                v-else @click="editarEstado(props.row)" />
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
                        <q-input  dense debounce="300" v-model="filter" placeholder="Buscar">
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
                        {{ bd === 0 ? "Editar Material" : "Agregar Material" }}
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
                        <q-input label="Nombre"  v-model="nombre" />
                    </div>

                    <div class="q-mb-md">
                        <q-input label="Descripción"  type="textarea" v-model="descripcion" />
                    </div>

                    <q-select v-model="tipo" label="Tipo" :options="options" />

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn  :style="{ backgroundColor: colorMenu , color : colorLetra }" :disabled="loading" v-if="bd == 1" label="Agregar" @click="agregarR()"  />
                    <q-btn  :style="{ backgroundColor: colorMenu , color : colorLetra }" :disabled="loading" v-else label="Actualizar" @click="actualizar()"  />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMaterialStore } from "../stores/Materiales.js"
import { useQuasar } from 'quasar'
import { useColorStore } from "../stores/colorSetings.js";
let colores = useColorStore();
let colorMenu = ref(colores.configuracion.colorMenu)
let colorLetra = ref(colores.configuracion.colorLetra)



const useMaterial = useMaterialStore()
let material = ref([])
let options = ref(['Devolutivo', 'Consumible'])
let agregar = ref(false)
let errores = ref([])


let nombre = ref("")
let tipo = ref("")
let descripcion = ref("")
let bd = ref("")
let id = ref("")

const $q = useQuasar()
let filter = ref('')
let separator = ref('horizontal')
let loading = ref(false)

const pagination = ref({
    rowsPerPage: 6
})


const columns = [
    { name: 'nombre', align: 'center', label: 'Nombre', field: "nombre", sortable: true },
    { name: 'tipo', align: 'center', label: 'Tipo', field: "tipo", sortable: true },
    { name: 'descripcion', align: 'center', label: 'Descripción', sortable: true },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: "Opciones", field: 'opciones' },
]


buscar()

function nuevo() {
    bd.value = 1;
    vaciar();
}

function vaciar() {
    nombre.value = ""
    tipo.value = ""
    descripcion.value = ""
}

function validarVacios() {
    if (nombre.value === "" && tipo.value == "" && descripcion.value == "") {
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
    material.value = await useMaterial.buscarMateriales();
    console.log(material.value);
    material.value.reverse()
}

async function agregarR() {
    loading.value = true
    console.log("entro a agregar");
    await useMaterial.agregarMateriales({
        nombre: nombre.value,
        descripcion: descripcion.value,
        tipo: tipo.value
    }).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Material agregado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
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
    loading.value = false
}

function editarMaterial(materiales) {
    console.log("Entró a editar", materiales);
    bd.value = 0;
    id.value = materiales._id;
    nombre.value = materiales.nombre
    descripcion.value = materiales.descripcion
    tipo.value = materiales.tipo
    agregar.value = true;
}

async function actualizar() {
    loading.value = true
    await useMaterial.actualizarMateriales(
        id.value,
        nombre.value,
        descripcion.value,
        tipo.value
    ).then(() => {
        agregar.value = false
        $q.notify({
            message: 'Material editado exitosamente',
            color: 'green',
            icon: 'check',
            position: 'bottom',
            timeout: Math.random() * 3000
        })
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
    loading.value = false
}

async function editarEstado(materiales) {
    console.log("entre a editar estado", materiales.estado);
    try {
        if (materiales.estado === 1) {
            materiales.estado = 0
        } else {
            materiales.estado = 1
        }
        const res = await useMaterial.cambiarEstado(materiales._id, materiales.estado)
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