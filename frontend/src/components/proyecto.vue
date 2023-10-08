<template>
  <div>
    <div class="text-h4 text-center q-mt-md">Proyectos</div>
    <div class="row q-ma-lg"></div>
    <div class="row" id="pro">
      <div class="col-6">
        <q-input
          v-model="searchTerm"
          debounce="300"
          placeholder="Buscar..."
          dense
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-4"></div>
      <div class="col-2 text-right">
        <q-btn
          class="text-right"
          color="secondary"
          label="Agregar"
          icon="add"
          @click="Modagg"
        />
      </div>
    </div>

    <div class="row" id="pro">
      <div class="col-12">
        <q-expansion-item
          style="max-width: 100%"
          expand-separator
          icon="perm_identity"
          label="Primerooo"
          caption="John Doe"
        >
          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col-11">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </div>
                <div class="col-1 text-right">
                  <q-icon
                    name="delete"
                    color="red"
                    size="24px"
                    style="cursor: pointer"
                    @click="Modeliminar"
                  />
                  <q-icon
                    name="edit"
                    color="blue"
                    size="24px"
                    style="cursor: pointer"
                    @click="Modedit"
                  />

                  <!-- <i class="fa-light fa-pen-to-square"></i>
                <i class="fa-light fa-trash-can"></i> -->
                  <!-- <q-btn color="negative" label="Eliminaar" @click="Modeliminar" />
                <q-btn color="primary" label="Editar" @click="Modedit" /> -->
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <div class="col-12">
        <q-expansion-item
          style="max-width: 100%"
          expand-separator
          icon="perm_identity"
          label="Segundoooooo"
          caption="John Doe"
        >
          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col-11">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </div>
                <div class="col-1 text-right">
                  <q-icon
                    name="delete"
                    color="red"
                    size="24px"
                    style="cursor: pointer"
                    @click="Modeliminar"
                  />
                  <q-icon
                    name="edit"
                    color="blue"
                    size="24px"
                    style="cursor: pointer"
                    @click="Modedit"
                  />
                  <!-- <q-btn color="negative" label="Eliminaar" @click="Modeliminar" />
                <q-btn color="primary" label="Editar" @click="Modedit" /> -->
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>

    <q-dialog v-model="modalEliminar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Eliminar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="text-h5 text-center q-mt-md">
            ¿Esta seguro que desea eliminar el proyecto ... ?
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Confirmar" />
          <q-btn color="negative" label="Rechazar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalagregar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Código" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Version" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Nombre" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Descripcion" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Año" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Archivo" color="secondary" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Guardar" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modaleditar">
      <q-card style="width: 32%; height: fit-content">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar Proyecto</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-separator
          inset
          style="height: 5px; margin-top: 5px"
          color="secondary"
        />

        <q-card-section style="max-height: 65vh" class="scroll" id="agregar">
          <div class="q-mb-md">
            <q-input label="Código" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Version" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Nombre" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Descripcion" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Año" color="secondary" />
          </div>
          <div class="q-mb-md">
            <q-input label="Archivo" color="secondary" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex-center" align="right">
          <q-btn color="secondary " label="Guardar" />
          <q-btn color="negative" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
let modaleditar = ref();
let modalagregar = ref();
let modalEliminar = ref();
function Modeliminar() {
  modalEliminar.value = true;
}

function Modagg() {
  modalagregar.value = true;
}

function Modedit() {
  modaleditar.value = true;
}
</script>
<style scoped>
#pro {
  margin: 0 50px; /* Ajusta el valor de margen según tus preferencias */
}
</style>
