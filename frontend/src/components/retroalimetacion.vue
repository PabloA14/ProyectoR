<template>
    <q-page class="q-pa-md">
        <div>
            <div class="text-h4 text-center q-mb-md">Retrolimentación de red</div> <br>

            <div class="row">
                <div class="col-4">
                    <q-input rounded outlined color="secondary" label="Buscar">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <div class="col">

                    <q-btn style="float: right; margin: 0 auto" color="secondary" icon="add" label="Agregar"
                        class="q-mb-md" />

                </div>
            </div> <br>

            <div class="row">

                <div class="col">

                </div>

                <q-list bordered class="rounded-borders" style="width: 100%;">

                    <q-expansion-item expand-separator icon="perm_identity" label="Codigo: 001" caption="Ficha: 2504381">


                        <q-card>

                            <q-card-section>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                                corrupti
                                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto
                                suscipit iste
                                eveniet doloribus ullam aliquid.
                            </q-card-section>


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