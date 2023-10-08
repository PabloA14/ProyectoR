<template>
    <q-page class="q-pa-md">
        <div>
            <div class="text-h4 text-center q-mb-md">Retrolimentación de red</div> <br>

            <div class="row">
                <div class="col-4" >
                    <q-input rounded outlined color="secondary" label="Buscar">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <div class="col">

                    <q-btn style="float: right; margin: 0 auto"  color="secondary" icon="add" label="Agregar" class="q-mb-md"/>
                    
                </div>
            </div>
        </div>




    </q-page>
</template>
    
<script setup>
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