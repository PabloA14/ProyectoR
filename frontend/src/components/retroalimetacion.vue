<template>
    <q-page class="q-pa-md">
        <div>
            <div class="text-h4 text-center q-mb-md">Retroalimentación de red</div> <br>

            <div class="row">
                <div class="col-4">
                    <q-input rounded outlined color="secondary" label="Buscar">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <div class="col">

                    <q-btn @click="abrirModal" style="float: right; margin: 0 auto" color="secondary" icon="add"
                        label="Agregar" class="q-mb-md" />

                </div>
            </div> <br>

            <div class="row">

                <div class="col">

                </div>

                <q-list bordered class="rounded-borders" style="width: 100%;">

                    <q-expansion-item v-for=" retroalimetacion in dataRetroaliemtacion.retroalimentaciones"
                        :key="retroalimetacion._id" expand-separator :label="`Codigo: ${retroalimetacion.codigo}`"
                        :caption="`ficha: ${retroalimetacion.codigoFicha}`" `fecha: ${retroalimetacion.fecha}`>
                        

                        <q-card>

                            <q-card-section>

                                <p> {{ retroalimetacion.descripcion }} </p>

                            </q-card-section>

                            <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />


                            <div class="row">

                                <div class="col">

                                    <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                        style="margin-left: 90%; cursor: pointer;" />

                                    <q-icon color="red" name="fa-solid fa-x" size="20px"
                                        style=" margin: 1% 1%; cursor: pointer;" />

                                </div>
                            </div>

                        </q-card>

                    </q-expansion-item>

                </q-list>
            </div>



            <q-dialog v-model="mostrarModal">
                <q-card style="width: 32%; height: fit-content">
                    <q-card-section class="row items-center q-pb-none">

                        <div class="text-h6">Editar Proyecto</div>

                        <q-space />
                        <q-btn icon="close" color="negative" flat round dense v-close-popup />

                    </q-card-section>

                    <q-separator inset style="height: 5px; margin-top: 5px" color="secondary" />

                    <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
                        <div class="q-mb-md">
                            <q-input label="Código de ficha" color="secondary" v-model="codigoEditar" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Nombre" color="secondary" v-model="versionEditar" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Describcion" color="secondary" v-model="nombreEditar" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Archivo" color="secondary" v-model="descripcionEditar" />
                        </div>

                        <div class="q-mb-md">
                            <q-input label="Año" color="secondary" v-model="descripcionEditar" />
                        </div>

                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn color="secondary " label="Guardar" />
                        <q-btn color="negative" label="Cerrar" @click="cerrarModal" />
                    </q-card-actions>
                </q-card>
            </q-dialog>


        </div>

    </q-page>
</template>
    
<script setup>
import { ref } from "vue";
import { useRetroalimentacionStore } from "../stores/retroalimetacion"

const useRetroalimentacion = useRetroalimentacionStore()
let dataRetroaliemtacion = ref([])

async function buscar() {
    try {
        dataRetroaliemtacion.value = await useRetroalimentacion.buscarRetroalimentacion()
        console.log("Retroalimentacion FRON:", dataRetroaliemtacion.value);
    } catch (error) {
        console.error("Error al buscar Retroalimentacion:", error);
    }
}

buscar()





const mostrarModal = ref(false);

const abrirModal = () => {
    mostrarModal.value = true;
};

const cerrarModal = () => {
    mostrarModal.value = false;
};

</script>

<style scoped>
.centrada {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.centrada2 {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>